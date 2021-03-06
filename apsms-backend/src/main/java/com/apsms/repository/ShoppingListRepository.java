package com.apsms.repository;

import com.apsms.modal.mall.ShoppingCart;
import com.apsms.modal.user.User;
import com.apsms.modal.mall.ShoppingList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingListRepository extends JpaRepository<ShoppingList, Integer>, JpaSpecificationExecutor<ShoppingList> {

    @Query(value = "select * from shopping_list where user_id=?1 and order_id is null", nativeQuery = true)
    public List<ShoppingList> findAllByUser(Integer userId);

    @Query(value = "select * from shopping_list where user_id=?1 and goods_id=?2 and order_id is null", nativeQuery = true)
    public ShoppingList findByShoppingListByUserAndGoods(Integer userId, Integer goodsId);

    @Query(value = "update shopping_list set shopping_cart_id = null where id = ?1", nativeQuery = true)
    ShoppingList update(Integer shoppingListId);

    @Query(value = "select b from ShoppingList b where b.goods.name like %:name% and b.user.id=:userId and order_id is null and shopping_cart_id is not null ")
    Page<ShoppingList> findShoppingListByUserPageable(@Param("name") String name, @Param("userId") Integer userId, Pageable pageable);
}
