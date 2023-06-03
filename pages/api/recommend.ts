import { PROXY_API_HOST } from '@/utils/app/const';
import { reverse_proxy } from '@/utils/app/reverse';

export const config = {
  runtime: 'edge',
};

const handler = async (req: any): Promise<Response> => {
  try {
    const response = await reverse_proxy({
      method: 'GET',
      headers: req.headers,
      url: req.sourcePage,
    });

    if (response.status !== 200) {
      console.error(
        `Occur an error ${response.status}: ${await response.text()}`,
      );
      throw new Error('recommend Occur an error');
    }

    const json = await response.json();

    return new Response(JSON.stringify(json.data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({}), { status: 200 });
  }
};

export default handler;