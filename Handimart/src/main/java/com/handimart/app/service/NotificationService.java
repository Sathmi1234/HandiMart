package com.handimart.app.service;

import java.util.List;

import com.handimart.app.model.Notification;

public interface NotificationService {
	Notification createNotification(Notification notification);
    List<Notification> getNotificationsByUserId(Long userId);
    List<Notification> getUnreadNotificationsByUserId(Long userId);
    Notification markAsRead(Long notificationId);
    void deleteNotification(Long notificationId);
}
