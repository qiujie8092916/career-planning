import { reverse_proxy } from '@/utils/app/reverse';

export const config = {
  runtime: 'edge',
};

const handler = async (req: any): Promise<Response> => {
  return reverse_proxy({
    method: 'GET',
    headers: req.headers,
    url: req.sourcePage,
  });
};

export default handler;
