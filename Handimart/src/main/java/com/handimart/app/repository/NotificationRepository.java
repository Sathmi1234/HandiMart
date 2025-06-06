package com.handimart.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.handimart.app.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long>{
	List<Notification> findByUser_UserIdOrderByCreatedAtDesc(Long userId);
    List<Notification> findByUser_UserIdAndIsReadFalse(Long userId);
}
