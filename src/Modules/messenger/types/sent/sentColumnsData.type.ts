import { SentMessageType } from ".";

export interface ColumnPropsType {
  handleEdit: (id: number) => void;
  handleView: (row: SentMessageType) => void;
}
