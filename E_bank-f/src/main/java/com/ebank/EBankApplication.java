package com.ebank;

import com.ebank.dao.*;
import com.ebank.entities.*;
import com.ebank.metier.BankAdminServices;
import org.aspectj.apache.bcel.generic.RET;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.math.BigDecimal;
import java.util.Date;

@SpringBootApplication
public class EBankApplication implements CommandLineRunner{

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private AgenceRepository agenceRepository;
    @Autowired
    private CompteRepository compteRepository;
    @Autowired
    private ContratRepository contratRepository;
    @Autowired
    private RechargeTelephoniqueRepository rechargeTelephoniqueRepository;
    @Autowired
    private OperationRepository operationRepository;
    @Autowired
    private AgentRepository agentRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private BankAdminServices bankAdminServices;
    @Autowired
    private UserRepository userRepository;
    public static void main(String[] args) {
        SpringApplication.run(EBankApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/CLIENT/greetings").allowedOrigins("http://localhost:3000");
            }
        };
    }

    @Override
    public void run(String... args) throws Exception {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);
        Admin admin = new Admin("admin", "prenom", "nom", passwordEncoder.encode("1234"));
        User user = new User(1L,admin.getNomUtilisateur(), admin.getMotDePasse(), "ADMIN");
        adminRepository.save(admin);
        userRepository.save(user);
    }

    /*@Override
    public void run(String... args) throws Exception {
        userRepository.save(new User("username", "password", "ROLE"));
    }*/

    /*@Override
    public void run(String... args) throws Exception {
        Compte compte = compteRepository.getCompteByCodeCompte(465800001L);
        Operation operation = operationRepository.save(new Versement(new Date(), new BigDecimal(150), compte));
        Operation operation2 = operationRepository.save(new Retrait(new Date(), new BigDecimal(170), compte));
        Operation operation3 = operationRepository.save(new Virement(new Date(), new BigDecimal(150), compte, compte.getCodeCompte()));
    }*/

    /*@Override
    public void run(String... args) throws Exception {
        Client client = clientRepository.getClientByNumeroClient(24L);
        compteRepository.save(new CompteCourant(new Date(), new BigDecimal(1500), true, client, 150));
        compteRepository.save(new CompteEpargne(new Date(), new BigDecimal(1500), true, client, 2.0));
    }*/

   /* @Override
    public void run(String... args) throws Exception {

        Compte init = new CompteCourant(null, new BigDecimal(150), false, null, 0);
        //Admin admin = adminRepository.save(new Admin("admin", "mohamed", "mm", "123456"));
        Agence agence = agenceRepository.save(new Agence("agence1", "adresse", "mlm@452f", "0542545625", "45875526", "ndefkgkr", new Date(), "auto"));
        Agent agent = agentRepository.save(new Agent("Said", "mp", new Date(), "ahrgej", "azfzeg", "azrfe", "azhfef", new Date(), 1600, "cefzg", agence));


        Contrat contrat = new Contrat(new Date());

        Client client = clientRepository.save(new Client("mouad", "azdf", new Date(), "zfaggeg", "azfrg", "azfere", "azjkrg", agent, true, contrat));
        contratRepository.save(contrat);
        RechargeTelephonique rechargeTelephonique = new RechargeTelephonique(BigDecimal.valueOf(1500),client, 5485L);
        rechargeTelephoniqueRepository.save(rechargeTelephonique);
        Compte compte = compteRepository.save(new CompteCourant(new Date(), new BigDecimal(1500), true, client, 150));
        Compte compte2 = compteRepository.save(new CompteEpargne(new Date(), new BigDecimal(100), true, client, 2.0));
        Operation operation = operationRepository.save(new Versement(new Date(), new BigDecimal(150), compte2));
        Operation operation2 = operationRepository.save(new Retrait(new Date(), new BigDecimal(170), compte2));
        Operation operation3 = operationRepository.save(new Virement(new Date(), new BigDecimal(150), compte, compte2.getCodeCompte()));
    }*/
}
