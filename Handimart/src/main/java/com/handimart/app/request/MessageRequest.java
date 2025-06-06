package com.handimart.app.request;

import java.util.Set;

public class MessageRequest {
    
    private Long senderId;
    private Long recipientId;
    private String content;
    private Boolean hasAttachment = false;
    private Set<String> attachmentUrls;
    
    public MessageRequest() {}
    
    public MessageRequest(Long senderId, Long recipientId, String content) {
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
    }
    
    public MessageRequest(Long senderId, Long recipientId, String content, 
                         Boolean hasAttachment, Set<String> attachmentUrls) {
        this.senderId = senderId;
        this.recipientId = recipientId;
        this.content = content;
        this.hasAttachment = hasAttachment;
        this.attachmentUrls = attachmentUrls;
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