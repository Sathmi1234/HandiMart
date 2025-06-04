package com.handimart.app.service;

import com.handimart.app.model.ContentPost;
import com.handimart.app.model.ContentUrl;
import com.handimart.app.repository.ContentPostRepository;
import com.handimart.app.repository.ContentUrlRepository;
import com.handimart.app.request.ContentUrlRequest;
import com.handimart.app.response.ContentUrlResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContentUrlService {
    
    @Autowired
    private ContentUrlRepository contentUrlRepository;
    
    @Autowired
    private ContentPostRepository contentPostRepository;
    
    // Read all
    public List<ContentUrlResponse> getAllContentUrls() {
        return contentUrlRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    // Read by id
    public Optional<ContentUrlResponse> getContentUrlById(Long id) {
        return contentUrlRepository.findById(id)
                .map(this::convertToResponse);
    }
    
    // Read URLs by content post id
    public List<ContentUrlResponse> getContentUrlsByContentPostId(Long contentPostId) {
        return contentUrlRepository.findByContentPostContentPostId(contentPostId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
    
    // Create
    public ContentUrlResponse createContentUrl(ContentUrlRequest request) {
        // Check if content post exists
        Optional<ContentPost> contentPostOpt = contentPostRepository.findById(request.getContentPostId());
        if (contentPostOpt.isEmpty()) {
            throw new RuntimeException("Content post with id '" + request.getContentPostId() + "' not found");
        }
        
        // Create content URL entity
        ContentUrl contentUrl = new ContentUrl();
        contentUrl.setUrl(request.getUrl());
        contentUrl.setContentPost(contentPostOpt.get());
        
        // Save and return response
        ContentUrl savedContentUrl = contentUrlRepository.save(contentUrl);
        return convertToResponse(savedContentUrl);
    }
    
    // Update
    public Optional<ContentUrlResponse> updateContentUrl(Long id, ContentUrlRequest request) {
        Optional<ContentUrl> existingContentUrlOpt = contentUrlRepository.findById(id);
        
        if (existingContentUrlOpt.isEmpty()) {
            return Optional.empty();
        }
        
        ContentUrl existingContentUrl = existingContentUrlOpt.get();
        
        // Check if content post is being changed and if it exists
        if (request.getContentPostId() != null && 
            !request.getContentPostId().equals(existingContentUrl.getContentPost().getContentPostId())) {
            
            Optional<ContentPost> contentPostOpt = contentPostRepository.findById(request.getContentPostId());
            if (contentPostOpt.isEmpty()) {
                throw new RuntimeException("Content post with id '" + request.getContentPostId() + "' not found");
            }
            
            existingContentUrl.setContentPost(contentPostOpt.get());
        }
        
        // Update URL field
        if (request.getUrl() != null) {
            existingContentUrl.setUrl(request.getUrl());
        }
        
        // Save and return response
        ContentUrl updatedContentUrl = contentUrlRepository.save(existingContentUrl);
        return Optional.of(convertToResponse(updatedContentUrl));
    }
    
    // Delete
    public boolean deleteContentUrl(Long id) {
        if (contentUrlRepository.existsById(id)) {
            contentUrlRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    // Delete all URLs for a content post
    public void deleteContentUrlsByContentPostId(Long contentPostId) {
        List<ContentUrl> urls = contentUrlRepository.findByContentPostContentPostId(contentPostId);
        contentUrlRepository.deleteAll(urls);
    }

    // Helper method to convert ContentUrl entity to ContentUrlResponse DTO
    private ContentUrlResponse convertToResponse(ContentUrl contentUrl) {
        ContentUrlResponse response = new ContentUrlResponse();
        response.setContentUrlId(contentUrl.getContentUrlId());
        response.setUrl(contentUrl.getUrl());
        response.setContentPostId(contentUrl.getContentPost().getContentPostId());
        
        return response;
    }
}