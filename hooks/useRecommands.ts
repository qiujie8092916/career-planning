import {useCallback, useContext, useState} from 'react';

import { useFetch } from '@/hooks/useFetch';
import HomeContext from "@/pages/api/home/home.context";
import {useUpdateEffect} from "react-use";
import { Message } from "@/types/chat";

let controller = new AbortController();

const useRecommands = () => {
    const fetchService = useFetch();

    const {
        state: { selectedConversation },
      dispatch: homeDispatch,
    } = useContext(HomeContext);

    const fetchRecommands = useCallback(async (messages: Message[]) => {
        homeDispatch({
            field: 'recommendLoading',
            value: true,
        })
        try {
            const data = await fetchService.post<{ choices?: string[] }>(`/api/recommend`, {
                body: {
                    messages,
                },
            }, controller.signal);
            homeDispatch({
                field: 'recommendData',
                value: data?.choices ?? [],
            })
        } catch (e) {
            console.error('/api/recommend error', e)
            homeDispatch({
                field: 'recommendData',
                value: [],
            })
        }

        homeDispatch({
            field: 'recommendLoading',
            value: false,
        })
    }, [fetchService])

    useUpdateEffect(() => {
        controller.abort();
        homeDispatch({
            field: 'recommendLoading',
            value: false,
        })
        homeDispatch({
            field: 'recommendData',
            value: [],
        })
        controller = new AbortController()
    }, [selectedConversation?.id])

    return { fetchRecommands };
};

export default useRecommands;
