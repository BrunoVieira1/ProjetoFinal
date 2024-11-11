import { Api } from "@/api";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
interface props {
  location: string;
}
interface StockInOut {
  id: number;
  idProduct: number;
  qtt: number;
  date: string;
  name: string;
  price: number;
}

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day); // Mês em Date é zero-based (0 = Janeiro)
}

function Graph({ location }: props) {
  const [stockinout, setStockinout] = useState<StockInOut[]>([]);
  async function getData() {
    try {
      const data1 = await Api.get(`/${location}/getgraph`);
      data1.data.sort(
        (a: any, b: any) =>
          parseDate(b.date).getTime() - parseDate(a.date).getTime()
      );

      console.log(data1);
      setStockinout(data1.data);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <LineChart
        width={500}
        height={200}
        data={stockinout}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="lucro" stroke="#eab308" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </>
  );
}

export default Graph;
