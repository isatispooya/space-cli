import { useParams } from "react-router-dom";
import { PositionUpdate } from "../feature";

const PositionUpdatePage = () => {
  const { id } = useParams<{ id: string }>();

  return <PositionUpdate/>;
};

export default PositionUpdatePage;


