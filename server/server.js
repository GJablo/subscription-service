import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import connectDB from './config/db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser'

const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// Connect to the database
await connectDB();

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Service API!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
});
