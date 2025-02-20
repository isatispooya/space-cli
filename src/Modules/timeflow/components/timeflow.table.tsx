import { useTimeflow } from "../hooks";
import { TabulatorTable } from "../../../components";
import { CellComponent, ColumnDefinition } from "tabulator-tables";
import moment from "moment-jalaali";



const TimeflowTable = () => {
  const { data, isLoading } = useTimeflow.useGetTimeflow();

  console.log(data);

  return <div>TimeflowTable</div>;
};




export default TimeflowTable;




