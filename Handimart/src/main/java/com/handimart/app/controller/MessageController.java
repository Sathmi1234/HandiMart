package com.handimart.app.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.handimart.app.request.MessageRequest;
import com.handimart.app.response.MessageResponse;
import com.handimart.app.service.MessageService;

@Controller
@RequestMapping("/messages")
public class MessageController {
    
    @Autowired
    private MessageService messageService;
    
    // Read all messages
    @GetMapping("/")
    public ResponseEntity<List<MessageResponse>> getAllMessages() {
        return new ResponseEntity<>(messageService.getAllMessages(), HttpStatus.OK);
    }
    
    // Read message by id
    @GetMapping("/{id}")
    public ResponseEntity<MessageResponse> getMessageById(@PathVariable Long id) {
        Optional<MessageResponse> message = messageService.getMessageById(id);
        if (message.isPresent()) {
            return new ResponseEntity<>(message.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // Get messages between two users
    @GetMapping("/conversation")
    public ResponseEntity<List<MessageResponse>> getMessagesBetweenUsers(
            @RequestParam Long senderId, 
            @RequestParam Long recipientId) {
        List<MessageResponse> messages = messageService.getMessagesBetweenUsers(senderId, recipientId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
    
    // Get messages sent by a user
    @GetMapping("/sent/{senderId}")
    public ResponseEntity<List<MessageResponse>> getMessagesBySender(@PathVariable Long senderId) {
        List<MessageResponse> messages = messageService.getMessagesBySender(senderId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
    
    // Get messages received by a user
    @GetMapping("/received/{recipientId}")
    public ResponseEntity<List<MessageResponse>> getMessagesByRecipient(@PathVariable Long recipientId) {
        List<MessageResponse> messages = messageService.getMessagesByRecipient(recipientId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
    
    // Get unread messages for a user
    @GetMapping("/unread/{recipientId}")
    public ResponseEntity<List<MessageResponse>> getUnreadMessages(@PathVariable Long recipientId) {
        List<MessageResponse> messages = messageService.getUnreadMessages(recipientId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
    
    // Count unread messages for a user
    @GetMapping("/unread-count/{recipientId}")
    public ResponseEntity<Long> countUnreadMessages(@PathVariable Long recipientId) {
        Long count = messageService.countUnreadMessages(recipientId);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    // Send message
    @PostMapping("/")
    public ResponseEntity<MessageResponse> sendMessage(@RequestBody MessageRequest request) {
        try {
            MessageResponse sentMessage = messageService.sendMessage(request);
            return new ResponseEntity<>(sentMessage, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Mark message as read
    @PutMapping("/{id}/mark-read")
    public ResponseEntity<MessageResponse> markMessageAsRead(@PathVariable Long id) {
        Optional<MessageResponse> updatedMessage = messageService.markMessageAsRead(id);
        if (updatedMessage.isPresent()) {
            return new ResponseEntity<>(updatedMessage.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // Mark all messages as read for a recipient
    @PutMapping("/mark-all-read/{recipientId}")
    public ResponseEntity<Void> markAllMessagesAsRead(@PathVariable Long recipientId) {
        messageService.markAllMessagesAsRead(recipientId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    
    // Update message
    @PutMapping("/{id}")
    public ResponseEntity<MessageResponse> updateMessage(@PathVariable Long id, 
                                                       @RequestBody MessageRequest request) {
        try {
            Optional<MessageResponse> updatedMessage = messageService.updateMessage(id, request);
            if (updatedMessage.isPresent()) {
                return new ResponseEntity<>(updatedMessage.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Partial Update (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<MessageResponse> partialUpdateMessage(@PathVariable Long id, 
                                                              @RequestBody MessageRequest request) {
        try {
            Optional<MessageResponse> updatedMessage = messageService.updateMessage(id, request);
            if (updatedMessage.isPresent()) {
                return new ResponseEntity<>(updatedMessage.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
   
    // Delete message
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        boolean deleted = messageService.deleteMessage(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}