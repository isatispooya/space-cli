import { Paper, Typography, Button } from "@mui/material";
import { DynamicList } from "@/components";
import { WorkShiftTypes } from "../types";
import ShiftItem from "./shiftsItem.list";

const ShiftList = ({
  shifts,
  isSubmitting,
  searchQuery,
  visibleItems,
  shiftName,
  onSearchChange,
  onLoadMore,
  onDelete,
  onUpdate,
  onSubmit,
}: WorkShiftTypes["ShiftListProps"]) => (
  <Paper
    sx={{
      mt: 4,
      p: { xs: 2, sm: 4 },
      borderRadius: 3,
      bgcolor: "#fff",
      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
    }}
  >
    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, color: "#1e293b" }}>
      لیست شیفت‌ها
    </Typography>

    <DynamicList
      data={shifts}
      isPending={isSubmitting}
      searchQuery={searchQuery}
      visibleItems={visibleItems}
      onSearchChange={onSearchChange}
      onItemClick={() => {}}
      onLoadMore={onLoadMore}
      renderItem={(item) => (
        <ShiftItem
          shift={item}
          index={shifts.indexOf(item)}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      )}
      noResultsMessage="هیچ شیفتی یافت نشد"
    />

    <Button
      variant="contained"
      onClick={onSubmit}
      disabled={
        isSubmitting ||
        !shiftName ||
        !shifts.every((shift) => shift.startTime && shift.endTime)
      }
      fullWidth
      sx={{
        mt: 4,
        py: 1.5,
        borderRadius: 2,
        bgcolor: "#29D2C7",
        "&:hover": { bgcolor: "#29D2C7" },
        "&:disabled": { bgcolor: "#e5e7eb", color: "#9ca3af" },
      }}
    >
      {isSubmitting ? "در حال ثبت..." : "ثبت نهایی شیفت‌ها"}
    </Button>
  </Paper>
);

export default ShiftList;
