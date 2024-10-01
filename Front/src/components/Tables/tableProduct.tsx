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
import ProductPutModal from "@/modals/productPutModal";

interface Product {
  id: number;
  brand: string;
  name: string;
  type: string;
  idBrand: number;
  price: number;
}

export function TableDemo() {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState<Product[]>([]);

  async function getProduct() {
    try {
      const data = await Api.get(search.length <= 0 ? "/product" : "/product", {
        params: {
          param1: search,
        },
      });
      setProduct(data.data);
    } catch (e) {
      console.error("erro", e);
    }
  }

  function deleteProduct(id: number) {
    Api.delete("/product", {
      data: {
        id: id,
      },
    });
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <TextField
        id="standard-basic"
        label="Produto"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        variant="standard"
      />
      <Table className="overflow-scroll bg-scroll">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Marca</TableHead>
            <TableHead className="text-right">Preço</TableHead>
            <TableHead className="text-right">Excluir</TableHead>
            <TableHead className="text-right">Editar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {product.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell className="text-right">R${product.price}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant={"destructive"}
                  onClick={() => deleteProduct(product.id)}
                >
                  Excluir
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <ProductPutModal
                  id={product.id}
                  name={product.name}
                  idBrand={product.idBrand}
                  type={product.type}
                  price={product.price}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
