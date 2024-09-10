import Logo from "@/components/logo";
import TableOrders from "@/components/Tables/tableOrders";
import React from "react";

function Orders() {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-4">
      <Logo />
      <div className="flex-1">
        <div>
          <TableOrders />
        </div>
      </div>
    </div>
  );
}

export default Orders;
