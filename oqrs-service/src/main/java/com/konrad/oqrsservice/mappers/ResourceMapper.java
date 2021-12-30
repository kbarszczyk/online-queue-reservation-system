package com.konrad.oqrsservice.mappers;

import com.konrad.oqrsservice.dto.ResourceCreateDTO;
import com.konrad.oqrsservice.dto.ResourceDTO;
import com.konrad.oqrsservice.model.Resource;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ResourceMapper {

    ResourceMapper INSTANCE = Mappers.getMapper(ResourceMapper.class);

    Resource createToDbo(ResourceCreateDTO dto);

    ResourceDTO dboToDto(Resource resource);
}
