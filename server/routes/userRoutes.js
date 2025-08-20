import { Router } from 'express';

const userRoutes = Router();

userRoutes.get('/', (req, res) => {
  res.send({ title: 'GET all users' });
});

userRoutes.get('/:id', (req, res) => {
  res.send({ title: `GET user with ID ${req.params.id}` });
});

userRoutes.post('/', (req, res) => {
  res.send({ title: 'POST create a new user' });
});

userRoutes.put('/:id', (req, res) => {
  res.send({ title: `PUT update user with ID ${req.params.id}` });
});

userRoutes.delete('/:id', (req, res) => {
  res.send({ title: `DELETE user with ID ${req.params.id}` });
});

export default userRoutes;
