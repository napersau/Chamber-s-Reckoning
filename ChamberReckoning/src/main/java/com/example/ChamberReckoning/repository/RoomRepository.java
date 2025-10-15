package com.example.ChamberReckoning.repository;

import com.example.ChamberReckoning.entity.Room;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoomRepository extends MongoRepository<Room, Integer> {
}
