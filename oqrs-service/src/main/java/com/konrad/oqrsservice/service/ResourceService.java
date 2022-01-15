package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.dto.ResourceCreateDTO;
import com.konrad.oqrsservice.dto.ResourceDTO;

import java.util.List;

public interface ResourceService {
    ResourceDTO addResource(ResourceCreateDTO createDTO);
    List<ResourceDTO> getAllResources();
}
