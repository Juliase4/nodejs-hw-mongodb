import { registerUser } from '../services/auth.js';

export async function registerUserController(req, res) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const newUser = await registerUser(user);
  console.log(newUser);
  res.status(201).send({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser,
  });
}
