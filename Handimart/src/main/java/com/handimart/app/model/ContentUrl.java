package com.handimart.app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "content_urls")
public class ContentUrl {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentUrlId;
    
    @Column(nullable = false)
    private String url;
    
    @ManyToOne
    @JoinColumn(name = "contentPostId")
    private ContentPost contentPost;
}
