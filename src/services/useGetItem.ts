import { useQuery } from "@tanstack/react-query";
import { API } from ".";
import { EP_GET_ITEM } from "./endpoint";
import { IComment, IStory } from "./types";

export const isStory = (
  data: IStory | IComment | undefined
): data is IStory => {
  return (data as IStory).type === "story";
};

const fetchGetItem = async (itemNo: number) => {
  const { data } = await API.get<IStory | IComment>(
    `${EP_GET_ITEM}/${itemNo}.json?print=pretty`
  );
  return data;
};

export const useGetItem = (itemNo: number) => {
  return useQuery({
    queryKey: ["item", itemNo],
    queryFn: () => fetchGetItem(itemNo),
    staleTime: 300000,
  });
};
