package com.handimart.app.controller;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.handimart.app.request.ContentPostRequest;
import com.handimart.app.response.ContentPostResponse;
import com.handimart.app.service.ContentPostService;

@Controller
@RequestMapping("/content-posts")
public class ContentPostController {
    
    @Autowired
    private ContentPostService contentPostService;
    
    // Read all
    @GetMapping("/")
    public ResponseEntity<List<ContentPostResponse>> getAllContentPosts() {
        return new ResponseEntity<>(contentPostService.getAllContentPosts(), HttpStatus.OK);
    }
    
    // Read by id
    @GetMapping("/{id}")
    public ResponseEntity<ContentPostResponse> getContentPostById(@PathVariable Long id) {
        Optional<ContentPostResponse> contentPost = contentPostService.getContentPostById(id);
        if (contentPost.isPresent()) {
            return new ResponseEntity<>(contentPost.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create
    @PostMapping("/")
    public ResponseEntity<ContentPostResponse> createContentPost(@RequestBody ContentPostRequest request) {
        try {
            ContentPostResponse createdContentPost = contentPostService.createContentPost(request);
            return new ResponseEntity<>(createdContentPost, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Update
    @PutMapping("/{id}")
    public ResponseEntity<ContentPostResponse> updateContentPost(@PathVariable Long id, 
                                                               @RequestBody ContentPostRequest request) {
        try {
            Optional<ContentPostResponse> updatedContentPost = contentPostService.updateContentPost(id, request);
            if (updatedContentPost.isPresent()) {
                return new ResponseEntity<>(updatedContentPost.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    // Partial Update (PATCH)
    @PatchMapping("/{id}")
    public ResponseEntity<ContentPostResponse> partialUpdateContentPost(@PathVariable Long id, 
                                                                      @RequestBody ContentPostRequest request) {
        try {
            Optional<ContentPostResponse> updatedContentPost = contentPostService.updateContentPost(id, request);
            if (updatedContentPost.isPresent()) {
                return new ResponseEntity<>(updatedContentPost.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
   
    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContentPost(@PathVariable Long id) {
        boolean deleted = contentPostService.deleteContentPost(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}