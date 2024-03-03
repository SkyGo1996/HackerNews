import { IconAlertOctagon } from "@tabler/icons-react";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="errorPage">
      <IconAlertOctagon size={48} color="red" style={{ marginRight: "2rem" }} />
      <h2>Sorry, an unexpected error has occured</h2>
    </div>
  );
};

export default ErrorPage;
