import { useContext } from "react";

export const useDialog = ({DialogContext}) => {
    const context = useContext(DialogContext);
    if (!context) throw new Error("useDialog must be used within Dialog");
    return context;
  };