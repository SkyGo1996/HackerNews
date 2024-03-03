import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import { isStory, useGetItem } from "../../services/useGetItem";
import { sortNumbersDescending } from "../../utils/data";
import "./NewsDetails.css";
import CommentCard from "./components/CommentCard/CommentCard";
import NewsDetailsHeader from "./components/NewsDetailsHeader/NewsDetailsHeader";

const NewsDetails = () => {
  const params = useParams();
  const {
    data: storyDetail,
    isLoading,
    isError,
  } = useGetItem(params.id ? Number(params.id) : 0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="page">
      {isStory(storyDetail) && <NewsDetailsHeader storyDetail={storyDetail} />}
      {storyDetail?.kids &&
        storyDetail.kids.length > 0 &&
        sortNumbersDescending(storyDetail.kids).map((kid) => {
          return <CommentCard commentID={kid} key={kid} />;
        })}
    </div>
  );
};

export default NewsDetails;
