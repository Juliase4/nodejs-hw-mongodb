import { registerUser, loginUser } from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/constants.js';

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

export async function loginUserController(req, res, next) {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
  });

  res.status(200).send({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
}
