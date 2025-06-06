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

	public ContentUrl() {
		
	}

	public Long getContentUrlId() {
		return contentUrlId;
	}

	public void setContentUrlId(Long contentUrlId) {
		this.contentUrlId = contentUrlId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public ContentPost getContentPost() {
		return contentPost;
	}

	public void setContentPost(ContentPost contentPost) {
		this.contentPost = contentPost;
	}
    
	
    
}
