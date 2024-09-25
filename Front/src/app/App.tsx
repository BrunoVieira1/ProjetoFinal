import RoutesApp from "../routes";
import Sidebar from "../components/Sidebar/sidebar";
import Login from "@/screens/login";

function App() {
  var IdLogin = localStorage.getItem("IdLogin");
  return (
    <div className="flex">
      {IdLogin != "0" ? (
        <>
          <Sidebar />
          <RoutesApp />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
