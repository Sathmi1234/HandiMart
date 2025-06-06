package com.handimart.app.model;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "seller_profile")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SellerProfile {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long profileID;

	@OneToOne
	@JoinColumn(name = "user_id", nullable = false, unique = true)
	@JsonIgnore
	private User user;


	@Column(columnDefinition = "TEXT")
	private String bio;
	
	private boolean featuredFlag = false;
	
	private Double rating;
	
	private Integer ratingCount = 0;
	
	@Enumerated(EnumType.STRING)
	private SellerStatus status = SellerStatus.NEW;
	
	@ElementCollection
	@CollectionTable(
		name = "seller_tags",
		joinColumns = @JoinColumn(name = "profile_id")
	)
	@Column(name = "tag")
	private Set<String> tags;
	
	public enum SellerStatus{
        NEW, STANDARD, PREMIUM, ELITE
    }

	public SellerProfile() {
		super();
	}

	public Long getProfileID() {
		return profileID;
	}

	public void setProfileID(Long profileID) {
		this.profileID = profileID;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public boolean isFeaturedFlag() {
		return featuredFlag;
	}

	public void setFeaturedFlag(boolean featuredFlag) {
		this.featuredFlag = featuredFlag;
	}

	public Double getRating() {
		return rating;
	}

	public void setRating(Double rating) {
		this.rating = rating;
	}

	public Integer getRatingCount() {
		return ratingCount;
	}

	public void setRatingCount(Integer ratingCount) {
		this.ratingCount = ratingCount;
	}

	public SellerStatus getStatus() {
		return status;
	}

	public void setStatus(SellerStatus status) {
		this.status = status;
	}

	public Set<String> getTags() {
		return tags;
	}

	public void setTags(Set<String> tags) {
		this.tags = tags;
	}
		
	
}
