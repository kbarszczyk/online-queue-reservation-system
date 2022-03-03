package com.konrad.oqrsservice.mappers;

import com.konrad.oqrsservice.dto.UserDTO;
import com.konrad.oqrsservice.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserDTO dboToDto(User user);
}
