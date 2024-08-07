import createError from 'http-errors';
import { Session } from '../db/models/session.js';
import { User } from '../db/models/user.js';

export async function authenticate(req, res, next) {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    next(createError(401, 'Please provide Authorization header'));
    return;
  }
  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  if (bearer !== 'Bearer' || !token) {
    next(createError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await Session.findOne({ accessToken: token });
  console.log(session);
  if (!session) {
    next(createError(401, 'Session not found'));
    return;
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  if (isAccessTokenExpired) {
    next(createError(401, 'Access token expired'));
    return;
  }

  const user = await User.findById(session.userId);
  if (!user) {
    next(createError(401, 'Session not found'));
    return;
  }

  req.user = user;

  next();
}
