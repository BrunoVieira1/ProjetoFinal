import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Api } from "@/api";

interface Debtor {
  name: string;
  price: number;
  date: string;
}

function DebtorModal() {
  async function handleCreate() {
    try {
      await Api.post("/debtor", {
        name: debtor.name,
        price: debtor.price,
        date: dataAtual,
        idRequester: 1,
      });
      alert("Devedor cadastrado com sucesso!");
      console.log(debtor);
    } catch (e) {
      console.error("Erro ao cadastrar devedor", e);
    }
  }

  const [dataAtual, setDataAtual] = useState("");

  useEffect(() => {
    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // getMonth() retorna de 0 a 11, então somamos 1
    const dia = String(data.getDate()).padStart(2, "0"); // padStart para garantir dois dígitos
    setDataAtual(`${ano}-${mes}-${dia}`);
  }, []);
  const [debtor, setDebtor] = useState<Debtor>({
    name: "",
    price: 0,
    date: "",
  });

  return (
    <Dialog>
      <DialogTrigger className="hover:underline">
        Adicionar Devedor
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Devedor</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={debtor.name}
              onChange={(e) => setDebtor({ ...debtor, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Valor
            </Label>
            <Input
              id="price"
              value={debtor.price}
              onChange={(e) => setDebtor({ ...debtor, price: +e.target.value })}
              type="number"
              className="col-span-3"
            />
          </div>
          
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreate}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DebtorModal;
