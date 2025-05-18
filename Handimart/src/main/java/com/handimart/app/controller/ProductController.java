package com.handimart.app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.handimart.app.model.Product;
import com.handimart.app.service.ProductService;

@Controller
@RequestMapping("/products")
public class ProductController {

	@Autowired
	public ProductService productervice;
	
	@GetMapping("/")
	public ResponseEntity<List<Product>> getDepts(){
		return new ResponseEntity<List<Product>>(productervice.getAllProducts(),HttpStatus.OK);
	}
	
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> getProductWithId(@PathVariable Long id) {
	    Optional<Product> product = productervice.getProductById(id);
	    if (product.isPresent()) {
	        return new ResponseEntity<>(product.get(), HttpStatus.OK);
	    } else {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}

	
}
