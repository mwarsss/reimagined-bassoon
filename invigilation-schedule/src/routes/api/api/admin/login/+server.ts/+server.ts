import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = 'your_secret_key';

export const POST: RequestHandler = async ({ request }) => {
  const { username, password } = await request.json();

  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user || !user.is_admin) {
    return json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ username: user.username, is_admin: user.is_admin }, SECRET_KEY, { expiresIn: '1h' });

  return json({ token });
};