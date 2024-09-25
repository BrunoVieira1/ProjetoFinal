import React, { useState } from "react";
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

interface StockInOut {
  idProduct: number;
  qtt: number;
  date: string;
}
interface props {
  location: string;
}

function StockInOutModal({ location }: props) {
  async function handleCreate() {
    try {
      await Api.post(`/${location}`, {
        idProduct: stockInOut.idProduct,
        qtt: stockInOut.qtt,
        date: stockInOut.date,
        idRequester: 1,
      });
      alert("Cadastrado com sucesso");
      console.log(stockInOut);
    } catch (e) {
      console.error("Erro", e);
    }
  }
  console.log(location);

  const [stockInOut, setStockInOut] = useState<StockInOut>({
    idProduct: 2,
    qtt: 0,
    date: "",
  });

  const handleBrandChange = (value: string) => {
    setStockInOut({ ...stockInOut, idProduct: +value });
  };

  return (
    <Dialog>
      <DialogTrigger className="hover:underline">
        {location != "stockin" ? "Adicionar Venda" : "Adicionar Gasto"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {location == "stockin" ? "Adicionar Venda" : "Adicionar Gasto"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="qtt" className="text-right">
              Quantidade
            </Label>
            <Input
              id="qtt"
              value={stockInOut.qtt}
              onChange={(e) =>
                setStockInOut({ ...stockInOut, qtt: +e.target.value })
              }
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
              value={stockInOut.date}
              onChange={(e) =>
                setStockInOut({ ...stockInOut, date: e.target.value })
              }
              type="date"
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
              value={stockInOut.idProduct}
              onValueChange={handleBrandChange}
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
}

export default StockInOutModal;
