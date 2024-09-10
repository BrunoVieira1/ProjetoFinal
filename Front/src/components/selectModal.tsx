import React, { SelectHTMLAttributes, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Api } from "@/api";

interface Brand {
  id: string;
  name: string;
}

interface SelectModalProps extends SelectHTMLAttributes<HTMLSelectElement> {
  location: string;
}

function SelectModal({ location, ...rest }: SelectModalProps) {
  async function getBrands() {
    try {
      setTimeout(async () => {
        console.log(`/${location}`);
        const data = await Api.get(`/${location}`);
        console.log(data);
        setBrands(data.data);
      }, 1000);
    } catch (e) {
      console.error("erro", e);
    }
  }
  useEffect(() => {
    getBrands();
  }, []);
  const [brands, setBrands] = useState<Brand[]>([]);
  return (
    <Select {...rest}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Selecione a Marca" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {brands.map((brand) => {
            return (
              <SelectItem key={brand.id} value={brand.id}>
                {brand.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectModal;
