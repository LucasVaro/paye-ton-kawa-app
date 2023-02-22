import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.19:8888/paye-ton-kawa-api-php/api";

export const instance = Axios.create({
  baseUrl: API_URL,
});

export default function useApi() {
  const get = async (path) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await instance.get(API_URL + path, {
        headers: {
          jwt: token || undefined,
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return res;
    } catch (err) {
      return err;
    }
  };

  const post = async (path, body) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await instance.post(API_URL + path, body, {
        headers: {
          jwt: token || undefined,
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return res;
    } catch (err) {
      return err;
    }
  };

  const put = async (path, body) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await instance.put(API_URL + path, body, {
        headers: {
          jwt: token || undefined,
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return res;
    } catch (err) {
      return err;
    }
  };

  const remove = async (path, body) => {
    const token = await AsyncStorage.getItem("token");
    try {
      const res = await instance.delete(API_URL + path, body, {
        headers: {
          jwt: token || undefined,
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      return res;
    } catch (err) {
      return err;
    }
  };

  return {
    get,
    post,
    put,
    remove,
  };
}
