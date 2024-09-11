import { TableDemo } from "../components/Tables/tableProduct";
import Logo from "../components/logo";
import ProductModal from "@/modals/productModal";

function Products() {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-4">
      <Logo />
      <div className="flex-1 w-full p-6">
        <div className="flex-1">
          <div className="flex justify-between"></div>
          <ProductModal />
          <TableDemo />
        </div>
      </div>
    </div>
  );
}

export default Products;
