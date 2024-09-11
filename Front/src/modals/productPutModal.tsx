import { useState } from "react";
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

interface ProductPutModalProps {
  id: number;
  name: string;
  idBrand: number;
  type: string;
  price: number;
}

const ProductPutModal: React.FC<ProductPutModalProps> = ({
  id,
  name,
  idBrand,
  type,
  price,
}) => {
  const [product, setProduct] = useState<Product>({
    name: name,
    idBrand: idBrand,
    type: type,
    price: price,
    idRequester: 1,
  });

  async function handleCreate() {
    try {
      await Api.put("/product", {
        id: id,
        name: product.name,
        idBrand: product.idBrand,
        type: product.type,
        price: product.price,
        idRequester: product.idRequester,
      });
      alert("Produto atualizado");
      console.log(product);
    } catch (e) {
      console.error("Erro ao atualizar produto", e);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="hover:underline">
        <Button>Editar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
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
              Tipo
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
            Salvar alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductPutModal;
