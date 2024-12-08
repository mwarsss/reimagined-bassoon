import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'your_secret_key';

export const GET: RequestHandler = async ({ request }) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  const exams = await prisma.exam.findMany({
    where: {
      date: {
        gte: new Date()
      }
    },
    orderBy: {
      date: 'asc'
    }
  });

  const invigilators = await prisma.invigilator.findMany();

  const conflicts = await prisma.conflict.findMany();

  return json({
    exams,
    invigilators,
    conflicts
  });
};