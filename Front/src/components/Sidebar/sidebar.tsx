import List from "@mui/material/List";
import ListItemSidebar from "./listitem";
import Avatar from "@mui/material/Avatar";

function Sidebar() {
  return (
    <>
      <div className="bg-yellow-400 h-screen max-w-64 p-5 flex flex-col gap-3">
        <a href="" className="flex justify-between">
          <div>
            <h3 className="text-zinc-500">Bem Vindo!</h3>
            <h2 className="font-bold">Bruno.</h2>
          </div>
          <Avatar>B</Avatar>
        </a>
        <div className="w-full h-0.5 bg-white rounded-full" />
        <List>
          <ListItemSidebar />
          <ListItemSidebar />
          <ListItemSidebar />
          <div className="w-full h-0.5 bg-white rounded-full" />
          <ListItemSidebar />
          <ListItemSidebar />
        </List>
      </div>
    </>
  );
}

export default Sidebar;
