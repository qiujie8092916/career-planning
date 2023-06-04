import { useCallback, useContext, useState } from 'react';

import { useFetch } from '@/hooks/useFetch';

import { Message } from '@/types/chat';

import HomeContext from '@/pages/api/home/home.context';

const useRecommands = () => {
  const fetchService = useFetch();

  const {
    state: { selectedConversation },
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const fetchRecommands = useCallback(
    async (messages?: Message[]) => {
      homeDispatch({
        field: 'recommendLoading',
        value: true,
      });
      try {
        const data = await fetchService.post<{ data?: { choices?: string[] } }>(
          `/api/recommend`,
          {
            body: {
              ...(messages && {
                messages,
              }),
            },
            credentials: 'include',
          },
        );
        homeDispatch({
          field: 'recommendData',
          value: data?.data?.choices ?? [],
        });
      } catch (e) {
        console.error('/api/recommend error', e);
        homeDispatch({
          field: 'recommendData',
          value: [],
        });
      }

      homeDispatch({
        field: 'recommendLoading',
        value: false,
      });
    },
    [fetchService, homeDispatch],
  );

  return { fetchRecommands };
};

export default useRecommands;
