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

interface Product {
  name: string;
  idBrand: number;
  price: string;
}

function ProductModal() {
  const [product, setProduct] = useState<Product>({
    name: "",
    idBrand: 3,
    price: "",
  });
  async function handleCreate() {
    try {
      Api.post("/product", {
        name: product.name,
        idBrand: product.idBrand,
        price: product.price,
      });
      alert("cadastrado");
      console.log(product);
    } catch (e) {
      console.error("erro", e);
    }
  }
  return (
    <Dialog>
      <DialogTrigger className="hover:underline">
        Adicionar Produto
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Produto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Preço
            </Label>
            <Input
              id="price"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              tipo
            </Label>
            <Input id="type" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">
              Marca
            </Label>
            <SelectModal
              id="brand"
              location="brand"
              onChange={(e) =>
                setProduct({ ...product, idBrand: e.target.value })
              }
              value={product.idBrand}
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

export default ProductModal;
