import { PROXY_API_HOST } from '@/utils/app/const';

export const reverse_proxy = async ({
  url,
  method,
  headers,
  body,
}: {
  url: string;
  method: string;
  headers: Headers;
  body?: string;
}) => {
  headers.set('Content-Type', 'application/json');
  headers.set('x-mypath-ua', headers.get('user-agent') as string);
  headers.set(
    'x-mypath-real-ip',
    (headers.get('cf-connecting-ip') as string) ||
      (headers.get('x-forwarded-for') as string) ||
      (headers.get('x-real-ip') as string),
  );
  headers.set('x-mypath-referer', headers.get('referer') as string);
  headers.set('host', PROXY_API_HOST);
  headers.delete('content-length');

  return fetch(`https://${PROXY_API_HOST}${url}`, {
    method,
    headers,
    body,
  })
    .then((res) => {
      console.log('res', res);
      return res;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
};
