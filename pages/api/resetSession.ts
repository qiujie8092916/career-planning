export const config = {
  runtime: 'edge',
};

const handler = async (req: Request) => {
  console.log('host', req.headers.get('host'))
  console.log('origin', req.headers.get('origin'))
  console.log('referer', req.headers.get('referer'))
  return new Response(
    JSON.stringify({}),
    {
      status: 200,
      headers: {
        'Set-Cookie': `mpuid=; Path=/; Domain=${req.headers.get('host')!.split(":")[0]}; Max-Age=0; HttpOnly`
      },
    },
  );
};

export default handler;
