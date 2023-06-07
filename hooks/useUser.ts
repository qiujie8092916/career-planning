import { useCallback, useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { useRouter } from 'next/router';

import { useFetch } from '@/hooks/useFetch';

import { QUERY_PROCESS_ENUM } from '@/utils/app/urlQuery';

import { OpenAIModelID, OpenAIModels } from '@/types/openai';

import HomeContext from '@/pages/api/home/home.context';
import type { UserData } from '@/pages/api/home/home.state';

import { v4 as uuidv4 } from 'uuid';

export interface FetchUserRequestProps {}

const useUser = () => {
  const fetchService = useFetch();
  const router = useRouter();

  const {
    state: { selectedConversation },
    dispatch: homeDispatch,
    handleUpdateConversation,
  } = useContext(HomeContext);

  const [postUserLoading, setPostUserLoading] = useState<boolean>(false);

  const handlerUserData = useCallback(
    (payload?: Record<string, any>) => {
      return fetchService.post<{ data: UserData }>(`/api/userData`, {
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: payload,
      });
    },
    [fetchService],
  );

  const handlerLogout = useCallback(
    (payload?: Record<string, any>) => {
      return fetchService.post<{ data?: UserData }>(`/api/resetSession`, {
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
    homeDispatch({
      field: 'getUserLoading',
      value: true,
    });

    fetch(`/api/userData`, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({}),
    })
      .then(async (res) => {
        if (res.status === 200) {
          const responseBody = await res.json();
          commonhandlerUser(responseBody.data);
          return responseBody;
        } else {
          const responseBody = await res.json();
          if (responseBody.code === 401) {
            // 未登录
            homeDispatch({
              field: 'userData',
              value: null,
            });

            homeDispatch({
              field: 'userStatus',
              value: QUERY_PROCESS_ENUM.WELCOME,
            });
          } else {
            toast.error(`登录失败: ${responseBody.code}`);
          }
        }
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        homeDispatch({
          field: 'getUserLoading',
          value: false,
        });
      });
  };

  const submitUserData = async (payload: Record<string, any>) => {
    setPostUserLoading(true);
    try {
      const userData = await handlerUserData(payload);

      commonhandlerUser(userData.data);

      setPostUserLoading(false);

      return userData;
    } catch (e: any) {
      setPostUserLoading(false);
      toast.error(`提交失败: ${JSON.parse(e.message).message ?? ''}`);
    }
  };

  const commonhandlerUser = (userData: UserData) => {
    // set user data
    homeDispatch({
      field: 'userData',
      value: userData,
    });

    // set user status
    homeDispatch({
      field: 'userStatus',
      value:
        userData.chat_count_left <= 0
          ? QUERY_PROCESS_ENUM.EXHAUST
          : Object.keys(userData.basic_info).length > 0
          ? QUERY_PROCESS_ENUM.CHAT
          : QUERY_PROCESS_ENUM.ENTER,
    });

    if (userData?.invite_code) {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          ic: userData.invite_code,
        },
      });
    }

    // set initial chat content
    if (userData && !selectedConversation) {
      const {
        basic_info,
        most_recommend,
        college_211_count,
        college_985_count,
        college_count,
        data_time_range,
      } = userData as UserData;

      const userContent = [];
      const assistantContent = [
        `###### 根据你提供的信息，结合近 ${
          data_time_range ?? '-'
        } 年分数线，已筛选出可报学校共 ${college_count ?? '-'} 所\n- 985：${
          college_985_count ?? '-'
        } 所 \n- 211：${
          college_211_count ?? '-'
        } 所\n\n可以告诉我更多信息，比如个人爱好、升学/就业偏好，以便进一步明确合适的院校、专业\n`,
      ];

      if (basic_info.location) {
        userContent.push(basic_info.location);
      }
      if (basic_info.subject) {
        userContent.push(`${basic_info.subject}`);
      }
      if (basic_info.score) {
        userContent.push(`分数 ${basic_info.score}`);
      }
      if (basic_info.rank) {
        userContent.push(`排名 ${basic_info.rank}`);
      }

      if ((most_recommend ?? []).length) {
        assistantContent[0] = assistantContent[0] + `###### 建议填报院校\n`;
        most_recommend.forEach((item) => {
          assistantContent.push(`- ${item.value}\n`);
        });
      }

      handleUpdateConversation({
        id: uuidv4(),
        name: '新的聊天',
        model: OpenAIModels[OpenAIModelID.GPT_3_5],
        messages: [
          {
            role: 'user',
            content: userContent.join('，'),
          },
          {
            role: 'assistant',
            content: assistantContent.join(''),
          },
        ],
        prompt: '',
      });
    }
  };

  const register = async ({
    mobile,
    password,
    inviteCode,
  }: {
    mobile: string;
    password: string;
    inviteCode: string;
  }) => {
    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        mobile,
        password,
        inviteCode,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          toast.success(`注册成功`);
          fetchUserData();
        } else {
          const responseBody = await res.json();
          toast.error(`注册失败: ${responseBody?.message}`);
        }
      })
      .catch((err) => {
        toast.error(`注册失败: ${JSON.parse(err.message).message ?? ''}`);
      });
  };

  const login = async ({
    mobile,
    password,
  }: {
    mobile: string;
    password: string;
  }) => {
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        mobile,
        password,
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          toast.success(`登录成功`);
          fetchUserData();
        } else {
          const responseBody = await res.json();
          toast.error(`登录失败: ${responseBody?.message}`);
        }
      })
      .catch((err) => {
        toast.error(`登录失败: ${JSON.parse(err.message).message ?? ''}`);
      });
  };

  const logout = async () => {
    homeDispatch({
      field: 'logoutLoading',
      value: true,
    });

    try {
      await handlerLogout();

      homeDispatch({
        field: 'logoutLoading',
        value: false,
      });
    } catch (e: any) {
      homeDispatch({
        field: 'logoutLoading',
        value: false,
      });
      throw new Error(e);
    }
  };

  return {
    postUserLoading,
    fetchUserData,
    submitUserData,
    register,
    login,
    logout,
  };
};

export default useUser;
