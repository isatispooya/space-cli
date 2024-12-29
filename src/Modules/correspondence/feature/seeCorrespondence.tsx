import WatchList from "../../../components/watchList"; 

const SeeCorrespondence = ({
  fields,
  imageFields,
}: {
  fields: any;
  imageFields: any;
}) => {
  return (
    <div>
      <WatchList fields={fields} imageFields={imageFields} />
    </div>
  );
};

export default SeeCorrespondence;



