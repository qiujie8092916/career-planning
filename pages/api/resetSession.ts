export const config = {
  runtime: 'edge',
};

const handler = async (req: Request) => {
  console.log('origin', req.headers.get('origin'))
  return new Response(
    JSON.stringify({}),
    {
      status: 200,
      headers: {
        'Set-Cookie': `mpuid=; Path=/; Domain=${new URL(req.headers.get('origin')!).host.split(":")[0]}; Max-Age=0; HttpOnly`
      },
    },
  );
};

export default handler;
