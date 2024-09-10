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
  useEffect(() => {
    getStock();
  }, []);
  const [stock, setStock] = useState<Stock[]>([]);
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
