export const tableStyles = {
  border: "none",
  "& .MuiDataGrid-root": {
    border: "none",
  },
  "& .Mui-selected": {
    backgroundColor: "rgba(25, 118, 210, 0.08) !important",
    borderRadius: "30px !important",
  },
  "& .MuiDataGrid-main": {
    borderRadius: "24px",
  },
  "& .MuiDataGrid-virtualScroller": {
    borderRadius: "24px",
  },
  "& .MuiDataGrid-footerContainer": {
    borderRadius: "0 0 24px 24px",
  },
  "& .MuiDataGrid-columnHeaders": {
    borderRadius: "24px 24px 0 0",
    backgroundColor: "#f8fafc",
    borderBottom: "none",
    "& .MuiDataGrid-columnHeader": {
      color: "#64748b",
      fontWeight: "600",
      fontSize: "0.875rem",
      "&:focus": {
        outline: "none",
      },
      "&:focus-within": {
        outline: "none",
      },
    },
  },
  "& .MuiButtonBase-root": {
    gap: "8px",
  },
  "& .MuiDataGrid-toolbarContainer": {
    gap: "16px",
    padding: "16px",
    "& .MuiButton-root": {
      color: "#64748b",
      gap: "8px",
    },
    "& .MuiButtonBase-root svg": {
      fontSize: "1.2rem",
    },
  },
};
