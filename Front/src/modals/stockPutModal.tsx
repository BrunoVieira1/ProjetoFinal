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
import SelectModal from "@/components/selectModal";
import { Api } from "@/api";

interface Stock {
  idProduct: number;
  minStock: number;
  maxStock: number;
  qtt: number;
}

interface StockPutModalProps {
  id: number;
  idProduct: number;
  minStock: number;
  maxStock: number;
  qtt: number;
}

const StockPutModal: React.FC<StockPutModalProps> = ({
  id,
  idProduct,
  minStock,
  maxStock,
  qtt,
}) => {
  const [stock, setStock] = useState<Stock>({
    idProduct: idProduct,
    minStock: minStock,
    maxStock: maxStock,
    qtt: qtt,
  });
  async function handleCreate() {
    try {
      Api.put("/stock", {
        id: id,
        idProduct: stock.idProduct,
        minStock: stock.minStock,
        maxStock: stock.maxStock,
        qtt: stock.qtt,
        idRequester: 1,
      });
      alert("cadastrado");
      console.log(stock);
    } catch (e) {
      console.error("erro", e);
    }
  }
  return (
    <Dialog>
      <DialogTrigger className="hover:underline">
        <Button>Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>editar Estoque</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Estoque Minimo
            </Label>
            <Input
              id="name"
              value={stock.minStock}
              onChange={(e) =>
                setStock({ ...stock, minStock: +e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Estoque Maximo
            </Label>
            <Input
              id="price"
              value={stock.maxStock}
              onChange={(e) =>
                setStock({ ...stock, maxStock: +e.target.value })
              }
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Quantidade
            </Label>
            <Input
              id="type"
              value={stock.qtt}
              onChange={(e) => setStock({ ...stock, qtt: +e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="product" className="text-right">
              Nome Produto
            </Label>
            <SelectModal
              id="product"
              location="product"
              value={stock.idProduct}
              onChange={(e) =>
                setStock({ ...stock, idProduct: +e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreate}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StockPutModal;
