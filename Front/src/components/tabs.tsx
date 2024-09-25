import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import TableStockinout from "./Tables/tableStockInOut";

function Tab() {
  return (
    <Tabs
      defaultValue="account"
      className="flex-1 w-full flex justify-center flex-col"
    >
      <TabsList className="justify-between">
        <TabsTrigger
          value="ganhos"
          className="flex-1 data-[state=active]:bg-green-500"
        >
          Vendas
        </TabsTrigger>
        <TabsTrigger
          value="gastos"
          className="flex-1 data-[state=active]:bg-red-500"
        >
          Compras
        </TabsTrigger>
      </TabsList>
      <TabsContent value="ganhos">
        <TableStockinout location="stockout" />
      </TabsContent>
      <TabsContent value="gastos">
        <TableStockinout location="stockin" />
      </TabsContent>
    </Tabs>
  );
}

export default Tab;
