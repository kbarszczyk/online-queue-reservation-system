package com.konrad.oqrsservice.config;

public class SecurityConstant {
    public static final Long EXPIRATION_TIME = 432_000_000L; // 5 days in milliseconds
    public static final String TOKEN_HEADER = "Bearer ";
    public static final String JWT_TOKEN_HEADER = "jwt-token";
    public static final String TOKEN_CANNOT_BE_VERIFIED = "Token cannot be verified";
    public static final String FORBIDDEN_MESSAGE = "You need to log in to access this page";
    public static final String ACCESS_DENIED_MESSAGE = "You don`t have permission to access this page";
    public static final String[] PUBLIC_URLS = {"/appointment",
            "/appointment/**",
            "/resource/**",
            "/swagger-ui.html",
            "/swagger-ui/**",
            "/webjars/**",
            "/v3/**",
            "/swagger-resources/**",
            "/user/**",
            "/h2-console/**",
            "/h2/**",
            "/h2_console/**"};
    public static final String AUTHORITIES = "Authorities";
    public static final String OPTIONS_HTTP_METHOD = "OPTIONS";

}
