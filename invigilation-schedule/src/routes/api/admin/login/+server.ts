import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Mock database
const users = [
  { username: 'admin', password: '$2b$10$EIX/5K1K1K1K1K1K1K1K1O', is_admin: true } // password: 'password'
];

const SECRET_KEY = 'your_secret_key';

export const POST: RequestHandler = async ({ request }) => {
  const { username, password } = await request.json();

  const user = users.find(user => user.username === username && user.is_admin);

  if (!user) {
    return json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ username: user.username, is_admin: user.is_admin }, SECRET_KEY, { expiresIn: '1h' });

  return json({ token });
};