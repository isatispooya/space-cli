import { useDeleteCompany } from "../hooks/useDeleteCompany";
import { CompanyData } from "../types";

const DeleteCompany = ({ data }: { data: CompanyData }) => {
  const { mutate: deleteCompany } = useDeleteCompany();
  return (
    <div>
      <h2>آیا از حذف شرکت {data.name} مطمئن هستید؟</h2>
      <button onClick={() => deleteCompany(data.id)}>حذف</button>
    </div>
  );
};

export default DeleteCompany;
