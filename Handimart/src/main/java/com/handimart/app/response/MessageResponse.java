package com.handimart.app.response;

import java.time.LocalDateTime;
import java.util.Set;

public class MessageResponse {
    
    private Long messageId;
    private Long senderId;
    private Long recipientId;
    private String content;
    private LocalDateTime sentAt;
    private Boolean isRead;
    private Boolean hasAttachment;
    private Set<String> attachmentUrls;
    
    public MessageResponse() {}
    
    public MessageResponse(Long messageId, Long senderId, Long recipientId, String content,
                          LocalDateTime sentAt, Boolean isRead, Boolean hasAttachment,
                          Set<String> attachmentUrls) {
        this.messageId = messageId;
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
        this.sentAt = sentAt;
        this.isRead = isRead;
        this.hasAttachment = hasAttachment;
        this.attachmentUrls = attachmentUrls;
    }
    
    public Long getMessageId() {
        return messageId;
    }
    
    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }
    
    public Long getSenderId() {
        return senderId;
    }
    
    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }
    
    public Long getRecipientId() {
        return recipientId;
    }
    
    public void setRecipientId(Long recipientId) {
        this.recipientId = recipientId;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public LocalDateTime getSentAt() {
        return sentAt;
    }
    
    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }
    
    public Boolean getIsRead() {
        return isRead;
    }
    
    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
    
    public Boolean getHasAttachment() {
        return hasAttachment;
    }
    
    public void setHasAttachment(Boolean hasAttachment) {
        this.hasAttachment = hasAttachment;
    }
    
    public Set<String> getAttachmentUrls() {
        return attachmentUrls;
    }
    
    public void setAttachmentUrls(Set<String> attachmentUrls) {
        this.attachmentUrls = attachmentUrls;
    }
}