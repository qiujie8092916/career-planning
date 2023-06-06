import { PROXY_API_HOST } from '@/utils/app/const';
import { reverse_proxy } from '@/utils/app/reverse';

export const config = {
  runtime: 'edge',
};

const handler = async (req: any): Promise<Response> => {
  const requestBody = await req.json() as Record<string, any>;

  return reverse_proxy({
    method: 'POST',
    headers: req.headers,
    url: req.sourcePage,
    body: JSON.stringify(requestBody)
  });
};

export default handler;
