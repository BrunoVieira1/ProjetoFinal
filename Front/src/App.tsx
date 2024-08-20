import Sidebar from "./components/Sidebar/sidebar";
import Typography from "@mui/material/Typography";
import Graph from "./components/graph";
import logo from "./assets/logo.svg";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex justify-center items-center w-full flex-col gap-4">
        <div className="flex items-center text-center gap-4">
          <img src={logo} className="mb-10" />
          <Typography variant="h1" gutterBottom>
            PUB
          </Typography>
        </div>
        <div className="flex">
          <Graph />
          <Graph />
        </div>
      </div>
    </div>
  );
}

export default App;
