
Item Management API

This is a Node.js API application built using TypeScript. It allows you to manage items of three types: `product`, `service`, and `subscription`. The API supports adding new items and retrieving all items grouped by their types.

---

Features
- Add items of types `product`, `service`, and `subscription` with validation.
- Retrieve all items grouped by their types.
- Handles validation errors with meaningful error messages.
- Implements clean, maintainable, and testable TypeScript code.

---

Prerequisites
Make sure you have the following installed on your system:
- Node.js (version 14 or higher)
- npm (comes with Node.js)

---

Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd item-management-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development Server:
   ```bash
   npm run dev
   ```

---

API Endpoints

1. POST /api/items
Adds a new item to the system.

Request Body:
The payload structure depends on the `type` of the item.

Product
```json
{
  "type": "product",
  "name": "Laptop",
  "price": 1200
}
```

Service
```json
{
  "type": "service",
  "name": "Consulting",
  "duration": 5
}
```

Subscription
```json
{
  "type": "subscription",
  "name": "Premium Plan",
  "price": 50,
  "billingCycle": "monthly"
}
```

Responses:
201 Created (Success):
```json
{
  "id": "1",
  "type": "product",
  "name": "Laptop",
  "price": 1200
}
```
400 Bad Request (Error):
```json
{
  "error": "Name is required and must be a string for products."
}
```

---

2. GET /api/items
Retrieves all items grouped by their types.

Response:
200 OK (Success):
```json
{
  "product": [
    {
      "id": "1",
      "name": "Laptop",
      "price": 1200,
      "type": "product"
    }
  ],
  "service": [
    {
      "id": "2",
      "name": "Consulting",
      "duration": 5,
      "type": "service"
    }
  ],
  "subscription": [
    {
      "id": "3",
      "name": "Premium Plan",
      "price": 50,
      "billingCycle": "monthly",
      "type": "subscription"
    }
  ]
}
```

---

Error Handling

Common Validation Errors

Invalid type:
```json
{
  "error": "Invalid type. Must be 'product', 'service', or 'subscription'."
}
```

Missing Required Fields:
```json
{
  "error": "Name is required and must be a string for products."
}
```

Invalid billingCycle for Subscription:
```json
{
  "error": "BillingCycle is required and must be 'monthly' or 'yearly' for subscriptions."
}
```

---

Project Structure

src/
│
├── app.ts               # Main entry point
├── routes/
│   └── items.ts         # API routes
├── controllers/
│   └── itemsController.ts # Business logic for items
├── models/
│   └── itemTypes.ts     # TypeScript types and interfaces for items
├── data/
│   └── storage.ts       # In-memory data store

---

Development

To run the application in development mode with hot-reload:

1. Install nodemon:
   ```bash
   npm install --save-dev nodemon
   ```

2. Start the server:
   ```bash
   npx nodemon src/app.ts
   ```

---

Testing the API

Use tools like Postman or cURL to test the endpoints.

Example Requests:

Add a Product
```bash
curl -X POST http://localhost:3000/api/items -H "Content-Type: application/json" -d '{
  "type": "product",
  "name": "Smartphone",
  "price": 800
}'
```

Get All Items
```bash
curl -X GET http://localhost:3000/api/items
```

---

Notes
- This API uses an in-memory data store, so all data will be lost when the server restarts.
- For production, consider integrating a persistent database (e.g., MongoDB, PostgreSQL).

---

License

This project is licensed under the MIT License.