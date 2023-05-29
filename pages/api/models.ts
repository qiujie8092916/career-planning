import mock_models from "@/pages/api/mock_models";

import { OpenAIModel, OpenAIModelID, OpenAIModels } from '@/types/openai';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  const json = mock_models;

  const models = json.data
    .map((model: any) => {
      const model_name = model.id;
      for (const [key, value] of Object.entries(OpenAIModelID)) {
        if (value === model_name) {
          return OpenAIModels[value];
        }
      }
    })
    .filter(Boolean);

    return new Response(JSON.stringify(models), { status: 200 });
};

export default handler;
