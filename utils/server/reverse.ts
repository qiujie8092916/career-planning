import {PROXY_API_HOST} from "@/utils/app/const";

export const reverse_proxy = async (req: Request, config?: RequestInit) => {
  const body = await req.json()
  //todo
  const url = new URL(req.url);
  url.host = PROXY_API_HOST;
  url.port = '';
  url.protocol = 'https:'
  // url.pathname = '/chat/continue';

  return fetch(url.toString(), {
    headers: {
      ...req.headers,
      'x-auth-code': 'ZRb2tqMthjEzH',
      'x-mypath-ua': req.headers.get('user-agent') as string,
      'x-mypath-real-ip': req.headers.get('cf-connecting-ip') as string || req.headers.get('x-forwarded-for') as string || req.headers.get('x-real-ip') as string,
      'x-mypath-referer': req.headers.get('referer') as string,
    },
    method: req.method,
    body: JSON.stringify(body),
    ...config
  });
}
