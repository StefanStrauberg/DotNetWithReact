import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Activity } from "../types/Activity";

export const useActivities = () => {
  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await axios.get<Activity[]>(
        "http://localhost:5001/api/activities"
      );
      return response.data;
    },
  });

  return {
    activities,
    isPending,
  };
};
