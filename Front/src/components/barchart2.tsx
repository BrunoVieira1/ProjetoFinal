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
    label: "Dias em Divida",
    color: "#eab308",
  },
} satisfies ChartConfig

function Barchart2() {
  const [chartData, setChartData] = useState([])
  async function getData() {
    try {
      const data = await Api.get("/graphdebtors2");
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
      <XAxis type="number" dataKey="Dias em Divida" hide />
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
      <Bar dataKey="Dias em Divida" fill="var(--color-desktop)" radius={5}>
      <LabelList
                dataKey="Dias em Divida"
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

export default Barchart2