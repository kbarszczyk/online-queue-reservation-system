package com.konrad.oqrsservice.mappers;

import com.konrad.oqrsservice.dto.ClientCreateDTO;
import com.konrad.oqrsservice.model.Client;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ClientMapper {

    ClientMapper INSTANCE = Mappers.getMapper(ClientMapper.class);

    Client createToDbo(ClientCreateDTO dto);
}
