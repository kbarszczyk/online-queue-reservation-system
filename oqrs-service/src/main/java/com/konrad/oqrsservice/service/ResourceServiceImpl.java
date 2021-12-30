package com.konrad.oqrsservice.service;

import com.konrad.oqrsservice.dto.ResourceCreateDTO;
import com.konrad.oqrsservice.dto.ResourceDTO;
import com.konrad.oqrsservice.mappers.ResourceMapper;
import com.konrad.oqrsservice.model.Resource;
import com.konrad.oqrsservice.model.WorkPlan;
import com.konrad.oqrsservice.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService {

    private final ResourceRepository resourceRepository;

    @Override
    public ResourceDTO addResource(ResourceCreateDTO createDTO) {
        if (createDTO.isWeekendsEnabled()) {
            WorkPlan workPlan = WorkPlan.generateDefaultWorkPlanWithWeekends();
            Resource toSave = new Resource(createDTO,workPlan);
            Resource createdResource = resourceRepository.save(toSave);
            return ResourceMapper.INSTANCE.dboToDto(createdResource);
        } else {
            WorkPlan workPlan = WorkPlan.generateDefaultWorkPlan();
            Resource toSave =new Resource(createDTO,workPlan);
            Resource createdResource = resourceRepository.save(toSave);
            return ResourceMapper.INSTANCE.dboToDto(createdResource);
        }
    }
}
