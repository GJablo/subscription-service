import { Router } from 'express';
import { getUsers, getUser } from '../controllers/userController.js';

const userRoutes = Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUser);

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
