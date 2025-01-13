import useVerify from "../hooks/useVerify";

const TimeflowUserCom = () => {
  const { data } = useVerify.useGet();

  console.log(data);
  return <div>aaaaaa</div>;
};

export default TimeflowUserCom;
