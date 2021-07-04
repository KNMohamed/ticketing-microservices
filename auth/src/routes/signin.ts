import express, { Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { Password } from '../services/password';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import jwt from 'jsonwebtoken';
import process from 'process';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please enter a valid email address'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    const userJWT = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_KEY!
    );
    req.session = {
      jwt: userJWT,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
