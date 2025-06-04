package com.handimart.app.service;

import com.handimart.app.model.Message;
import com.handimart.app.model.User;
import com.handimart.app.repository.MessageRepository;
import com.handimart.app.repository.UserRepository;
import com.handimart.app.request.MessageRequest;
import com.handimart.app.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MessageService {
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    // Read all messages
    public List<MessageResponse> getAllMessages() {
        return messageRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    // Read message by id
    public Optional<MessageResponse> getMessageById(Long id) {
        return messageRepository.findById(id)
                .map(this::convertToResponse);
    }

    
    // Create/Send message
    public MessageResponse sendMessage(MessageRequest request) {
        // Validate sender exists
        Optional<User> senderOpt = userRepository.findById(request.getSenderId());
        if (senderOpt.isEmpty()) {
            throw new RuntimeException("Sender with id '" + request.getSenderId() + "' not found");
        }
        
        // Validate recipient exists
        Optional<User> recipientOpt = userRepository.findById(request.getRecipientId());
        if (recipientOpt.isEmpty()) {
            throw new RuntimeException("Recipient with id '" + request.getRecipientId() + "' not found");
        }
        
        // Create message entity
        Message message = new Message();
        message.setSender(senderOpt.get());
        message.setRecipient(recipientOpt.get());
        message.setContent(request.getContent());
        message.setSentAt(LocalDateTime.now());
        message.setIsRead(false);
        message.setHasAttachment(request.getHasAttachment() != null ? request.getHasAttachment() : false);
        
        if (request.getAttachmentUrls() != null && !request.getAttachmentUrls().isEmpty()) {
            message.setAttachmentUrls(request.getAttachmentUrls());
            message.setHasAttachment(true);
        }
        
        // Save and return response
        Message savedMessage = messageRepository.save(message);
        return convertToResponse(savedMessage);
    }
    
    // Update message (limited fields)
    public Optional<MessageResponse> updateMessage(Long id, MessageRequest request) {
        Optional<Message> existingMessageOpt = messageRepository.findById(id);
        
        if (existingMessageOpt.isEmpty()) {
            return Optional.empty();
        }
        
        Message existingMessage = existingMessageOpt.get();
        
        // Only allow updating content and read status
        if (request.getContent() != null) {
            existingMessage.setContent(request.getContent());
        }
        
        // Update attachments if provided
        if (request.getAttachmentUrls() != null) {
            existingMessage.setAttachmentUrls(request.getAttachmentUrls());
            existingMessage.setHasAttachment(!request.getAttachmentUrls().isEmpty());
        }
        
        Message updatedMessage = messageRepository.save(existingMessage);
        return Optional.of(convertToResponse(updatedMessage));
    }
    
    // Delete message
    public boolean deleteMessage(Long id) {
        if (messageRepository.existsById(id)) {
            messageRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Helper method to convert Message entity to MessageResponse DTO
    private MessageResponse convertToResponse(Message message) {
        MessageResponse response = new MessageResponse();
        response.setMessageId(message.getMessageId());
        response.setSenderId(message.getSender().getUser_id());
        response.setRecipientId(message.getRecipient().getUser_id());
        response.setContent(message.getContent());
        response.setSentAt(message.getSentAt());
        response.setIsRead(message.getIsRead());
        response.setHasAttachment(message.getHasAttachment());
        response.setAttachmentUrls(message.getAttachmentUrls());
        
        return response;
    }
}