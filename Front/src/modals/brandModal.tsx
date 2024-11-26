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
import { Api } from "@/api";

interface Brand {
  name: string;
  idRequester: number;
}

function BrandModal() {
  const [brand, setBrand] = useState<Brand>({
    name: "",
    idRequester: 1,
  });

  async function handleCreate() {
    try {
      await Api.post("/brand", {
        name: brand.name,
        idRequester: brand.idRequester,
      });
      alert("Marca cadastrada com sucesso!");
      console.log(brand);
    } catch (e) {
      console.error("Erro ao cadastrar marca:", e);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="hover:underline">
        Adicionar Marca
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Marca</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={brand.name}
              onChange={(e) => setBrand({ ...brand, name: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreate}>
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BrandModal;
