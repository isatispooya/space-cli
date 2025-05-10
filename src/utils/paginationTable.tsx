import { MenuItem, Select, FormControl } from "@mui/material";
import "../styles/pagination.css";
import { MdArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

interface CustomPaginationPropsType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]; 
  pageSize: number;
  paginationModel: { page: number; pageSize: number };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPageChange: (event: any, newPage: number) => void; 
  pageSizeOptions: number[];
  onPageSizeChange: (newSize: number) => void;
}

const CustomPagination: React.FC<CustomPaginationPropsType> = ({
  rows,
  pageSize,
  paginationModel,
  onPageChange,
  pageSizeOptions,
  onPageSizeChange,
  ...props
}) => {
  const currentPage = paginationModel.page;
  const pageCount =
    rows.length > 0 ? Math.ceil(rows.length / paginationModel.pageSize) : 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePageChange = (event: any, newPage: number) => {
    if (newPage >= 0 && newPage < pageCount) {
      onPageChange(event, newPage);
    }
  };

  return (
    <div className="flex items-center justify-between ml-[100px]" {...props}>
      <FormControl variant="outlined" size="small" className="ml-3">
        <Select
          labelId="page-size-label"
          value={pageSize}
          onChange={(e) => onPageSizeChange(e.target.value as number)}
          className="border border-gray-100  focus:ring focus:ring-blue-500"
        >
          {pageSizeOptions.map((size) => (
            <MenuItem key={size} value={size} className="hover:bg-gray-200">
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <button
        onClick={(event) => handlePageChange(event, currentPage - 1)}
        disabled={currentPage === 0}
        className=" text-black  hover:text-blue-600 disabled:opacity-50"
      >
        <MdOutlineArrowForwardIos />
      </button>
      <span className="mx-4 text-gray-700">
        صفحه {currentPage + 1} از {pageCount}
      </span>
      <button
        onClick={(event) => handlePageChange(event, currentPage + 1)}
        disabled={currentPage >= pageCount - 1}
        className=" text-black  hover:text-blue-600 disabled:opacity-50"
      >
        <MdArrowBackIosNew />
      </button>
    </div>
  );
};

export default CustomPagination;
