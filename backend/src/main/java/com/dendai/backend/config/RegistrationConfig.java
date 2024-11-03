package com.dendai.backend.config;

import java.util.Map;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "registration.common.password")
public class RegistrationConfig {
    private Map<String, String> commonPasswords;

    public Map<String, String> getCommonPasswords() {
        return commonPasswords;
    }

    public void setCommonPasswords(Map<String, String> commonPasswords) {
        this.commonPasswords = commonPasswords;
    }
}