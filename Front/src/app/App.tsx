import RoutesApp from "../routes";
import Sidebar from "../components/Sidebar/sidebar";
import Login from "@/screens/login";
import { useEffect } from "react";

function App() {
  async function firstLogin() {
     try {
      if(!localStorage.getItem("IdLogin")) {
        localStorage.setItem("IdLogin", "0")
        window.location.href = "/"
      }
     } catch (e) {
        console.log("xd")
      }
  }
  useEffect(() => {
    firstLogin();
  }, [])
  var IdLogin = localStorage.getItem("IdLogin");
  console.log(IdLogin)
  return (
    <div className="flex">
      {IdLogin == "0" ? (
        <Login />
      ) : (
        <>
        <div className="min-h-screen w-64">
          <Sidebar />
        </div>
          <RoutesApp />
        </>
      )}
    </div>
  );
}

export default App;
