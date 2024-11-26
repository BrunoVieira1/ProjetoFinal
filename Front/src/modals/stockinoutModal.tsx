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
import SelectModal from "@/components/selectModal";
import { Api } from "@/api";

interface StockInOut {
  idProduct: number;
  qtt: number;
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
        date: dataAtual,
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
  });

  const handleBrandChange = (value: string) => {
    setStockInOut({ ...stockInOut, idProduct: +value });
  };
  const [dataAtual, setDataAtual] = useState("");

  useEffect(() => {
    const data = new Date();
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // getMonth() retorna de 0 a 11, então somamos 1
    const dia = String(data.getDate()).padStart(2, "0"); // padStart para garantir dois dígitos
    setDataAtual(`${ano}-${mes}-${dia}`);
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="hover:underline bg-zinc-900 text-white p-2 rounded">
        {location != "stockin" ? "Adicionar Venda" : "Adicionar Gasto"}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {location != "stockin" ? "Adicionar Venda" : "Adicionar Gasto"}
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
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default StockInOutModal;
