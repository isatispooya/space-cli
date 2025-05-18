import { useCallback } from "react";
import { useSentFormStore } from "../../store/sent/sent.store";

type InputValueType = string | number | boolean | (string | number)[];
type NumericFieldType = "sender" | "receiver_internal";
type BooleanFieldType = "seal" | "signature" | "letterhead" | "binding" | "published" | "is_internal";
type ArrayFieldType = "reference" | "receiver" | "attachments";

const NUMERIC_FIELDS: NumericFieldType[] = ["sender", "receiver_internal"];
const BOOLEAN_FIELDS: BooleanFieldType[] = ["seal", "signature", "letterhead", "binding", "published", "is_internal"];
const ARRAY_FIELDS: ArrayFieldType[] = ["reference", "receiver", "attachments"];

export const useFormStateHandler = () => {
  const { handleFormChange: handleChange } = useSentFormStore();

  const convertToNumber = (value: string): number => {
    return value === "" ? 0 : Number(value);
  };

  const convertToArray = (value: InputValueType): number[] => {
    const arrayValue = !Array.isArray(value) ? [value] : value;
    return arrayValue.map((v) => Number(v));
  };

  const handleInputChange = useCallback(
    (name: string, value: InputValueType) => {
      if (NUMERIC_FIELDS.includes(name as NumericFieldType) && typeof value === "string") {
        handleChange(name, convertToNumber(value));
        return;
      }

      if (BOOLEAN_FIELDS.includes(name as BooleanFieldType)) {
        handleChange(name, Boolean(value));
        return;
      }

      if (ARRAY_FIELDS.includes(name as ArrayFieldType)) {
        handleChange(name, convertToArray(value));
        return;
      }

      if (typeof value === "string") {
        handleChange(name, value.trim());
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
