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

  const [loading, setLoading] = useState<boolean>(false);

  const getUser = useCallback(
    () => {
      return fetchService.post<UserData>(`/api/userData`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
    [fetchService],
  );

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userData = await getUser();

      homeDispatch({
        field: 'userData',
        value: null,
      });

      setLoading(false);

      return userData;
    } catch (e: any) {
      // homeDispatch({
      //   field: 'userInfo',
      //   value: null,
      // });
      // toast.error(`获取用户信息失败, ${e}`);
      setLoading(false);
      throw new Error(e)
    }
  };

  return { loading, fetchUserData };
};

export default useUser;
