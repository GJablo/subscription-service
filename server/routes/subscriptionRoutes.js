import { Router } from 'express';

const subscriptionRoutes = Router();

subscriptionRoutes.get('/', (req, res) => {
  res.send({ title: 'GET all subscriptions' });
});

subscriptionRoutes.get('/:id', (req, res) => {
  res.send({ title: `GET subscription with ID ${req.params.id}` });
});

subscriptionRoutes.post('/', (req, res) => {
  res.send({ title: 'POST create a new subscription' });
});

subscriptionRoutes.put('/:id', (req, res) => {
  res.send({ title: `PUT update subscription with ID ${req.params.id}` });
});

subscriptionRoutes.delete('/:id', (req, res) => {
  res.send({ title: `DELETE subscription with ID ${req.params.id}` });
});

subscriptionRoutes.get('/user/:id', (req, res) => {
  res.send({ title: `GET subscriptions for user with ID ${req.params.id}` });
});

subscriptionRoutes.put('/:id/cancel', (req, res) => {
  res.send({ title: `PUT cancel subscription with ID ${req.params.id}` });
});

subscriptionRoutes.get('/upcoming-renewals', (req, res) => {
  res.send({ title: 'GET upcoming subscription renewals' });
});

export default subscriptionRoutes;
