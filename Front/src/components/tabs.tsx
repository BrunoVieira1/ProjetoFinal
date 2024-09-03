import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Tab() {
  return (
    <Tabs
      defaultValue="account"
      className="w-[400px] flex justify-center flex-col"
    >
      <TabsList className="justify-between">
        <TabsTrigger value="ganhos">Ganhos</TabsTrigger>
        <TabsTrigger value="gastos">Gastos</TabsTrigger>
      </TabsList>
      <TabsContent value="ganhos">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="gastos">Change your password here.</TabsContent>
    </Tabs>
  );
}

export default Tab;
