import { Api } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  idBrand: number;
  price: number;
  brand: string;
}
interface Stock {
  id: number;
  idProduct: number;
  minStock: number;
  maxStock: number;
}

export function TableDemo() {
  async function getProduct() {
    try {
      setTimeout(async () => {
        const data = await Api.get("/product");
        const data2 = await Api.get("/stock");
        setProduct(data.data);
        setStock(data2.data);
        console.log(stock);
      }, 1000);
    } catch (e) {
      console.error("erro", e);
    }
  }
  useEffect(() => {
    getProduct();
  }, []);
  const [product, setProduct] = useState<Product[]>([]);
  const [stock, setStock] = useState<Stock[]>([]);
  return (
    <Table className="overflow-scroll bg-scroll">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Marca</TableHead>
          <TableHead className="text-right">Preço</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {product.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.idBrand}</TableCell>
            <TableCell className="text-right">R${product.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
