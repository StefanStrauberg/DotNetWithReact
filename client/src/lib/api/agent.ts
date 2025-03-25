import axios from "axios";
import { store } from "../stores/store";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.request.use((config) => {
  store.uiStore.isBusy();
  return config;
});

agent.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    store.uiStore.isIdle();
    return response;
  },
  async (error) => {
    await sleep(1000);
    store.uiStore.isIdle();
    const { status } = error.response;
    switch (status) {
      case 400:
        toast.error("Bad request");
        break;
      case 401:
        toast.error("Unauthorised");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        toast.error("Server error");
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default agent;
