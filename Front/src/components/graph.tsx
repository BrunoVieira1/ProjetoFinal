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
  stockinout: any;
}

function Graph({ stockinout }: props) {
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
