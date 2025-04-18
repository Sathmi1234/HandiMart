# 🎨 HandiMart

> *Connecting talented artisans with customers nationwide - a digital marketplace for handcrafted excellence*

![Handi-Mart](https://github.com/user-attachments/assets/a93731a6-3859-44ef-b2ac-6babc64efdee)

## 📋 Project Overview

HandiMart is a comprehensive e-commerce platform designed specifically for artisans and craftspeople to showcase, sell, and promote their handcrafted products. The platform addresses market access barriers faced by talented creators and provides features tailored to the unique needs of the handcraft community.

## ✨ Key Features

- **🧑‍🎨 Artisan Profiles** — Personalized seller profiles with bio, ratings, and craft specializations
- **📦 Product Management** — Detailed product listings with craft-specific attributes
- **🔨 Craft Bidding System** — Time-based auctions with notifications and fixed-price options
- **🎬 Process Showcase** — Video documentation of crafting processes and materials
- **🎯 Recommendation Engine** — Personal sharing and preference-based suggestions
- **🖼️ Multi-category Gallery** — Organized by craft type, materials, and regional traditions
- **💳 Secure Payment Processing** — Supporting various payment methods
- **⭐ Customer Reviews** — Rating system for products and sellers

## 🛠️ Technology Stack

| Component | Technology |
|-----------|------------|
| Backend | Spring Boot |
| Database | MySQL  |
| Frontend | React Native |
| Authentication | JWT (JSON Web Tokens) |
| Storage | File system for images and videos |

## 📐 Project Design

<div align="center">
  <a href="https://www.figma.com/design/9kqr7Il4fxtK70MgixOznB/Handi-Mart?node-id=0-1&t=SBLcTNFm7i8nNEr1-1" target="_blank">
    <img src="https://github.com/user-attachments/assets/a93731a6-3859-44ef-b2ac-6babc64efdee" alt="HandiMart Figma Design">
  </a>
  <h3><em>Click the image above to explore our complete UI/UX design</em></h3>
</div>

## 📁 Project Structure

```
handimart/
├── handimart_backend/                # Spring Boot application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/handimart/app/
│   │   │   │   ├── controller/   # REST endpoints
│   │   │   │   ├── model/        # Entity classes
│   │   │   │   ├── repository/   # Data access interfaces
│   │   │   │   ├── service/      # Business logic
│   │   │   │   ├── dto/          # Data transfer objects
│   │   │   │   ├── exception/    # Custom exceptions
│   │   │   │   ├── config/       # Configuration classes
│   │   │   │   └── util/         # Utility classes
│   │   │   └── resources/        # Application properties
│   │   └── test/                 # Unit and integration tests
│   └── pom.xml                   # Maven dependencies
├── handimart_app/               # React Native application
│   ├── app/             # Application entry point & Screens
│   ├── components/     # Reusable UI components
│   ├── services/       # API clients
│   ├── utils/          # Helper functions
│   ├── assets/         # Images, fonts, etc.
│   └── package.json        # NPM dependencies
└── README.md               # Project documentation
```

## 🗄️ Database Schema

The application uses the following key entities:

| Entity | Purpose |
|--------|---------|
| **User** | Base user information and authentication |
| **SellerProfile** | Extended information for artisan accounts |
| **Product** | Core product information |
| **Order/OrderItem** | Purchase tracking |
| **Bid** | Auction functionality |
| **ProductReview/SellerRating** | Rating system |
| **Category/Subcategory** | Product organization |
| **Cart/CartItem** | Shopping functionality |
| **Wishlist/WishlistItem** | Saved products |
| **Transaction** | Payment records |
| **Notification** | User alerts |
| **Message** | User communication |
| **ProcessVideo** | Craft documentation |
| **UserInteraction** | Tracking for recommendations |

## 🚀 Setup Instructions

### Prerequisites

- JDK 17 or higher
- Maven
- MySQL (XAMPP)
- Node.js and npm
- React Native development environment

### Backend Setup

1. Clone the repository
2. Configure MySQL database in `application.properties`
3. Run the Spring Boot application:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

### Frontend Setup

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Run the application:
   ```bash
   npx expo start --go
   ```

## 📚 API Documentation

API documentation is available at `/swagger-ui.html` when the backend is running.

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 👨‍💻 Project Team

- K.A.D.S.D. Kandanarachchi (2020/ICT/19)
- S.D. Rajapaksha (2020/ICT/117)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- ABC Creative Collective for the project requirements(Assumption)
- Inspired by platforms like Etsy and Amazon Handmade