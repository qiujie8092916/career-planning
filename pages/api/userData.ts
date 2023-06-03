import { reverse_proxy } from '@/utils/app/reverse';

export const config = {
  runtime: 'edge',
};

const handler = async (req: any): Promise<Response> => {
  const requestBody = await req.json() as Record<string, any>;
  const method = Object.keys(requestBody).length ? 'POST' : 'GET';

  return reverse_proxy({
    method,
    headers: req.headers,
    url: req.sourcePage,
    body: method === 'POST' ? JSON.stringify(requestBody) : undefined,
  });
};

export default handler;
