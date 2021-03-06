package com.apsms.repository;

import com.apsms.modal.mall.Goods;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface GoodsRepository extends JpaRepository<Goods,Integer>, JpaSpecificationExecutor<Goods> {

    @Query(value = "select * from goods where id=?1", nativeQuery = true)
    Goods findOne(Integer id);
}
