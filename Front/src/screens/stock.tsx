import Logo from "@/components/logo";
import { TableDemo } from "@/components/Tables/tableStock";
import StockModal from "@/modals/stockModal";

interface Stock {
  id: number;
  idProduct: number;
  minStock: number;
  maxStock: number;
}
function Stock() {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-4">
      <Logo />
      <div className="flex-1 w-full p-6">
        <div className="flex-1">
          <div className="flex justify-between">
            <StockModal />
          </div>
          <TableDemo />
        </div>
      </div>
    </div>
  );
}

export default Stock;
