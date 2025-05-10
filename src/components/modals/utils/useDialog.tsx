/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";

export const useDialog = ({DialogContext}: {DialogContext: React.Context<any>}) => {
    const context = useContext(DialogContext);
    if (!context) throw new Error("useDialog must be used within Dialog");
    return context;
  };