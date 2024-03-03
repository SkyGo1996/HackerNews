import { useQueries } from "@tanstack/react-query";
import { API } from ".";
import { EP_GET_ITEM } from "./endpoint";
import { IStory } from "./types";

const fetchGetStoryDetails = async (itemNo: number) => {
  const { data } = await API.get<IStory>(
    `${EP_GET_ITEM}/${itemNo}.json?print=pretty`
  );
  return data;
};

export const useGetStoriesDetails = (
  itemNoArr: number[],
  start: number,
  end: number,
  previousData: (IStory | undefined)[]
) => {
  return useQueries({
    queries: itemNoArr
      ? itemNoArr.slice(start, end).map((itemNo) => ({
          queryKey: ["item", itemNo],
          queryFn: () => fetchGetStoryDetails(itemNo),
          staleTime: 300000,
        }))
      : [],
    combine: (results) => {
      return {
        data: previousData.concat(results.map((result) => result.data)),
        isInitialLoading:
          start === 0 && results.some((query) => query.isLoading),
        isMoreLoading: start > 0 && results.some((query) => query.isLoading),
        isAllError: results.every((query) => query.error),
      };
    },
  });
};
