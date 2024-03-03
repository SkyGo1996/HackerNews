import { formatDistanceToNow } from "date-fns";

export const convertDateToPast = (epoch: number) => {
  const date = new Date(epoch * 1000);

  return formatDistanceToNow(date, { addSuffix: true });
};
