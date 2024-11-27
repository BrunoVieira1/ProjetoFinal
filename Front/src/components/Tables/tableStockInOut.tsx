import { Api } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import StockInOutModal from "@/modals/stockinoutModal";
import StockInOutPutModal from "@/modals/stockinoutPutModal";
import DeleteModal from "@/modals/deleteModal";

interface StockInOut {
  id: number;
  idProduct: number;
  qtt: number;
  date: string;
  name: string;
}
interface props {
  location: string;
}

function TableStockinout({ location }: props) {
  const [stockinout, setStockinout] = useState<StockInOut[]>([]);

  async function getStockinout() {
    try {
      setTimeout(async () => {
        const data = await Api.get(`/${location}`);
        data.data.sort((a: any, b: any) => a.id - b.id);
        setStockinout(data.data);
        console.log(data.data);
      });
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getStockinout();
  }, []);
  function deleteStockInOut(id: number) {
    Api.delete(`/${location}`, {
      data: {
        id: id,
      },
    });
  }
  return (
    <div className="overflow-y-scroll max-h-[320px]">
      <StockInOutModal location={location} />
      <Table className="overflow-y-scroll h-2">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead className="text-right">Data</TableHead>
            <TableHead className="text-right">Excluir</TableHead>
            <TableHead className="text-right">Editar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockinout.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.qtt}</TableCell>
              <TableCell className="text-right">{product.date}</TableCell>
              <TableCell className="text-right">
                <DeleteModal id={product.id} location={location} />
              </TableCell>
              <TableCell className="text-right">
                <StockInOutPutModal
                  id={product.id}
                  idProduct={product.idProduct}
                  qtt={product.qtt}
                  date={product.date}
                  location={location}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableStockinout;
