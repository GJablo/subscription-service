import {Router} from 'express';

const authRoutes = Router();

authRoutes.post('/sign-up', (req, res) => {
  res.send({title: 'Sign Up Page'});
});
authRoutes.post('/sign-in', (req, res) => {
  res.send({title: 'Sign In Page'});
});
authRoutes.post('/sign-out', (req, res) => {
  res.send({title: 'Sign Out Page'});
});

export default authRoutes;
