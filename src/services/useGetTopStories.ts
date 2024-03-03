import { useQuery } from "@tanstack/react-query";
import { API } from ".";
import { EP_GET_STORIES_TOP } from "./endpoint";
import { sortNumbersDescending } from "../utils/data";

const fetchGetTopStories = async () => {
  const { data } = await API.get<number[]>(EP_GET_STORIES_TOP);
  const sortedData = sortNumbersDescending(data);
  return sortedData;
};

export const useGetTopStories = () => {
  return useQuery({
    queryKey: ["topStories"],
    queryFn: fetchGetTopStories,
    staleTime: 300000,
  });
};
