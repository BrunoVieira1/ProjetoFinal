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
      <div className="flex">
        <Graph />
        <Graph />
      </div>
      <div className="flex gap-2">
        <div className="border border-black rounded">
          <h1 className="border-b border-black font-bold text-red-700 text-center">
            Produtos com baixo estoque
          </h1>
          <div>
            {stockmin.map((sm) => (
              <table key={sm.id}>
                <tr className="border-b border-black bg-red-300">
                  <th className="border-r border-black px-2 text-left">ID</th>
                  <th className="border-r border-black px-2 text-left">Nome</th>
                  <th className="border-r border-black px-2 text-left">
                    Quantidade
                  </th>
                  <th className=" border-black px-2 text-left">
                    Quantidade Minima
                  </th>
                </tr>
                <tr className="bg-red-100">
                  <td className="border-r border-black px-2 text-left">
                    {sm.id}
                  </td>
                  <td className="border-r border-black px-2 text-left">
                    {sm.name}
                  </td>
                  <td className="border-r border-black px-2 text-left">
                    {sm.qtt}
                  </td>
                  <td className=" border-black px-2 text-left">
                    {sm.minStock}
                  </td>
                </tr>
              </table>
            ))}
          </div>
        </div>
        <div className="border border-black rounded">
          <h1 className="border-b border-black font-bold text-green-700 text-center">
            Produtos com alto estoque
          </h1>
          <div>
            {stockmax.map((sm) => (
              <table key={sm.id}>
                <tr className="border-b border-black bg-green-300">
                  <th className="border-r border-black px-2 text-left">ID</th>
                  <th className="border-r border-black px-2 text-left">Nome</th>
                  <th className="border-r border-black px-2 text-left">
                    Quantidade
                  </th>
                  <th className=" border-black px-2 text-left">
                    Quantidade Maxima
                  </th>
                </tr>
                <tr className="bg-green-100">
                  <td className="border-r border-black px-2 text-left">
                    {sm.id}
                  </td>
                  <td className="border-r border-black px-2 text-left">
                    {sm.name}
                  </td>
                  <td className="border-r border-black px-2 text-left">
                    {sm.qtt}
                  </td>
                  <td className=" border-black px-2 text-left">
                    {sm.maxStock}
                  </td>
                </tr>
              </table>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Graphs;
