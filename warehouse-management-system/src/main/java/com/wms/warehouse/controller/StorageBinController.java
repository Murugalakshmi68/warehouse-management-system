package com.wms.warehouse.controller;

import com.wms.warehouse.entity.StorageBin;
import com.wms.warehouse.repository.StorageBinRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bins")
@CrossOrigin(origins = "http://localhost:3000")
public class StorageBinController {

    private final StorageBinRepository repository;

    public StorageBinController(StorageBinRepository repository) {
        this.repository = repository;
    }

    // CREATE
    @PostMapping
    public StorageBin createBin(@RequestBody StorageBin bin) {
        return repository.save(bin);
    }

    // READ ALL
    @GetMapping
    public List<StorageBin> getAllBins() {
        return repository.findAll();
    }

    // READ BY ID
    @GetMapping("/{id}")
    public StorageBin getBinById(@PathVariable Long id) {
        return repository.findById(id).orElseThrow();
    }

    // UPDATE
    @PutMapping("/{id}")
    public StorageBin updateBin(@PathVariable Long id, @RequestBody StorageBin binDetails) {
        StorageBin bin = repository.findById(id).orElseThrow();
        bin.setBinCode(binDetails.getBinCode());
        bin.setCapacity(binDetails.getCapacity());
        return repository.save(bin);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteBin(@PathVariable Long id) {
        repository.deleteById(id);
        return "Deleted successfully";
    }
}