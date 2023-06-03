import { PROXY_API_HOST } from '@/utils/app/const';

export const reverse_proxy = async ({ url, method, headers, body }: {
  url: string;
  method: string;
  headers: Headers;
  body?: string;
}) => {
  return fetch(`https://${PROXY_API_HOST}${url}`, {
    method,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
      'x-mypath-ua': headers.get('user-agent') as string,
      'x-mypath-real-ip': headers.get('cf-connecting-ip') as string || headers.get('x-forwarded-for') as string || headers.get('x-real-ip') as string,
      'x-mypath-referer': headers.get('referer') as string,
    },
    credentials: 'include',
    body,
  });
};
