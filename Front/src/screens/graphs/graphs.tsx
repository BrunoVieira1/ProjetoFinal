import { Api } from "@/api";
import Graph from "../../components/graph";
import Logo from "../../components/logo";
import { useEffect, useState } from "react";
import StockInOutModal from "@/modals/stockinoutModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Stock {
  id: number;
  idProduct: number;
  minStock: number;
  maxStock: number;
  qtt: number;
  name: string;
}
interface StockInOut {
  id: number;
  idProduct: number;
  qtt: number;
  date: string;
  name: string;
  price: number;
}
interface Product {
  id: number;
  brand: string;
  name: string;
  type: string;
  idBrand: number;
  price: number;
}
function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day); // Mês em Date é zero-based (0 = Janeiro)
}

const Graphs = () => {
  const [selectedValue, setSelectedValue] = useState("1");
  const [stockin, setStockin] = useState<StockInOut[]>([]);
  const [stockout, setStockout] = useState<StockInOut[]>([]);
  const [stockmin, setStockmin] = useState<Stock[]>([]);
  const [stockmax, setStockmax] = useState<Stock[]>([]);
  const [idproduct, setIdproduct] = useState("0");
  const [product, setProduct] = useState<Product[]>([]);
  const handleSelectChange = (value: any) => {
    setSelectedValue(value);
    console.log(value);
  };
  const handleSelectProduct = (value: any) => {
    setIdproduct(value);
    console.log(value);
  };

  async function getData1() {
    try {
      const data1 = await Api.get(
        `/stockin/getgraph?day=${selectedValue}&idproduct=${idproduct}`
      );
      data1.data.sort(
        (a: any, b: any) =>
          parseDate(b.date).getTime() - parseDate(a.date).getTime()
      );

      console.log(data1);
      setStockin(data1.data);
    } catch (e) {
      console.error(e);
    }
  }

  async function getData2() {
    try {
      const data1 = await Api.get(
        `/stockout/getgraph?day=${selectedValue}&idproduct=${idproduct}`
      );
      data1.data.sort(
        (a: any, b: any) =>
          parseDate(b.date).getTime() - parseDate(a.date).getTime()
      );

      console.log(data1);
      setStockout(data1.data);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getData1();
    getData2();
  }, [selectedValue, idproduct]);

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
  async function getProduct() {
    try {
      const data = await Api.get("/product");
      setProduct(data.data);
    } catch (e) {
      console.error(e);
    }
  }
  console.log(product);
  useEffect(() => {
    getMinMax();
    getProduct();
  }, []);
  return (
    <div className="flex justify-center items-center w-full flex-col gap-4">
      <Logo />
      <div className="gap-8 flex">
        <StockInOutModal location="stockin" />
        <StockInOutModal location="stockout" />
      </div>
      <div className="flex gap-8">
        <Select value={selectedValue} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Dias do Grafico" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Diario</SelectItem>
            <SelectItem value="7">Semanal</SelectItem>
            <SelectItem value="30">Mensal</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={handleSelectProduct} value={idproduct}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Produto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Todos</SelectItem>
            {product.map((product) => {
              return (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="flex">
        <div>
          <h1 className="text-center">Grafico de Compras</h1>
          <Graph stockinout={stockin} />
        </div>
        <div>
          <h1 className="text-center">Graficos de Vendas</h1>
          <Graph stockinout={stockout} />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="border border-black rounded">
          <h1 className="border-b border-black font-bold text-red-700 text-center">
            Produtos com baixo estoque
          </h1>
          <div>
            <table>
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
              {stockmin.map((sm) => (
                <tr className="bg-red-100 border-b border-black" key={sm.id}>
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
              ))}
            </table>
          </div>
        </div>
        <div className="border border-black rounded">
          <h1 className="border-b border-black font-bold text-green-700 text-center">
            Produtos com alto estoque
          </h1>
          <div>
            <table>
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
              {stockmax.map((sm) => (
                <tr className="bg-green-100 border-b border-black" key={sm.id}>
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
              ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graphs;
