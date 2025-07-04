# Training Express & NPM, API Communication and Error Handling

Task - Training Week 6 Andres Garcia

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/AndresGarcia18/Training-Week-6.git
   cd Training-Week-6
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory to set a custom port:
   ```env
   PORT=3000
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

- `GET    /users`         - Get all users
- `POST   /users`         - Add a new user (JSON: `{ "name": "Andres", "email": "andres@admin.com" }`)
- `GET    /users/:id`     - Get a user by ID
- `PUT    /users/:id`     - Update a user (JSON: `{ "name": "New", "email": "new@user.com" }`)
- `DELETE /users/:id`     - Delete a user
- `POST   /batch-users`   - Add multiple users at once (JSON array)
- `POST   /random-user`   - Fetch a random user from Random User API and add to your list

## Security & Validation
- **Helmet**
- **CORS**
- **express-validator**
- **Custom Errors**