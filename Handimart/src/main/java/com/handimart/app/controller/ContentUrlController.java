package com.handimart.app.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.handimart.app.request.ContentUrlRequest;
import com.handimart.app.response.ContentUrlResponse;
import com.handimart.app.service.ContentUrlService;

@Controller
@RequestMapping("/content-urls")
public class ContentUrlController {
    
    @Autowired
    private ContentUrlService contentUrlService;
    
    // Read all
    @GetMapping("/")
    public ResponseEntity<List<ContentUrlResponse>> getAllContentUrls() {
        return new ResponseEntity<>(contentUrlService.getAllContentUrls(), HttpStatus.OK);
    }
    
    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<ContentUrlResponse> getContentUrlById(@PathVariable Long id) {
        Optional<ContentUrlResponse> contentUrl = contentUrlService.getContentUrlById(id);
        if (contentUrl.isPresent()) {
            return new ResponseEntity<>(contentUrl.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // Read URLs by content post id
    @GetMapping("/content-post/{contentPostId}")
    public ResponseEntity<List<ContentUrlResponse>> getContentUrlsByContentPostId(@PathVariable Long contentPostId) {
        List<ContentUrlResponse> contentUrls = contentUrlService.getContentUrlsByContentPostId(contentPostId);
        return new ResponseEntity<>(contentUrls, HttpStatus.OK);
    }

    // Create
    @PostMapping("/")
    public ResponseEntity<ContentUrlResponse> createContentUrl(@RequestBody ContentUrlRequest request) {
        try {
            ContentUrlResponse createdContentUrl = contentUrlService.createContentUrl(request);
            return new ResponseEntity<>(createdContentUrl, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Update
    @PutMapping("/{id}")
    public ResponseEntity<ContentUrlResponse> updateContentUrl(@PathVariable Long id, 
                                                             @RequestBody ContentUrlRequest request) {
        try {
            Optional<ContentUrlResponse> updatedContentUrl = contentUrlService.updateContentUrl(id, request);
            if (updatedContentUrl.isPresent()) {
                return new ResponseEntity<>(updatedContentUrl.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Partial Update (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<ContentUrlResponse> partialUpdateContentUrl(@PathVariable Long id, 
                                                                    @RequestBody ContentUrlRequest request) {
        try {
            Optional<ContentUrlResponse> updatedContentUrl = contentUrlService.updateContentUrl(id, request);
            if (updatedContentUrl.isPresent()) {
                return new ResponseEntity<>(updatedContentUrl.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
   
    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContentUrl(@PathVariable Long id) {
        boolean deleted = contentUrlService.deleteContentUrl(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}