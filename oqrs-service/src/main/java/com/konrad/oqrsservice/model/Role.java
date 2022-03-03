package com.konrad.oqrsservice.model;

import static com.konrad.oqrsservice.model.Authority.ADMIN_AUTHORITIES;


public enum Role {
    ROLE_ADMIN(ADMIN_AUTHORITIES);

    private String[] authorities;

    Role(String... authorities) {
        this.authorities = authorities;
    }

    public String[] getAuthorities() {
        return authorities;
    }
}

