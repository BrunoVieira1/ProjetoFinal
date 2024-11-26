import React, { useEffect, useState } from 'react'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Api } from '@/api'
const chartConfig = {
  desktop: {
    label: "receita_mensal: ",
    color: "#eab308",
  },
  mobile: {
    label: "gastos_mensais: ",
    color: "black",
  },
} satisfies ChartConfig



function Piechart() {
  const [chartData, setChartData] = useState([])
  async function getData() {
    try {
      const data = await Api.get("/graph");
      console.log(data.data)
      setChartData(data.data)
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <ChartContainer config={chartConfig} className="h-28 w-full px-48">
          <BarChart accessibilityLayer data={chartData} >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={true}
              tickMargin={10}
              axisLine={true}
              
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="receita_mensal: " fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="gastos_mensais: " fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
    </div>
  )
}

export default Piechart