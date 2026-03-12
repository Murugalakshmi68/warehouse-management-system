package com.wms.warehouse.repository;
import com.wms.warehouse.entity.StorageBin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StorageBinRepository extends JpaRepository<StorageBin, Long>{
}
