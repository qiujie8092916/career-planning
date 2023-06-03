import { useCallback, useContext, useState } from 'react';

import { useTranslation } from 'next-i18next';

import { useFetch } from '@/hooks/useFetch';

import HomeContext from '@/pages/api/home/home.context';
import type { UserData } from '@/pages/api/home/home.state';
import toast from "react-hot-toast";

export interface FetchUserRequestProps { }

const useUser = () => {
  const fetchService = useFetch();

  const {
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const [getUserLoading, setGetUserLoading] = useState<boolean>(false);
  const [postUserLoading, setPostUserLoading] = useState<boolean>(false);

  const handlerUser = useCallback(
    (payload?: Record<string, any>) => {
      return fetchService.post<UserData>(`/api/userData`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: payload,
      });
    },
    [fetchService],
  );

  const fetchUserData = async () => {
    setGetUserLoading(true);
    try {
      const userData = await handlerUser({});

      homeDispatch({
        field: 'userData',
        value: null,
      });

      setGetUserLoading(false);

      return userData;
    } catch (e: any) {
      // homeDispatch({
      //   field: 'userInfo',
      //   value: null,
      // });
      // toast.error(`获取用户信息失败, ${e}`);
      setGetUserLoading(false);
      throw new Error(e)
    }
  };

  const submitUserData = async (payload: Record<string, any>) => {
    setPostUserLoading(true);
    try {
      const initSubmit = await handlerUser(payload);

      setPostUserLoading(false);

      return initSubmit;
    } catch (e: any) {
      setPostUserLoading(false);
      throw new Error(e)
    }
  }

  return { getUserLoading, postUserLoading, fetchUserData, submitUserData };
};

export default useUser;
