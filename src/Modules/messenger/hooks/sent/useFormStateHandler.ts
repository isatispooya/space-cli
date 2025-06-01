import { useCallback } from "react";
import { useSentFormStore } from "../../store/sent/sent.store";

type InputValueType = string | number | boolean | (string | number)[];

export const useFormStateHandler = () => {
  const { handleChange } = useSentFormStore();

  const handleInputChange = useCallback(
    (name: string, value: InputValueType) => {
      if (
        ["sender", "receiver_internal"].includes(name) &&
        typeof value === "string"
      ) {
        handleChange(name, value === "" ? 0 : Number(value));
        return;
      }

      if (
        [
          "seal",
          "signature",
          "letterhead",
          "binding",
          "published",
          "is_internal",
        ].includes(name)
      ) {
        handleChange(name, Boolean(value));
        return;
      }

      if (["reference", "receiver", "attachments"].includes(name)) {
        const arrayValue = !Array.isArray(value) ? [value] : value;
        const numericArray = arrayValue.map((v) => Number(v));
        handleChange(name, numericArray);
        return;
      }

      if (typeof value === "string") {
        handleChange(name, value);
        return;
      }

      handleChange(name, value);
    },
    [handleChange]
  );

  return {
    handleInputChange,
  };
};
