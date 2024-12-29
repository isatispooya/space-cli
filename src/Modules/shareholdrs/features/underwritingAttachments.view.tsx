import { useUnusedProcess } from "../hooks";

const UnderwritingAttachmentsView = () => {
  const { data } = useUnusedProcess.useGetList();
  console.log(data);
  return <div>sdfghjkjhgfdsfghjhgfdsdfghj</div>;
};

export default UnderwritingAttachmentsView;
