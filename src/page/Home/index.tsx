import { useEffect, useRef, useState } from "react";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { useScrolledBottom } from "../../hooks/useScrolledBottom";
import { IStory } from "../../services/types";
import { useGetStoriesDetails } from "../../services/useGetStoriesDetails";
import { useGetTopStories } from "../../services/useGetTopStories";
import "./Home.css";
import NewsCard from "./components/NewsCard/NewsCard";

const ITEMS_PER_PAGE = 10;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const previousDataRef = useRef<(IStory | undefined)[]>([]);
  const {
    data: topStories,
    isLoading: isTopStoriesLoading,
    isRefetching: isTopStoriesRefetching,
    isError: topStoriesError,
  } = useGetTopStories();
  const {
    data: storiesDetails,
    isInitialLoading,
    isMoreLoading,
    isAllError: isStoriesDetailsError,
  } = useGetStoriesDetails(
    topStories ?? [],
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
    previousDataRef.current
  );
  const scrolledBottom = useScrolledBottom();

  useEffect(() => {
    if (scrolledBottom) {
      previousDataRef.current = storiesDetails;
      setCurrentPage((prev) => prev + 1);
    }
  }, [scrolledBottom]);

  useEffect(() => {
    if (isTopStoriesRefetching) {
      previousDataRef.current = [];
      setCurrentPage(0);
    }
  }, [isTopStoriesRefetching]);

  return (
    <>
      <h1 className="pageTitle">Hacker News</h1>
      <div className="stories">
        {isTopStoriesLoading || isInitialLoading ? (
          <Loading containerstyle={{ height: "100vh" }} />
        ) : topStoriesError || isStoriesDetailsError ? (
          <Error />
        ) : (
          storiesDetails?.map(
            (story) => story && <NewsCard item={story} key={story?.id} />
          )
        )}
      </div>
      {isMoreLoading && (
        <Loading
          containerstyle={{
            height: "10svh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            marginBottom: "5svh",
          }}
          text="Loading Next Page"
        />
      )}
    </>
  );
};

export default Home;
