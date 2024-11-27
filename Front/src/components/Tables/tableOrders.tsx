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
import DebtorPutModal from "@/modals/debtorPutModal";
import DeleteModal from "@/modals/deleteModal";

interface Debtor {
  id: number;
  name: string;
  price: number;
  date: string;
}

export function TableDemo() {
  async function getDebtors() {
    try {
      const data = await Api.get("/debtor");
      console.log(data.data);
      setDebtors(data.data);
    } catch (e) {
      console.error("erro", e);
    }
  }

  function deleteDebtor(id: number) {
    Api.delete("/debtor", {
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
          <TableHead>Valor</TableHead>
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
              <DeleteModal id={debtor.id} location="debtor"/>
            </TableCell>
            <TableCell className="text-right">
              <DebtorPutModal
                id={debtor.id}
                date={debtor.date}
                price={debtor.price}
                name={debtor.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
