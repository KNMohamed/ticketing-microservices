import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/api/users/currentuser', async (req: Request, res: Response) => {
  if (!req.session?.jwt) return res.send({ currentUser: null });
  const sessionJWT: string = req.session.jwt;

  jwt.verify(sessionJWT, process.env.JWT_KEY!, (err, decoded) => {
    if (err) {
      return res.send({ currentUser: null });
    }
    res.status(200).send({ currentUser: decoded });
  });
});

export { router as currentUserRouter };
