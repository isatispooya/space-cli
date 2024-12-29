import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

interface TransferListItem {
  id: number;
  name: string;
  codename: string;
}

interface TransferListProps {
  leftTitle?: React.ReactNode;
  rightTitle?: React.ReactNode;
  leftItems: TransferListItem[];
  rightItems: TransferListItem[];
  onChange?: (left: TransferListItem[], right: TransferListItem[]) => void;
  searchPlaceholder?: string;
}

const not = (a: TransferListItem[], b: TransferListItem[]) => {
  return a.filter((item) => !b.find((bItem) => bItem.id === item.id));
};

const intersection = (a: TransferListItem[], b: TransferListItem[]) => {
  return a.filter((item) => b.find((bItem) => bItem.id === item.id));
};

const union = (a: TransferListItem[], b: TransferListItem[]) => {
  return [...a, ...not(b, a)];
};

const TransferList: React.FC<TransferListProps> = ({
  leftTitle = "Permissions",
  rightTitle = "Selected Permissions",
  leftItems: initialLeftItems = [],
  rightItems: initialRightItems = [],
  onChange,
  searchPlaceholder = "Search permissions...",
}) => {
  const [checked, setChecked] = React.useState<TransferListItem[]>([]);
  const [left, setLeft] = React.useState<TransferListItem[]>(initialLeftItems);
  const [right, setRight] =
    React.useState<TransferListItem[]>(initialRightItems);
  const [searchLeft, setSearchLeft] = React.useState("");
  const [searchRight, setSearchRight] = React.useState("");

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  React.useEffect(() => {
    onChange?.(left, right);
  }, [left, right, onChange]);

  const handleToggle = (value: TransferListItem) => () => {
    const currentIndex = checked.findIndex((item) => item.id === value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: TransferListItem[]) =>
    intersection(checked, items || []).length;

  const handleToggleAll = (items: TransferListItem[]) => () => {
    const safeItems = items || [];
    if (numberOfChecked(safeItems) === safeItems.length) {
      setChecked(not(checked, safeItems));
    } else {
      setChecked(union(checked, safeItems));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const filterItems = (items: TransferListItem[], searchText: string) => {
    const safeItems = items || [];
    if (!searchText) return safeItems;
    return safeItems.filter(
      (item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.codename.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const customList = (
    title: React.ReactNode,
    items: TransferListItem[],
    searchValue: string,
    onSearchChange: (value: string) => void
  ) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items || []) === (items || []).length &&
              (items || []).length !== 0
            }
            indeterminate={
              numberOfChecked(items || []) !== (items || []).length &&
              numberOfChecked(items || []) !== 0
            }
            disabled={(items || []).length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items || [])}/${
          (items || []).length
        } selected`}
      />
      <Divider />
      <TextField
        size="small"
        sx={{ m: 1, width: "calc(100% - 16px)" }}
        placeholder={searchPlaceholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <List
        sx={{
          width: 300,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {filterItems(items, searchValue).map((item) => {
          const labelId = `transfer-list-item-${item.id}-label`;

          return (
            <ListItemButton
              key={item.id}
              role="listitem"
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.some(
                    (checkedItem) => checkedItem.id === item.id
                  )}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={item.name}
                secondary={item.codename}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid
      container
      spacing={2}
      sx={{ justifyContent: "center", alignItems: "center" }}
    >
      <Grid item>{customList(leftTitle, left, searchLeft, setSearchLeft)}</Grid>
      <Grid item>
        <Grid container direction="column" sx={{ alignItems: "center" }}>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        {customList(rightTitle, right, searchRight, setSearchRight)}
      </Grid>
    </Grid>
  );
};

export default TransferList;
