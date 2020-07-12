package com.ebank.web;

import com.ebank.dao.AgentRepository;
import com.ebank.entities.Agent;
import com.ebank.entities.Client;
import com.ebank.metier.IBankAdminServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

@Controller
public class BankAgentController {
    @Autowired
    private AgentRepository agentRepository ;
    @Autowired
    private IBankAdminServices iBankAdminServices ;

    @RequestMapping("/listeAgent")
    public  String Agents (Model model) {
        model.addAttribute("Agents",agentRepository.findAll());
        return  "Agent" ;
    }

    @RequestMapping("/supprimer")
    public  String supprimer ( Model model , Long numeroAgent) {
        try{
            iBankAdminServices.deleteAgent(numeroAgent);
        }
        catch (Exception e){
            model.addAttribute("err",e);
            return  "redirect:/ListeClients?numeroAgent="+numeroAgent+"&err="+e.getMessage();
        }
        return "redirect:/listeAgent";
    }

    @RequestMapping("/ListeClients")
    public  String Clients (Model model ,@RequestParam(name = "numeroAgent", defaultValue = "-1") Long numeroAgent ,
                            @RequestParam(name = "p",defaultValue = "0") int p  , @RequestParam(name = "s",defaultValue = "5") int s) {
        if(numeroAgent == -1) {
            model.addAttribute("Agents", agentRepository.findAll());
            return "Agent";
        }
        Agent agent =iBankAdminServices.consulterAgent(numeroAgent);
        Page<Client> listeClients  =iBankAdminServices.listClientSelonAgent(numeroAgent, p,  s);
        model.addAttribute("listeClients",listeClients);
        int [] pages= new int[listeClients.getTotalPages()];
        model.addAttribute("pages",pages);
        model.addAttribute("currentPage", p);
        model.addAttribute("Agents",agentRepository.findAll()) ;
        model.addAttribute("numeroAgent",numeroAgent);
        model.addAttribute("agent",agent);
        return  "Agent" ;
    }

    @RequestMapping( value = "/FormulaireAgent")
    public  String modifier (Model model,Long numeroAgent ){
        Agent agent = iBankAdminServices.consulterAgent(numeroAgent);
        model.addAttribute("agent" ,agent) ;
        DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        try {
        String date = dateFormat.format(agent.getDateNaissance());
        model.addAttribute("dateDeNaissance", date);
        return "FormulaireAgent";}
        catch (Exception e) {
            model.addAttribute("dateDeNaissance", "");
            return "FormulaireAgent";
        }
    }

    @RequestMapping( value = "/save",method = RequestMethod.POST)
    public  String save (Model model,@Valid Agent agent, BindingResult bindingResult, String DateDeNaissance){
        if(bindingResult.hasErrors()) {
            model.addAttribute("agent", agent);
            model.addAttribute("dateDeNaissance");
            return "FormulaireAgent";
        }
        Agent agent1 = agentRepository.getAgentByNumeroAgent(agent.getNumeroAgent());
        agent.setDateEmbauche(agent1.getDateEmbauche());
        agent.setAgence(agent1.getAgence());
        try {
            Date date = new SimpleDateFormat("dd/MM/yyyy").parse(DateDeNaissance);
            agent.setDateNaissance(date);
        }catch(Exception e) { e.printStackTrace();}
        Random rand = new Random();
        if( agent.getNom() != null && agent.getPrenom() != null) agent.setNomUtilisateur(agent.getNom()+"."+agent.getPrenom()+rand.nextInt(1000));
        model.addAttribute("agent", iBankAdminServices.saveAgent(agent, agent.getAgence()));
        model.addAttribute("agence", agent.getAgence());
        return "confirmationAgent";
    }
}
