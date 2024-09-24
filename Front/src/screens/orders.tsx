import Logo from "@/components/logo";
import { TableDemo } from "@/components/Tables/tableOrders";
import DebtorModal from "@/modals/debtorModal";
import React from "react";

function Orders() {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-4">
      <Logo />
      <div className="flex-1">
        <div>
          <DebtorModal />
          <TableDemo />
        </div>
      </div>
    </div>
  );
}

export default Orders;
