import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Hello, GitHub Actions!');
});

// Example route to get user info
app.get('/user', (req, res) => {
  res.json({ id: 1, name: 'John Doe' });
});

// Example route to create a new user
app.post('/user', (req, res) => {
  const newUser = req.body;
  res.status(201).json(newUser);
});

const server= app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { app,server };
