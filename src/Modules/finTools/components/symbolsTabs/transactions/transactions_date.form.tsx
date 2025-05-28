import { useParams } from "react-router-dom";
import { useSymbols } from "../../../hooks";

const TransactionsDate = () => {
  const { id } = useParams();
  const { data: symbol } = useSymbols.useGetSymbolsById(Number(id));

  const symbolID = symbol?.[0]?.symbol;
  const { data  } = useSymbols.useGetTransactionsDates(Number(symbolID));
  console.log(data , "1234567");
  return <div>TransactionsDateForm</div>;
};

export default TransactionsDate;
