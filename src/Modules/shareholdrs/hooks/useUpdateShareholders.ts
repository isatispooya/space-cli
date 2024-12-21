import { useMutation } from "@tanstack/react-query";
import { patchShareholders } from "../services";
import { ShareholdersTypes } from "../types";
import axios from "axios";

interface UpdateShareholdersTypes {
  id: number;
  data: ShareholdersTypes;
}

const useUpdateShareholders = () => {
  return useMutation<any, Error, CreateShareholderDTO>((data) => 
    axios.post('/api/shareholders/', data)
  );
};

export default useUpdateShareholders;
