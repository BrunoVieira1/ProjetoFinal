import React, { useEffect, useState } from 'react'
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Api } from '@/api'


const chartConfig = {
  desktop: {
    label: "Divida R$",
    color: "#eab308",
  },
} satisfies ChartConfig

function Barchart() {
  const [chartData, setChartData] = useState([])
  async function getData() {
    try {
      const data = await Api.get("/graphdebtors");
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
    <ChartContainer config={chartConfig} className='w-96' >
    <BarChart
      accessibilityLayer
      data={chartData}
      layout="vertical"
      margin={{
        left: -20,
      }}
    >
      <XAxis type="number" dataKey="Divida R$" hide />
      <YAxis
        dataKey="name"
        type="category"
        tickLine={false}
        axisLine={false}
        tickMargin={10}
        width={96}
      />
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
      />
      <Bar dataKey="Divida R$" fill="var(--color-desktop)" radius={5}>
      <LabelList
                dataKey="Divida R$"
                position="insideLeft"
                offset={8}
                className="fill-foreground text-black"
                width={50}
                fontSize={12}
              />
      </Bar>
    </BarChart>
  </ChartContainer>
  )
}

export default Barchart