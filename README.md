# Subscription Server

A Node.js and Express backend for managing subscriptions, user authentication, and renewal reminder workflows.

## Features

- User authentication with JWT
- Subscription CRUD operations
- Subscription cancellation and renewal-related routes
- Workflow endpoint for sending subscription reminders
- MongoDB integration with Mongoose
- Request protection with Arcjet
- Email sending support with Nodemailer

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + bcryptjs
- Arcjet + Upstash Workflow
- Nodemailer
- dotenv

## Project Structure

```bash
server/
├── app.js
├── config/
├── controllers/
├── database/
├── middlewares/
├── models/
├── routes/
├── utils/
└── package.json
```

## Prerequisites

- Node.js 18 or newer
- npm, pnpm, or yarn
- A MongoDB instance

## Installation

1. Install dependencies:

```bash
pnpm install
```

Or with npm:

```bash
npm install
```

2. Create or update your environment file.
   The project uses files such as `.env.development.local` and `.env.production.local`.

3. Set the required environment variables:

```env
PORT=5500
NODE_ENV=development
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
QSTASH_URL=your_qstash_url
QSTASH_TOKEN=your_qstash_token
SERVER_URL=http://localhost:5500
EMAIL_PASSWORD=your_email_password
```

## Running the Server

### Development mode

```bash
pnpm dev
```

### Production mode

```bash
pnpm start
```

The server will run at:

```text
http://localhost:5500
```

## API Routes

### Authentication

- `POST /api/v1/auth/sign-up`
- `POST /api/v1/auth/sign-in`
- `POST /api/v1/auth/sign-out`

### Subscriptions

- `GET /api/v1/subscriptions`
- `GET /api/v1/subscriptions/:id`
- `POST /api/v1/subscriptions`
- `PUT /api/v1/subscriptions/:id`
- `DELETE /api/v1/subscriptions/:id`
- `GET /api/v1/subscriptions/user/:id`
- `POST /api/v1/subscriptions/cancel/:id`
- `GET /api/v1/subscriptions/upcoming-renewals`

### Users

- `GET /api/v1/users`
- `GET /api/v1/users/:id`
- `POST /api/v1/users`
- `PUT /api/v1/users/:id`
- `DELETE /api/v1/users/:id`

### Workflows

- `POST /api/v1/workflows/subscription/reminder`

## Notes

- The server uses the root route `/` to return a simple welcome message.
- The project includes a sample subscription dataset file named `subscription.testdata.json` for testing purposes.
