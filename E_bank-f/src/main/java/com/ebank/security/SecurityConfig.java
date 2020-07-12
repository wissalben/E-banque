package com.ebank.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .usersByUsernameQuery("select username as principal, password as credentials, id from user where username=?")
                .authoritiesByUsernameQuery("select username as principal, role as role from user where username=?")
                .passwordEncoder(new BCryptPasswordEncoder(12))
                .rolePrefix("ROLE_");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeRequests().antMatchers("/agences", "/consulterAgence", "/addAgence", "/saveAgence",
                "/addAgent", "/saveAgent", "/modifier", "/supprimerAgence", "/listeAgent", "/supprimer",
                "/ListeClients", "/FormulaireAgent", "/save", "/listeClient", "/ListeComptes",
                "/ListeOperations")
                .hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/AGENT/**", "/CLIENT/**").permitAll()
                .anyRequest().authenticated()
                .and().formLogin()
                .and().httpBasic();
    }
}
