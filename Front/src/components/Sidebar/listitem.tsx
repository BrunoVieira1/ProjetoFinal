import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/Inbox";
import ListItemText from "@mui/material/ListItemText";

function ListItemSidebar(props) {
  return (
    <ListItem disablePadding className="py-2">
      <ListItemButton>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={props.txt1} secondary={props.txt2} />
      </ListItemButton>
    </ListItem>
  );
}

export default ListItemSidebar;
