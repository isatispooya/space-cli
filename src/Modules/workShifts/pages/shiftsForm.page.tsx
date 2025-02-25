import { ShiftsForm } from "../features";

const ShiftsFormPage = () => {
  return (
    <>
      {/* <div
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

        </ButtonGroup>
      </div> */}
      {/* فرم‌ها بیرون از div وسط‌چین */}
      <ShiftsForm />
    </>
  );
};

export default ShiftsFormPage;
