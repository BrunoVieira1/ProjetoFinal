import TextField from "@mui/material/TextField";
import { TableDemo } from "../components/table";
import Logo from "../components/logo";
import ProductModal from "@/modals/productModal";

function Products() {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-4">
      <Logo />
      <div className="flex-1 w-full p-6">
        <div className="flex-1">
          <div className="flex justify-between">
            <TextField id="standard-basic" label="Produto" variant="standard" />
            <ProductModal />
          </div>
          <TableDemo />
        </div>
      </div>
    </div>
  );
}

export default Products;
