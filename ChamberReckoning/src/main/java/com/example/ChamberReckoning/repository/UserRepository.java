package com.example.ChamberReckoning.repository;


import com.example.ChamberReckoning.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);  // Thêm Optional<>
    boolean existsByUsername(String username);
}