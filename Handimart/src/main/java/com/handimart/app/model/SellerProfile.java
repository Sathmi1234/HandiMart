package com.handimart.app.model;

import java.util.Set;

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
		
}
