import { IconArrowBadgeUp, IconUserCircle } from "@tabler/icons-react";
import { IStory } from "../../../../services/types";
import { cleanHTML } from "../../../../utils/cleanHTML";
import { convertDateToPast } from "../../../../utils/date";
import "./NewsDetailsHeader.css";

interface INewsDetailsHeader {
  storyDetail: IStory;
}

const NewsDetailsHeader: React.FC<INewsDetailsHeader> = ({ storyDetail }) => {
  return (
    <div className="newsDetailsTitleContainer">
      <div className="row newsDetailsTitleHeaderContainer">
        <div className="row">
          <IconUserCircle
            size={30}
            color="white"
            style={{ marginRight: "0.5rem" }}
          />
          <div>
            <p className="font-small" style={{ margin: 0 }}>
              {storyDetail.by}
            </p>
            <p className="time" style={{ margin: 0 }}>
              {convertDateToPast(storyDetail.time ?? 0)}
            </p>
          </div>
        </div>
        <div className="row">
          <IconArrowBadgeUp size={18} color="white" />
          <p>{storyDetail.score}</p>
        </div>
      </div>
      <h1 className="newsDetailsTitle">{storyDetail.title}</h1>
      <div
        className="newsDetailsText"
        dangerouslySetInnerHTML={{
          __html: storyDetail.text ? cleanHTML(storyDetail.text) : "",
        }}
      />
      <p className="commentTitle">Comments ({storyDetail.descendants})</p>
    </div>
  );
};

export default NewsDetailsHeader;
