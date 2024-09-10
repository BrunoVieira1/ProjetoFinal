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
  type: string;
  price: number;
  idRequester: number;
}

function ProductPutModal(
  id: number,
  name: string,
  idBrand: number,
  type: string,
  price: number
) {
  async function handleCreate() {
    try {
      Api.put("/product", {
        id: id,
        name: product.name,
        idBrand: product.idBrand,
        type: product.type,
        price: product.price,
        idRequester: product.idRequester,
      });
      alert("cadastrado");
      console.log(product);
    } catch (e) {
      console.error("erro", e);
    }
  }
  const [product, setProduct] = useState<Product>({
    name: name,
    idBrand: idBrand,
    type: type,
    price: price,
    idRequester: 1,
  });
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
                setProduct({ ...product, price: +e.target.value })
              }
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              tipo
            </Label>
            <Input
              id="type"
              value={product.type}
              onChange={(e) => setProduct({ ...product, type: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="brand" className="text-right">
              Marca
            </Label>
            <SelectModal
              id="brand"
              location="brand"
              value={product.idBrand}
              onChange={(e) =>
                setProduct({ ...product, idBrand: +e.target.value })
              }
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

export default ProductPutModal;
