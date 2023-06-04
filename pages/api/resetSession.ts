import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from '@/utils/server/cookies';

export const config = {
  runtime: 'edge',
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  setCookie(res, 'mpuid', '', { path: '/', maxAge: -1 });
  res.end(res.getHeader('Set-Cookie'));
};

export default handler;
