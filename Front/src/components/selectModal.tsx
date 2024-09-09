import React, { useEffect, useState } from "react";
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

function SelectModal(props: any) {
  async function getBrands() {
    try {
      setTimeout(async () => {
        console.log(`/${props.location}`);
        const data = await Api.get(`/${props.location}`);
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
    <Select>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Selecione a Marca" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {brands.map((brand) => {
            return <SelectItem value={brand.id}>{brand.name}</SelectItem>;
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SelectModal;
