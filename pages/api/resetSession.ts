export const config = {
  runtime: 'edge',
};

const handler = async () => {
  return new Response(
    JSON.stringify({}),
    {
      status: 200,
      headers: {
        'Set-Cookie': 'mpuid=; Path=/; Max-Age=0; HttpOnly',
      },
    },
  );
};

export default handler;
