export const STYLES = {
  container: {
    p: 3,
    maxWidth: 1100,
    margin: "0 auto",
  },
  paper: {
    p: 4,
    mb: 6,
    borderRadius: 2,
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
    background: "linear-gradient(to bottom right, #ffffff, #f8f9fa)",
    "&:hover": {
      boxShadow: "0 12px 28px rgba(0, 0, 0, 0.15)",
    },
  },
  title: {
    mb: 3,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1565c0",
    position: "relative",
    paddingBottom: "10px",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: "50%",
      transform: "translateX(-50%)",
      width: "100px",
      height: "3px",
      background: "linear-gradient(to right, #1976d2, #64b5f6)",
      borderRadius: "2px",
    },
  },

  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    "&.three-columns": {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
    gap: 2,
    mb: 3,
    "& .MuiFormControl-root": {
      transition: "transform 0.2s ease",
      "&:hover": {
        transform: "translateY(-2px)",
      },
    },
  },
  switchGroup: {
    display: "flex",
    justifyContent: "flex-start",
    gap: 2,
    mb: 3,
    padding: "10px",
    background: "rgba(25, 118, 210, 0.05)",
    borderRadius: "8px",
    transition: "background 0.3s ease",
    "&:hover": {
      background: "rgba(25, 118, 210, 0.08)",
    },
  },
  submitButton: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 2,
    "& button": {
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      "&:before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
        transition: "all 0.5s ease",
      },
      "&:hover:before": {
        left: "100%",
      },
    },
  },
  // استایل‌های جدید برای عناصر فرم
  formInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      transition: "all 0.3s ease",
      "&:hover": {
        boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
      },
      "&.Mui-focused": {
        boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.3)",
      },
    },
  },
  selectInput: {
    "& .MuiSelect-select": {
      borderRadius: "8px",
    },
  },
  textAreaInput: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      transition: "all 0.3s ease",
      width: "100%",
      "&:hover": {
        boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
      },
    },
    "& textarea": {
      width: "100%",
    },
  },
  fullWidthInput: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      width: "100%",
    },
  },
} as const;
