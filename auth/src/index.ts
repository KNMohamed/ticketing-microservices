import express, { Application } from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';

const app: Application = express();
app.use(json());
app.use(currentUserRouter);

app.listen(3000, () => {
  console.log('server running on port 3000!!!');
});
