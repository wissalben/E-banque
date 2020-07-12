package com.ebank.web;

import com.ebank.metier.BankAgentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ebank.dao.ClientRepository;
import com.ebank.dao.CompteRepository;
import com.ebank.entities.Agent;
import com.ebank.entities.Compte;
import com.ebank.entities.Operation;
import com.ebank.entities.Client;
import com.ebank.metier.IBankAdminServices;

@Controller
public class BankClientController {

	 @Autowired
	    private ClientRepository clientRepository ;
	 
	 @Autowired
	    private CompteRepository compteRepository ;
	    @Autowired
	    private IBankAdminServices iBankAdminServices ;

	    @Autowired
	    private BankAgentServices bankAgentServices;
	    
	    
	    @RequestMapping("/listeClient")
	    public  String Client (Model model) {
	        model.addAttribute("Clients",clientRepository.findAll());
	        return  "Client" ;
	    }
	    @RequestMapping("/ListeComptes")
	    public  String Compte (Model model , Long numeroClient , @RequestParam(name = "p",defaultValue = "0") int p  , 
	    		@RequestParam(name = "s",defaultValue = "4") int s) {
	    	if(numeroClient == -1) {
	    		model.addAttribute("Clients", clientRepository.findAll());
	    		return "Client";
			}
	        Client client =iBankAdminServices.consulterClient(numeroClient);
	        Page<Compte> listeComptes  =bankAgentServices.listComptes(numeroClient, p,  s);
	        model.addAttribute("listeComptes",listeComptes);
	        int [] pages= new int[listeComptes.getTotalPages()];
	        model.addAttribute("pages",pages);
	        model.addAttribute("currentPage", p);
	        model.addAttribute("Clients",clientRepository.findAll()) ;
	        model.addAttribute("numeroClient",numeroClient);
	        model.addAttribute("client",client);
	        return  "Client" ;
	    }
	    @RequestMapping("/ListeOperations")
	    public  String Operation (Model model , Long codeCompte , @RequestParam(name = "p",defaultValue = "0") int p  , 
	    		@RequestParam(name = "s",defaultValue = "4") int s) {
	        Compte compte =iBankAdminServices.consulterCompte(codeCompte );
	        Page<Operation> listeOperations  =iBankAdminServices.listOperationSelonCompte(codeCompte, p,  s);
	        model.addAttribute("listeOperations",listeOperations);
	        int [] pages= new int[listeOperations.getTotalPages()];
	        model.addAttribute("currentPage", p);
	        model.addAttribute("pages",pages);
	        model.addAttribute("Comptes",compteRepository.findAll()) ;
	        model.addAttribute("numeroCompte",codeCompte);
	        model.addAttribute("compte",compte);
	        return  "OperationCompte" ;
	    }
	    
}
