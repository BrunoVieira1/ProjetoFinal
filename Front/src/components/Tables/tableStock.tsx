import { Api } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import StockPutModal from "@/modals/stockPutModal";

interface Stock {
  id: number;
  idProduct: number;
  minStock: number;
  maxStock: number;
  qtt: number;
  name: string;
}
export function TableDemo() {
  async function getStock() {
    try {
      setTimeout(async () => {
        const data = await Api.get("/stock");
        console.log(data);
        setStock(data.data);
      }, 1000);
    } catch (e) {
      console.error("erro", e);
    }
  }
  function deleteStock(id: number) {
    Api.delete("/stock", {
      data: {
        id: id,
      },
    });
  }
  const [stock, setStock] = useState<Stock[]>([]);
  useEffect(() => {
    getStock();
  }, []);
  return (
    <Table className="overflow-scroll bg-scroll">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Estoque Minimo</TableHead>
          <TableHead>Estoque Maximo</TableHead>
          <TableHead className="text-right">Quantidade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stock.map((stock) => (
          <TableRow key={stock.id}>
            <TableCell className="font-medium">{stock.id}</TableCell>
            <TableCell>{stock.name}</TableCell>
            <TableCell>{stock.minStock}</TableCell>
            <TableCell>{stock.maxStock}</TableCell>
            <TableCell className="text-right">{stock.qtt}</TableCell>
            <TableCell className="text-right">
              <Button
                variant={"destructive"}
                onClick={() => deleteStock(stock.id)}
              >
                Excluir
              </Button>
            </TableCell>
            <TableCell className="text-right">
              <StockPutModal
                id={stock.id}
                idProduct={stock.idProduct}
                minStock={stock.minStock}
                maxStock={stock.maxStock}
                qtt={stock.qtt}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
