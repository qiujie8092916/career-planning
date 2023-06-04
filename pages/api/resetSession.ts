export const config = {
  runtime: 'edge',
};

const handler = async (req: Request) => {
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
