import { useApi } from ".";

const useProducts = () => {
  const { get } = useApi();

  const getProducts = async () => {
    const res = await get("/products");
    return res;
  };

  return {
    getProducts,
  };
};

export default useProducts;
