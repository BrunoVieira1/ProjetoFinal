import InboxIcon from "@mui/icons-material/Inbox";

import { Button } from "../ui/button";

function ListItemSidebar(props: any) {
  return (
    <a href={props.to} className="flex-1 flex-col flex">
      <Button variant="ghost" className="justify-between">
        <InboxIcon />
        {props.txt}
      </Button>
    </a>
  );
}

export default ListItemSidebar;
