package com.handimart.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.handimart.app.model.Notification;
import com.handimart.app.repository.NotificationRepository;

@Service
public class NotificationServiceImpl implements NotificationService{

	@Autowired
    private NotificationRepository notificationRepository;
	
	@Override
	public Notification createNotification(Notification notification) {
		return notificationRepository.save(notification);
	}

	@Override
	public List<Notification> getNotificationsByUserId(Long userId) {
		return notificationRepository.findByUser_UserIdOrderByCreatedAtDesc(userId);
	}

	@Override
	public List<Notification> getUnreadNotificationsByUserId(Long userId) {
		return notificationRepository.findByUser_UserIdAndIsReadFalse(userId);
	}

	@Override
	public Notification markAsRead(Long notificationId) {
		Notification notification = notificationRepository.findById(notificationId).orElse(null);
        if (notification != null && !notification.getIsRead()) {
            notification.setIsRead(true);
            return notificationRepository.save(notification);
        }
        return notification;
	}

	@Override
	public void deleteNotification(Long notificationId) {
		notificationRepository.deleteById(notificationId);
		
	}

}
