import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async () => {
  // Clear the session or revoke the token
  return json({ message: 'Logged out' });
};