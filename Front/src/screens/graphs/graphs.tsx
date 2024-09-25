import { Api } from "@/api";
import Graph from "../../components/graph";
import Logo from "../../components/logo";
import { useEffect, useState } from "react";

interface Stock {
  id: number;
  idProduct: number;
  minStock: number;
  maxStock: number;
  qtt: number;
  name: string;
}

function Graphs() {
  async function getMinMax() {
    try {
      const data = await Api.get("/stock/min");
      setStockmin(data.data[0]);
      setStockmax(data.data[1]);
      console.log(stockmin);
      console.log(stockmax);
    } catch (e) {
      console.error(e);
    }
  }
  const [stockmin, setStockmin] = useState<Stock[]>([]);
  const [stockmax, setStockmax] = useState<Stock[]>([]);
  useEffect(() => {
    getMinMax();
  }, []);
  return (
    <div className="flex justify-center items-center w-full flex-col gap-4">
      <Logo />
      <div className="flex flex-1">
        <Graph />
        <Graph />
      </div>
      <div></div>
    </div>
  );
}

export default Graphs;
