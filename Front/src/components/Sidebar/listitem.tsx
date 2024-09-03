import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/Inbox";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "../ui/button";

function ListItemSidebar(props: any) {
  return (
    <a href="/stock" className="flex-1 flex-col flex">
      {/* <ListItem disablePadding className="py-2">
        <ListItemButton>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={props.txt1} secondary={props.txt2} />
        </ListItemButton>
      </ListItem> */}
      <Button variant="ghost" className="justify-between">
        <InboxIcon />
        xd
      </Button>
    </a>
  );
}

export default ListItemSidebar;
