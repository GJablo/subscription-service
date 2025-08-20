import express from 'express';
import 'dotenv/config';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';

const app = express();



app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/subscriptions', subscriptionRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Subscription Service API!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:' + PORT);
});
