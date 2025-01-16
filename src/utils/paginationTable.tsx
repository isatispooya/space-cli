import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import "../styles/pagination.css";

interface CustomPaginationProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rows: any[]; // Adjust type as necessary
  pageSize: number;
  paginationModel: { page: number; pageSize: number }; // Add this line
  onPageChange: (newPage: number) => void; // Add this line
  pageSizeOptions: number[]; // Add this line
  onPageSizeChange: (newSize: number) => void; // Add this line
  // ... other props
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
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

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < pageCount) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="custom-pagination" {...props}>
      <FormControl variant="outlined" size="small" className="page-size-select">
        <InputLabel id="page-size-label">Page Size</InputLabel>
        <Select
          labelId="page-size-label"
          value={pageSize}
          onChange={(e) => onPageSizeChange(e.target.value as number)}
        >
          {pageSizeOptions.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="pagination-button"
      >
        قبلی
      </button>
      <span className="pagination-info">
        صفحه {currentPage + 1} از {pageCount}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= pageCount - 1}
        className="pagination-button"
      >
        بعدی
      </button>
    </div>
  );
};

export default CustomPagination;
