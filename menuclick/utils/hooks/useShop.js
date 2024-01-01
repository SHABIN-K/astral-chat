import useSWR from "swr";
import fetcher from "../fetcher";

const useUserShop = ({ userId }) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/shop/${userId}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export { useUserShop };
