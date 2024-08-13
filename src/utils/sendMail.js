import nodemailer from 'nodemailer';
import { SMTP } from '../constants/constants.js';

const transport = nodemailer.createTransport({
  host: SMTP.HOST,
  port: SMTP.PORT,
  secure: false,
  auth: {
    user: SMTP.USER,
    pass: SMTP.PASSWORD,
  },
});

export function sendMail(options) {
  return transport.sendMail(options);
}
