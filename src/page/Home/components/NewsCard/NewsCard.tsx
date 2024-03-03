import {
  IconArrowBadgeUp,
  IconBriefcase,
  IconMessage,
  IconUserCircle,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { IStory } from "../../../../services/types";
import { cleanHTML } from "../../../../utils/cleanHTML";
import { convertDateToPast } from "../../../../utils/date";
import "./NewsCard.css";

interface INewsCard {
  item: IStory;
}

const NewsCard: React.FC<INewsCard> = ({ item }) => {
  const navigate = useNavigate();

  const navigateToComment = (event: React.MouseEvent) => {
    event.stopPropagation();
    navigate(`./details/${item.id}`);
  };

  const openExternalURL = () => {
    window.open(item.url, "_blank", "noreferrer");
  };

  return (
    <>
      <div className="newsCard" onClick={openExternalURL}>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <div className="row">
            <div className="row">
              {item.type === "story" ? (
                <IconUserCircle size={18} color="white" />
              ) : (
                <IconBriefcase size={18} color="#019E36" />
              )}
              <p className="text-space-smaller font-medium">{item.by}</p>
            </div>
            <p className="time">{convertDateToPast(item.time)}</p>
          </div>

          <div className="row">
            <IconArrowBadgeUp size={24} color="white" />
            <p className="font-medium">{item.score}</p>
          </div>
        </div>
        <h3 className="title">{item.title}</h3>
        <div
          className="text"
          dangerouslySetInnerHTML={{ __html: cleanHTML(item.text) }}
        />
        {item.type === "story" && (
          <div className="row newsCardButton" onClick={navigateToComment}>
            <IconMessage size={18} />
            <p className="text-space-small font-small commentCount">
              {item.descendants}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default NewsCard;
