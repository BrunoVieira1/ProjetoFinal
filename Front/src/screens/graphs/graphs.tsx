import { Api } from "@/api";
import Graph from "../../components/graph";
import Logo from "../../components/logo";
import { useEffect, useState } from "react";
import StockInOutModal from "@/modals/stockinoutModal";
import Piechart from "@/components/piechart";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react"


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
interface Statistics {
  totalProfit: number;
  totalExpense: number;

}
function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day); // Mês em Date é zero-based (0 = Janeiro)
}

const Graphs = () => {
  const [stockin, setStockin] = useState<StockInOut[]>([]);
  const [stockout, setStockout] = useState<StockInOut[]>([]);
  const [stockmin, setStockmin] = useState<Stock[]>([]);
  const [stockmax, setStockmax] = useState<Stock[]>([]);
  const [idproduct, setIdproduct] = useState("0");
  const [product, setProduct] = useState<Product[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [statistics, setStatistics] = useState<Statistics>({
    totalProfit: 0,
    totalExpense: 0,
  });
  const handleSelectProduct = (value: any) => {
    setIdproduct(value);
    console.log(value);
  };

  

async function getData1() {
  try {
    const data1 = await Api.get(
      `/stockin/getgraph?startDate=${startDate.toISOString().slice(0, 10)}&endDate=${endDate.toISOString().slice(0, 10)}&idproduct=${idproduct}`
    );
    setStockin(data1.data);
  } catch (e) {
    console.error(e);
  }
}

  async function getData2() {
    try {
      const data1 = await Api.get(
        `/stockout/getgraph?startDate=${startDate.toISOString().slice(0, 10)}&endDate=${endDate.toISOString().slice(0, 10)}&idproduct=${idproduct}`
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
  }, [startDate, endDate, idproduct]);

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
  async function getStatistics() {
    try {
      const data = await Api.get("/statistics");
      setStatistics(data.data);
      console.log(statistics);
    } catch (e) {
      console.error(e);
    }
  }
  console.log(product);
  useEffect(() => {
    getMinMax();
    getProduct();
    getStatistics();
  }, []);
  return (
    <div className="flex justify-center items-center w-full flex-col gap-4">
      <Logo />
      <div className="gap-8 flex">
        <StockInOutModal location="stockin" />
        <StockInOutModal location="stockout" />
      </div>
      <div className="flex gap-2">
        <div className="border border-black rounded">
          <h1 className="border-b border-black font-bold text-red-700 text-center">
            Produtos com baixo estoque
          </h1>
          <div>
            <table>
              <tr className="border-b border-black ">
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
                <tr className=" border-b border-black" key={sm.id}>
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
              <tr className="border-b border-black ">
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
                <tr className=" border-b border-black" key={sm.id}>
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
      <div className="flex justify-center items-center w-full flex-col gap-4 flex-1">
      <div className="w-full">
        <h1 className="text-center font-bold text-3xl mb-6">Relatório Anual Lucro e Gasto</h1>
        <div className="flex gap-4 justify-center">
        <h1 className="font-bold">Total de Ganhos:</h1>
        <h1 className="font-bold">Total de Gastos:</h1>
        </div>
        <div className="flex gap-4 justify-center">
        <h1 className="font-semibold">R${statistics.totalProfit.toFixed(2)}</h1>
        <h1 className="font-semibold">R${statistics.totalExpense.toFixed(2)}</h1>
        </div>
          <Piechart />
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 border border-black bg-customYellow rounded-sm"/>
              <h1>Receita Mensal</h1>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 border border-black bg-black rounded-sm" />
              <h1>Gasto Mensal</h1>
            </div>
          </div>
      </div>
      <div className="bg-zinc-500 w-full h-px px-80 mx-80" />
      <h1 className="text-center font-bold text-3xl mb-6">Relatório Específico</h1>
      <div className="flex gap-8">
        <div>
          <h1>Data Inicio: </h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start text-left gap-3">
                <CalendarIcon />
                {startDate ? startDate.toLocaleDateString() : "Selecione a data inicial"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => setStartDate(date)}
                disabled={(date) => date > new Date()} // Desabilita datas futuras
              />
            </PopoverContent>
          </Popover>
        </div>

  {/* Date Picker para a Data de Fim */}
  <div>
    <h1>Data Final: </h1>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start text-left gap-3">
        <CalendarIcon />
          {endDate ? endDate.toLocaleDateString() : "Selecione a data final"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={endDate}
          onSelect={(date) => setEndDate(date)}
          disabled={(date) => date > new Date() || (startDate && date < startDate)} // Desabilita datas inválidas
        />
      </PopoverContent>
    </Popover>
    
  </div>
      </div>
      <div>
        <h1>Produto:</h1>
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
      
      
      </div>
        
    </div>
  );
};

export default Graphs;
