
export const STYLES = {
    container: {
      p: 3,
      maxWidth: 800,
      margin: "0 auto",
    },
    paper: {
      p: 4,
      borderRadius: 2,
    },
    title: {
      mb: 3,
      fontWeight: "bold",
      color: "#1976d2",
    },
    buttonGroup: {
      mb: 3,
      display: "flex",
      justifyContent: "center",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gap: 2,
      mb: 3,
    },
    switchGroup: {
      display: "flex",
      justifyContent: "flex-start",
      gap: 2,
      mb: 3,
    },
    submitButton: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 2,
    },
  } as const;
  