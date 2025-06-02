import { ReceiveMessageType } from ".";

export interface ExtendedReceiveMessageType extends ReceiveMessageType {
    seen?: boolean;
  }
  
  export interface CellFormatterParamsType {
    getValue: () => string;
    getRow: () => { getData: () => ExtendedReceiveMessageType };
    getElement: () => HTMLElement;
  }

export interface ColumnsProps {
  handlePublish: (id: number) => void;
}
