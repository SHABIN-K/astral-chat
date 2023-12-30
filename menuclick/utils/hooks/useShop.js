import useSWR from "swr";
import fetcher from "../fetcher";

const useUserShop = ({ userID }) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/shop/${userID}`,
    fetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
