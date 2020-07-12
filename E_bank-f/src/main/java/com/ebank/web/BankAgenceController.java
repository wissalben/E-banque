package com.ebank.web;

import com.ebank.dao.AgenceRepository;
import com.ebank.dao.AgentRepository;
import com.ebank.entities.Agence;
import com.ebank.entities.Agent;
import com.ebank.metier.BankAdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
public class BankAgenceController {

    @Autowired
    private BankAdminServices bankAdminServices;

    @Autowired
    private AgenceRepository agenceRepository;

    @Autowired
    private AgentRepository agentRepository;

    @RequestMapping("/")
    public String home() {
        return "redirect:/agences";
    }

    @RequestMapping("/agences")
    public String agences(Model model,
                          @RequestParam(name = "numeroAgence", defaultValue = "-1") Long numeroAgence,
                          @RequestParam(name = "page", defaultValue = "0") int page,
                          @RequestParam(name = "size", defaultValue = "5") int size) {
        if(numeroAgence == -1) {
            model.addAttribute("agences", agenceRepository.findAll());
            return "agences";
        }
        Agence agence = bankAdminServices.consulterAgence(numeroAgence);
        Page<Agent> agents = bankAdminServices.ListAgentSelonAgence(numeroAgence, page, size);
        model.addAttribute("agence", agence);
        model.addAttribute("agents", agents);
        model.addAttribute("agences", agenceRepository.findAll());
        int[] pages = new int[agents.getTotalPages()];
        model.addAttribute("pages", pages);
        model.addAttribute("page", page);
        model.addAttribute("size", size);
        return "agences";
    }

    @RequestMapping("/consulterAgence")
    public String consulterAgence(Model model, Long numeroAgence,
                                  @RequestParam(name = "page", defaultValue = "0") int page,
                                  @RequestParam(name = "size", defaultValue = "5") int size) {
        return "redirect:/agences?numeroAgence="+numeroAgence+"&page="+page+"&size="+size;
    }

    @RequestMapping("/addAgence")
    public String addAgence(Model model) {
        model.addAttribute("agence", new Agence());
        return "formAgence";
    }

    @RequestMapping("/saveAgence")
    public String saveAgence(Model model,@Valid Agence agence, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("agence", agence);
            return "formAgence";
        }
        agence.setDateCreation(new Date());
        model.addAttribute(agenceRepository.save(agence));
        return "confirmationAgence";
    }

    @RequestMapping("/addAgent")
    public String addAgent(Model model, Long numeroAgence) {
        model.addAttribute("numeroAgence", numeroAgence);
        model.addAttribute("agent",new Agent());
        return "formAgent";
    }
    @RequestMapping("/saveAgent")
    public String saveAgent(Model model, @Valid Agent agent,  BindingResult bindingResult, String DateNaissance, Long numeroAgence ) {
        if(bindingResult.hasErrors()) {
            model.addAttribute("agent", agent);
            model.addAttribute("numeroAgence", numeroAgence);
            model.addAttribute("DateNaissance", DateNaissance);
            return "formAgent";
        }
        Agence agence = bankAdminServices.consulterAgence(numeroAgence);
        agent.setAgence(agence);
        agent.setDateEmbauche(new Date());
        try {
            Date date = new SimpleDateFormat("dd/MM/yyyy").parse(DateNaissance);
            agent.setDateNaissance(date);
        }catch(Exception e) { e.printStackTrace(); }
        model.addAttribute("agent", bankAdminServices.saveAgent(agent, agent.getAgence()));
        model.addAttribute("agence", agent.getAgence());
        model.addAttribute("isInAgence", true);
        return "confirmationAgent" ;
    }

    @RequestMapping("/modifier")
    public String modifier(Model model, Long numeroAgence) {
        Agence agence = bankAdminServices.consulterAgence(numeroAgence);
        model.addAttribute("agence", agence);
        return "formAgence";
    }

    @RequestMapping("/supprimerAgence")
    public String supprimerAgence(Model model, Long numeroAgence) {
        try{ bankAdminServices.deleteAgence(numeroAgence);}
        catch(Exception e) {
            model.addAttribute("err", e);
            return "redirect:/consulterAgence?numeroAgence="+numeroAgence+"&err="+e.getMessage();
        }
        return "redirect:/agences";
    }
}
