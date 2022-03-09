package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.dto.ResourceCreateDTO;
import com.konrad.oqrsservice.dto.ResourceDTO;
import com.konrad.oqrsservice.dto.ResourceUpdateDTO;

import java.util.List;

public interface ResourceService {
    ResourceDTO addResource(ResourceCreateDTO createDTO);

    List<ResourceDTO> getAllResources();

    void deleteResource(Long resourceId);

    ResourceDTO updateResource(ResourceUpdateDTO updateDTO,Long resourceId);
}
