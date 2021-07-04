import express, { Request, Response } from 'express';
import mongoose, { Document } from 'mongoose';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { Password } from '../services/password';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';

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
  (req: Request, res: Response) => {
    const { email, password } = req.body;

    User.findOne({ email: email }, async (err: Error, user: Document) => {
      if (err) {
        throw new BadRequestError(`no such user with email: ${email}`);
      }
      // const passwordMatch = await Password.compare(user.password, password);
      // if (!passwordMatch) {
      //   res.status(404).send({});
      // }
      res.status(200).send({});
    });
  }
);

export { router as signinRouter };
