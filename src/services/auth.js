import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { User } from '../db/models/user.js';

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
