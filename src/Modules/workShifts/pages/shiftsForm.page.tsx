import { ButtonGroup } from "@mui/material";
import { Button } from "@mui/material";
import { ShiftsForm, ShiftsUpdateForm } from "../features";
import { useState } from "react";

const ShiftsFormPage = () => {
  const [activeForm, setActiveForm] = useState("create");

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center", 
          alignItems: "center", 
        }}
      >
        <ButtonGroup aria-label="Basic button group">
          <Button
            onClick={() => setActiveForm("create")}
            variant={activeForm === "create" ? "contained" : "outlined"}
          >
            ایجاد
          </Button>
          <Button
            onClick={() => setActiveForm("edit")}
            variant={activeForm === "edit" ? "contained" : "outlined"}
          >
            ویرایش
          </Button>
        </ButtonGroup>
      </div>
      {/* فرم‌ها بیرون از div وسط‌چین */}
      {activeForm === "create" && <ShiftsForm />}
      {activeForm === "edit" && <ShiftsUpdateForm />}
    </>
  );
};

export default ShiftsFormPage;