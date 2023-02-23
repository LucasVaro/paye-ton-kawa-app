import { useApi } from ".";

const useLogin = () => {
  const { post } = useApi();

  const getKey = async (body) => {
    const res = await post("/getkey", body);
    return res;
  };

  return {
    getKey,
  };
};

export default useLogin;
