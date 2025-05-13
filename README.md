### ReviewHub: Product Review Platform

A comprehensive platform that allows users to create accounts, share product reviews with ratings, categorize reviews, and interact with posts through voting and commenting. The portal includes premium content features, admin moderation, and a payment system.

Live Link- `https://assignment-9-client-iota.vercel.app/`

## 📋 Table of Contents

- [📋 Table of Contents](#-table-of-contents)
- [🌟 Features](#-features)
  - [User Management](#user-management)
  - [Review System](#review-system)
  - [Premium Content](#premium-content)
  - [Interaction](#interaction)
  - [Admin Features](#admin-features)
  - [Search \& Discovery](#search--discovery)
- [🛠️ Technology Stack](#️-technology-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Installation](#-installation)
- [🔐 Environment Variables](#-environment-variables)
- [💻 Usage](#-usage)
  - [User Registration and Login](#user-registration-and-login)
  - [Creating Reviews](#creating-reviews)
  - [Purchasing Premium Content](#purchasing-premium-content)
  - [Admin Dashboard](#admin-dashboard)
- [📚 API Documentation](#-api-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

## 🌟 Features

### User Management

- **User Registration & Authentication**: Secure signup/login with JWT authentication
- **User Profiles**: View and manage personal information and review history
- **Role-based Access Control**: Different permissions for regular users and administrators

### Review System

- **Create & Manage Reviews**: Users can create, edit, and delete their own reviews
- **Rating System**: 1-5 star rating for products
- **Categorization**: Organize reviews by product categories
- **Media Support**: Upload images with reviews
- **Purchase Source**: Add optional links to where products were purchased

### Premium Content

- **Premium Reviews**: Special high-quality reviews available for purchase
- **Preview System**: Users can see a preview before purchasing
- **One-time Payment**: Pay once to unlock full premium content
- **Payment History**: Track all purchases in user profile

### Interaction

- **Voting System**: Upvote/downvote reviews
- **Comment System**: Discuss reviews with other users
- **Reply Functionality**: Respond to specific comments

### Admin Features

- **Review Moderation**: Approve or unpublish user reviews
- **Content Management**: Monitor and moderate all portal content
- **Premium Content Management**: Set prices and manage premium reviews
- **Analytics Dashboard**: Track payments and popular content

### Search & Discovery

- **Advanced Filtering**: Find reviews by category, rating, date, or popularity
- **Search Functionality**: Keyword search across all reviews
- **Related Reviews**: Discover similar products in the same category

## 🛠️ Technology Stack

| Category               | Technologies                       |
| ---------------------- | ---------------------------------- |
| **Frontend**           | Next.js, React.js                  |
| **UI Components**      | Tailwind CSS, shadcn/ui            |
| **Backend**            | Next.js API routes, Server Actions |
| **Database**           | SQL database (via Prisma ORM)      |
| **Authentication**     | NextAuth.js                        |
| **Payment Processing** | SSLCOMMERZ                         |
| **Image Storage**      | Vercel Blob                        |
| **Deployment**         | Vercel                             |

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Database (PostgreSQL recommended)
- Stripe account (for payment processing)
- Cloudinary account (for image uploads)

## 🚀 Installation

1. **Clone the repository**

```shellscript
git clone https://github.com/md-maruf-billa/Assignment-9-client.git
cd Assignment-9-client
```

2. **Install dependencies**

```shellscript
npm install
# or
yarn install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory (see Environment Variables section below)

4. **Run the development server**

```shellscript
npm run dev
# or
yarn dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application

## 🔐 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```plaintext
# API Configuration
NEXT_PUBLIC_BASE_API=your_api_url

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_cloudinary_api_key
NEXT_PUBLIC_CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXT_PUBLIC_CLOUDINARY_PRESET_NAME=your_cloudinary_preset

# Authentication (if using NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Database (if using Prisma)
DATABASE_URL=your_database_connection_string

# Stripe (if implementing payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

## 💻 Usage

### User Registration and Login

1. Navigate to the signup page to create a new account
2. Verify your email address if required
3. Log in with your credentials

### Creating Reviews

1. Navigate to the "New Review" page
2. Fill in the product details, rating, and review content
3. Upload images if desired
4. Submit your review for approval

### Purchasing Premium Content

1. Browse premium reviews
2. Preview content before purchasing
3. Complete payment through the secure Stripe checkout
4. Access your purchased content immediately

### Admin Dashboard

1. Log in with admin credentials
2. Access the admin dashboard
3. Moderate reviews, manage users, and view analytics

## 📚 API Documentation

API documentation is available at `/api/docs` when running the development server.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

Project Link: [https://github.com/md-maruf-billa/Assignment-9-client](https://github.com/md-maruf-billa/Assignment-9-client)

---
