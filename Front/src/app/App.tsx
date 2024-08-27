import RoutesApp from "../routes";
import Sidebar from "../components/Sidebar/sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <RoutesApp />
    </div>
  );
}

export default App;
