import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { randomBytes } from 'crypto';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import { THIRTY_DAYS, FIFTEEN_MINUTES } from '../constants/constants.js';

export async function registerUser(payload) {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await User.findOne({ email: payload.email });

  if (user) {
    throw createError(409, 'User with this email already exist in database');
  }

  return await User.create({
    ...payload,
    password: hashedPassword,
  });
}

export async function loginUser(payload) {
  const user = await User.findOne({ email: payload.email });
  console.log(user);
  if (!user) {
    throw createError(404, 'User not found');
  }

  const isPasswordEqual = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordEqual) {
    throw createError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
}
