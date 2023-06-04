import {useRouter} from "next/router";

export default () => {
  const router = useRouter();
  const { pathname, query } = router;

  const setUrlQuery = (value: any, key = 'process') => {
    router.push({
      pathname,
      query: {
        ...query,
        [key]: value,
      },
    });
  };
  return { setUrlQuery }
}
