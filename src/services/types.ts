export interface IStory {
  by: string;
  descendants: number | undefined;
  id: number;
  kids: number[] | undefined;
  score: number;
  text: string;
  time: number;
  title: string;
  type: "story" | "job";
  url: string;
}

export interface IComment {
  by: string;
  id: number;
  kids: number[] | undefined;
  parent: number;
  text: string;
  time: number;
  type: "comment";
  deleted?: boolean;
}
