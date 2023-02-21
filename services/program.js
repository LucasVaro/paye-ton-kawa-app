import { useApi } from ".";

const Program = () => {
  const { get, post, put, remove } = useApi();

  const getSportProgram = async () => {
    const res = await get("/programs/sport");
    return res;
  };

  const getCrossTraining = async () => {
    const res = await get("/programs/crossTraining");
    return res;
  };

  const alimentationDaily = async () => await get("/alimentation/daily");

  return {
    getSportProgram,
    getCrossTraining,
    alimentationDaily,
  };
};

export default Program;
