import { useUserPro } from "../hooks";

const UserProTable = () => {
  const { data } = useUserPro();

  console.log(data);

  return <div>qwerrtyuisdfghj</div>;
};

export default UserProTable;
