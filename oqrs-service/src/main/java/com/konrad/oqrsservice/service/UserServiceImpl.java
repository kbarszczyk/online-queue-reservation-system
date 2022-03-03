package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.dto.UserCreateDTO;
import com.konrad.oqrsservice.dto.UserDTO;
import com.konrad.oqrsservice.mappers.UserMapper;
import com.konrad.oqrsservice.model.Authority;
import com.konrad.oqrsservice.model.Role;
import com.konrad.oqrsservice.model.User;
import com.konrad.oqrsservice.model.UserPrincipal;
import com.konrad.oqrsservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
@Qualifier("userDetailsService")
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findUserByUsername(username);
        if (user == null) {
            log.error("User not found by username: " + username);
            throw new UsernameNotFoundException("User not found by username: " + username);
        } else {
            UserPrincipal userPrincipal = new UserPrincipal(user);
            log.info("Returning found user by username: " + username);
            return userPrincipal;
        }
    }

    @Override
    public UserDTO registerAdmin(UserCreateDTO userCreateDTO) throws RuntimeException {
        validateNewUsernameAndEmail(StringUtils.EMPTY, userCreateDTO);
        User user = new User();
        user.setUserId(generateUserId());
        String encodedPassword = encodePassword(userCreateDTO.getPassword());
        user.setFirstName(userCreateDTO.getFirstName());
        user.setLastName(userCreateDTO.getLastName());
        user.setEmail(userCreateDTO.getEmail());
        user.setUsername(userCreateDTO.getUsername());
        user.setPassword(encodedPassword);
        user.setRole(Role.ROLE_ADMIN.name());
        user.setAuthorities(Authority.ADMIN_AUTHORITIES);
        user.setActive(true);
        user.setNotLocked(true);
        userRepository.save(user);
        return UserMapper.INSTANCE.dboToDto(user);
    }

    private String encodePassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

    private String generateUserId() {
        return RandomStringUtils.randomNumeric(10);
    }

    private User validateNewUsernameAndEmail(String currentUsername, UserCreateDTO userCreateDTO) throws RuntimeException {
        if (StringUtils.isNotBlank(currentUsername)) {
            User currentUser = findUserByUsername(currentUsername);
            if (currentUser == null) {
                throw new RuntimeException("No user found by username: " + currentUsername);
            }
            User userByUsername = findUserByUsername(userCreateDTO.getUsername());
            if (userByUsername != null && !currentUser.getId().equals(userByUsername.getId())) {
                throw new RuntimeException("Username already exists!");
            }

            User userByEmail = findUserByEmail(userCreateDTO.getEmail());
            if (userByEmail != null && !currentUser.getId().equals(userByUsername.getId())) {
                throw new RuntimeException("Email already exists!");
            }
        } else {
            User userByUsername = findUserByUsername(userCreateDTO.getUsername());
            if (userByUsername != null) {
                throw new RuntimeException("Username already exists!");
            }
            User userByEmail = findUserByEmail(userCreateDTO.getEmail());
            if (userByEmail != null) {
                throw new RuntimeException("Email already exists!");
            }
        }
        return null;
    }

    @Override
    public List<UserDTO> getUsers() {
        return userRepository.findAll().stream().map(user -> UserMapper.INSTANCE.dboToDto(user))
                .collect(Collectors.toList());
    }

    @Override
    public User findUserByUsername(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }
}
