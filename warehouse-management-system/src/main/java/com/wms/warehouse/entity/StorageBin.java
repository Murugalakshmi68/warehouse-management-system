package com.wms.warehouse.entity;
import jakarta.persistence.*;
@Entity
public class StorageBin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String binCode;

    private int capacity;

    public Long getId() {
        return id;
    }
    public String getBinCode() {
        return binCode;
    }
    public void setBinCode(String binCode) {
        this.binCode = binCode;
    }
    public int getCapacity() {
        return capacity;
    }
    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
}
