import express from 'express';
import { currentUserRouter } from './routes/current-user';

const app = express();
app.use(express.json());
app.use(currentUserRouter);

app.listen(3000, () => {
  console.log('server running on port 3000!!!');
});
