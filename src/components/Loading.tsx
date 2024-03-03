import { CSSProperties } from "react";
import "./Loading.css";

interface ILoading {
  containerstyle?: CSSProperties;
  textStyle?: CSSProperties;
  text?: string;
}

const Loading: React.FC<ILoading> = ({ containerstyle, textStyle, text }) => {
  return (
    <div className="row" style={containerstyle}>
      <p style={textStyle}>{text || "Loading"}</p>
      <LoadingIcon />
    </div>
  );
};

const LoadingIcon = () => {
  return <div className="loader" />;
};

export default Loading;
