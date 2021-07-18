import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

let port = 8080;
if (process.env.PORT) {
  port = parseInt(process.env.PORT, 10);
}

const app = express();

app.use(cors());
app.use(express.json());

app.get('*', (req, res, next) => {
  res.send('Hello World');
  res.end();
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}.`);
});
