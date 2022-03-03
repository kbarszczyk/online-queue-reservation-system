package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.dto.UserCreateDTO;
import com.konrad.oqrsservice.dto.UserDTO;
import com.konrad.oqrsservice.model.User;

import java.util.List;

public interface UserService {
    UserDTO registerAdmin(UserCreateDTO userCreateDTO);

    List<UserDTO> getUsers();

    User findUserByUsername(String username);

    User findUserByEmail(String email);
}
