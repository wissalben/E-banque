package com.ebank.rest;

import com.ebank.dao.ClientRepository;
import com.ebank.entities.Client;
import com.ebank.entities.Compte;
import com.ebank.entities.Operation;
import com.ebank.entities.RechargeTelephonique;
import com.ebank.metier.BankAdminServices;
import com.ebank.metier.BankClientServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.nio.file.OpenOption;

@RestController
@CrossOrigin
@RequestMapping("/CLIENT")
public class ClientRestController {

    @Autowired
    private BankAdminServices bankAdminServices;

    @Autowired
    private BankClientServices bankClientServices;

    @Autowired
    private ClientRepository clientRepository;

    @RequestMapping("/greetings")
    public String greet() {
        return "greetings!";
    }

    // exemple:  localhost:8050/CLIENT/5
    @RequestMapping(value = "/{numeroClient}", method = RequestMethod.GET)
    public Client consulterClient(@PathVariable String numeroClient) {
        return bankAdminServices.consulterClient(Long.parseLong(numeroClient));
    }


    // exemple:  localhost:8050/CLIENT/currentClient
    @RequestMapping(value = "/currentClient", method = RequestMethod.GET)
    public Client currentSignedInClient() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return clientRepository.findClientByNomUtilisateur(username);
    }

    // exemple:  localhost:8050/CLIENT/currentClient/Comptes
    @RequestMapping("/currentClient/Comptes")
    public Page<Compte> currentClientComptes(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "5") int size) {
        Client client = clientRepository.findClientByNomUtilisateur(
                SecurityContextHolder.getContext().getAuthentication().getName());
        return bankClientServices.listComptes(client.getNumeroClient(), page, size);
    }

    // exemple:  localhost:8050/CLIENT/5/Comptes
    @RequestMapping("/{numeroClient}/comptes")
    public Page<Compte> consulterComptes(@PathVariable String numeroClient,
                                         @RequestParam(name = "page", defaultValue = "0") int page,
                                         @RequestParam(name = "size", defaultValue = "20") int size) {
        return bankClientServices.listComptes(Long.parseLong(numeroClient), page, size);
    }
    // exemple:  localhost:8050/CLIENT/compte/4865000001
    @RequestMapping("/compte/{codeCompte}")
    public Compte consulterCompte(@PathVariable String codeCompte) {
        return bankClientServices.consulterCompte(Long.parseLong(codeCompte));
    }
    // exemple:  localhost:8050/CLIENT/compte/4865000001/operations
    @RequestMapping("/compte/{codeCompte}/operations")
    public Page<Operation> getoperations(@PathVariable String codeCompte,
                                         @RequestParam(name = "page", defaultValue = "0") int page,
                                         @RequestParam(name = "size", defaultValue = "5") int size) {
        return bankClientServices.listOperations(Long.parseLong(codeCompte), page, size);
    }
    // exemple: http://localhost:8050/CLIENT/Virement?codeCompte1=465800000&codeCompte2=465800001&montant=40
    @RequestMapping("/Virement")
    public void Virement(@RequestParam(name = "codeCompte1") String codeCompte1,
                         @RequestParam(name = "codeCompte2") String codeCompte2,
                         @RequestParam(name = "montant") BigDecimal montant) {
        bankClientServices.virment(Long.parseLong(codeCompte1), Long.parseLong(codeCompte2), montant);
    }
    // exemple: http://localhost:8050/CLIENT/Recharger?numeroClient=3&codeCompte=465800000&montant=40
    @RequestMapping("/Recharger")
    public void Recharger(@RequestParam(name = "numeroClient") String numeroClient,
                          @RequestParam(name = "codeCompte") String codeCompte,
                          @RequestParam(name = "montant") BigDecimal montant) {
        bankClientServices.Recharger(Long.parseLong(numeroClient) ,Long.parseLong(codeCompte), montant);
    }
    // exemple: http://localhost:8050/CLIENT/5/Recharges
    @RequestMapping("/{numeroClient}/Recharges")
    public Page<RechargeTelephonique> getRecharges(@PathVariable String numeroClient,
                                                   @RequestParam(name = "page", defaultValue = "0") int page,
                                                   @RequestParam(name = "size", defaultValue = "5") int size) {
        return bankClientServices.getRecharges(Long.parseLong(numeroClient), page, size);
    }
}
