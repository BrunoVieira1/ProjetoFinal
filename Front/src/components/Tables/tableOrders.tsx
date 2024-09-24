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

interface Debtor {
  id: number;
  name: string;
  price: number;
  date: string;
}

export function TableDemo() {
  async function getDebtors() {
    try {
      setTimeout(async () => {
        const data = await Api.get("/debtor");
        console.log(data.data);
        setDebtors(data.data);
      }, 1000);
    } catch (e) {
      console.error("erro", e);
    }
  }

  function deleteDebtor(id: number) {
    Api.delete("/debtors", {
      data: {
        id: id,
      },
    });
  }

  const [debtors, setDebtors] = useState<Debtor[]>([]);
  useEffect(() => {
    getDebtors();
  }, []);

  return (
    <Table className="overflow-scroll bg-scroll">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Preço</TableHead>
          <TableHead>Data</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {debtors.map((debtor) => (
          <TableRow key={debtor.id}>
            <TableCell className="font-medium">{debtor.id}</TableCell>
            <TableCell>{debtor.name}</TableCell>
            <TableCell>{debtor.price}</TableCell>
            <TableCell>{debtor.date}</TableCell>
            <TableCell className="text-right">
              <Button
                variant={"destructive"}
                onClick={() => deleteDebtor(debtor.id)}
              >
                Excluir
              </Button>
            </TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
