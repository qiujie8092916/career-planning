import { reverse_proxy } from '@/utils/server/reverse';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  // try {
    return reverse_proxy(req);
  // } catch (error) {
  //   console.error(error);
  //   return new Response(JSON.stringify({}), { status: 200 });
  // }
};

export default handler;
