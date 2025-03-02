## API Endpoints

### Admin Routes

1. **POST** `/admin/login` - Admin login
2. **POST** `/admin/register` - Register a new admin

3. **GET** `/admin/products` - View products
4. **POST** `/admin/products` - Add a new product
5. **PATCH** `/admin/products/:id` - Update a product
6. **DELETE** `/admin/products/:id` - Delete a product

7. **GET** `/admin/categories` - View categories
8. **POST** `/admin/categories` - Add a new category
9. **PATCH** `/admin/categories/:id` - Update a category
10. **DELETE** `/admin/categories/:id` - Delete a category

11. **GET** `/admin/sales:category` - View sales
12. **GET** `/admin/sales/top` - View top sales
13. **GET** `/admin/sales/worst` - View worst sales

### User Routes

1. **POST** `/user/login` - User login (done)
2. **POST** `/user/signup` - User signup (done)
3. **POST** `/user/order` - Place an order

### General Routes

1. **GET** `/` - Product listing

## Features

- JWT Authentication
- Authorization Handling (admin, user)
- Error Handling (done)

## Database Configuration

- **User Table**: `id`, `name`, `email`, `password`
- **Admin Table**: `id`, `name`, `email`, `password`
- **Product Table**: `id`, `name`, `category`, `count`, `sales`, `price`, `description`, `owner (user-id)`
- **Category Table**: `id`, `name`, `products`
- **OrderHistory Table**: `id`, `user`, `orderItems`, `date`
