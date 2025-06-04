package com.handimart.app.repository;

import com.handimart.app.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
        // Find messages between two users
    @Query("SELECT m FROM Message m WHERE " +
           "(m.sender.userId = :senderId AND m.recipient.userId = :recipientId) OR " +
           "(m.sender.userId = :recipientId AND m.recipient.userId = :senderId) " +
           "ORDER BY m.sentAt ASC")
    List<Message> findMessagesBetweenUsers(@Param("senderId") Long senderId, 
                                         @Param("recipientId") Long recipientId);
    
    // Find messages sent by a user
    List<Message> findBySenderUserIdOrderBySentAtDesc(Long senderId);
    
    // Find messages received by a user
    List<Message> findByRecipientUserIdOrderBySentAtDesc(Long recipientId);
    
    // Find unread messages for a user
    @Query("SELECT m FROM Message m WHERE m.recipient.userId = :recipientId AND m.isRead = false ORDER BY m.sentAt DESC")
    List<Message> findUnreadMessagesByRecipient(@Param("recipientId") Long recipientId);
    
    // Count unread messages for a user
    @Query("SELECT COUNT(m) FROM Message m WHERE m.recipient.userId = :recipientId AND m.isRead = false")
    Long countUnreadMessagesByRecipient(@Param("recipientId") Long recipientId);
}