package com.wms.warehouse.controller;

import com.wms.warehouse.entity.StorageBin;
import org.springframework.web.bind.annotation.*;
import com.wms.warehouse.repository.StorageBinRepository;
import java.util.List;

@RestController
@RequestMapping("/bins")
public class StorageBinController {

    private final StorageBinRepository repository;

    public StorageBinController(StorageBinRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public StorageBin createBin(@RequestBody StorageBin bin) {
        return repository.save(bin);
    }

    @GetMapping
    public List<StorageBin> getAllBins() {
        return repository.findAll();
    }
}