package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.dto.ResourceCreateDTO;
import com.konrad.oqrsservice.dto.ResourceDTO;

public interface ResourceService {
    ResourceDTO addResource(ResourceCreateDTO createDTO);
}
