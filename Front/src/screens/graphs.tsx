import Graph from "../components/graph";
import Logo from "../components/logo";

function Graphs() {
  return (
    <div className="flex justify-center items-center w-full flex-col gap-4">
      <Logo />
      <div className="flex flex-1">
        <Graph />
        <Graph />
      </div>
    </div>
  );
}

export default Graphs;
