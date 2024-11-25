import List from "@mui/material/List";
import ListItemSidebar from "./listitem";
import Avatar from "@mui/material/Avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Api } from "@/api";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}
function Sidebar() {
  const UserId = localStorage.getItem("IdLogin");

  async function getUser() {
    try {
      if (!UserId) {
        throw new Error("UserId não encontrado no localStorage");
      }

      const response = await Api.get("/user/auth", {
        params: { id: UserId },
      });

      setUser(response.data);
      console.log(user);
    } catch (e) {
      console.error("Erro ao buscar usuário:", e);
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  const [user, setUser] = useState<User>({
    id: 0,
    name: "b",
  });
  return (
    <>
      <div className="bg-yellow-400 min-h-screen fixed p-5 flex flex-col gap-3 w-64 max-w-64">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <Avatar>{user.name[0].toUpperCase()}</Avatar>
              {user.name}
            </AccordionTrigger>

            <AccordionContent className="flex flex-col gap-2">
              
              <Dialog>
                <DialogTrigger className="bg-red-600 rounded py-2 hover:bg-red-500 transition-all">
                  Sair
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Tem Certeza?</DialogTitle>
                    <DialogDescription>
                      Você sera mandado para a tela de login.
                    </DialogDescription>
                  </DialogHeader>

                  <Button
                    variant="destructive"
                    onClick={() => (
                      localStorage.setItem("IdLogin", "0"),
                      window.location.reload()
                    )}
                  >
                    Sair
                  </Button>
                </DialogContent>
              </Dialog>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="w-full h-0.5 bg-white rounded-full" />
        <List>
          <ListItemSidebar txt="Produtos" to="/products" />
          <ListItemSidebar txt="Estoque" to="/stock" />
          <ListItemSidebar txt="Gastos/Ganhos" to="/inout" />
          <ListItemSidebar txt="Fiados" to="/debtors" />
          <div className="w-full h-0.5 bg-white rounded-full" />
          <ListItemSidebar txt="Relatório" to="/report" />
          <ListItemSidebar txt="Graficos" to="/" />
        </List>
      </div>
    </>
  );
}

export default Sidebar;
