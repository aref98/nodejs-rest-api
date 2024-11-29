import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

// Home route
app.get('/', (req, res) => {
  res.send('Hello, GitHub Actions!');
});

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// Create new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  if (!newUser.name) return res.status(400).send('Name is required');
  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');

  user.name = req.body.name;
  if (!user.name) return res.status(400).send('Name is required');
  res.json(user);
});

// Delete user
app.delete('/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  users.splice(userIndex, 1);
  res.status(204).send();
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { app, server };
