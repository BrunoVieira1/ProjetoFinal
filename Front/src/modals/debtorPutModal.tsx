import { useState } from "react";
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
  idRequester: number;
}

interface DebtorPutModalProps {
  id: number;
  name: string;
  price: number;
  date: string;
}

const DebtorPutModal: React.FC<DebtorPutModalProps> = ({
  id,
  name,
  price,
  date,
}) => {
  const [debtor, setDebtor] = useState<Debtor>({
    name: name,
    price: price,
    date: date,
    idRequester: 1,
  });

  async function handleUpdate() {
    try {
      await Api.put(`/debtor`, {
        id: id,
        name: debtor.name,
        price: debtor.price,
        date: debtor.date,
        idRequester: debtor.idRequester,
      });
      alert("Devedor atualizado com sucesso");
      console.log(debtor);
    } catch (e) {
      console.error("Erro ao atualizar devedor", e);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="hover:underline">
        <Button>Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Devedor</DialogTitle>
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
              Preço
            </Label>
            <Input
              id="price"
              value={debtor.price}
              onChange={(e) => setDebtor({ ...debtor, price: +e.target.value })}
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Data
            </Label>
            <Input
              id="date"
              type="date"
              value={debtor.date}
              onChange={(e) => setDebtor({ ...debtor, date: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleUpdate}>
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DebtorPutModal;
