import { useCallback } from 'react';

import { useFetch } from '@/hooks/useFetch';
import {OpenAIModelID, OpenAIModels} from "@/types/openai";
import mock_models from "./mock_models";

const models = mock_models.data
  .map((model: any) => {
    const model_name = model.id;
    for (const [key, value] of Object.entries(OpenAIModelID)) {
      if (value === model_name) {
        return OpenAIModels[value];
      }
    }
  })
  .filter(Boolean);

export interface GetModelsRequestProps {
  key: string;
}

const useApiService = () => {
  const getModels = () => models;

  return {
    getModels,
  };
};

export default useApiService;
