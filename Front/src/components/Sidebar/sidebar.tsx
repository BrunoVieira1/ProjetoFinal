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
          <ListItemSidebar txt1="Estoque" txt2="" to="/stock" />
          <ListItemSidebar txt1="Gastos/Ganhos" txt2="" />
          <ListItemSidebar txt1="Pedidos" txt2="" to="/orders" />
          <div className="w-full h-0.5 bg-white rounded-full" />
          <ListItemSidebar txt1="Relatório" txt2="" />
          <ListItemSidebar txt1="Graficos" txt2="" to="/" />
        </List>
      </div>
    </>
  );
}

export default Sidebar;
