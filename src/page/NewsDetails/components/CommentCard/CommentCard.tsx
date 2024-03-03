import Loading from "../../../../components/Loading";
import useIsMobile from "../../../../hooks/useIsMobile";
import { isStory, useGetItem } from "../../../../services/useGetItem";
import { cleanHTML } from "../../../../utils/cleanHTML";
import { sortNumbersDescending } from "../../../../utils/data";
import { convertDateToPast } from "../../../../utils/date";
import "./CommentCard.css";

interface ICommentCard {
  commentID: number;
  marginLeft?: number;
}

const CommentCard: React.FC<ICommentCard> = ({ commentID, marginLeft = 1 }) => {
  const { data: comment, isLoading } = useGetItem(commentID);
  const isMobile = useIsMobile();

  if (isLoading) {
    return <Loading containerstyle={{ marginLeft: `${marginLeft}rem` }} />;
  }

  if (!isStory(comment) && comment?.deleted) {
    return <></>;
  }

  return (
    <div
      className="commentCardContainer"
      style={{
        backgroundColor: marginLeft > 1 ? "transparent" : "#2e2d2d",
        boxShadow:
          marginLeft > 1 ? "none" : "0px 15px 30px rgba(117, 117, 117, 0.15)",
        width: isMobile ? `${95 - marginLeft}vw` : `${50 - marginLeft}vw`,
      }}
    >
      {comment?.by && comment.time && comment.text && (
        <>
          <div className="row" style={{ marginLeft: `${marginLeft}rem` }}>
            <p className="by byCommentCard">{comment?.by}</p>
            <p className="time" style={{ marginLeft: "0.5rem" }}>
              {convertDateToPast(comment?.time ?? 0)}
            </p>
          </div>
          <div
            className="commentCardInnerHTML"
            dangerouslySetInnerHTML={{
              __html: comment?.text ? cleanHTML(comment.text) : "",
            }}
            style={{
              marginLeft: `${marginLeft}rem`,
            }}
          />
          {comment?.kids &&
            comment.kids.length > 0 &&
            sortNumbersDescending(comment.kids).map((kid) => (
              <CommentCard
                commentID={kid}
                key={kid}
                marginLeft={marginLeft + 1}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default CommentCard;
