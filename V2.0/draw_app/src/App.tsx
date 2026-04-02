import { useEffect, useState } from "react";
import CanvasBoard from "./components/CanvasBoard";
import Toolbar from "./components/Toolbar";
import  useDrawing from "./hooks/useDrawing";
import type { Tool } from "./types/drawing";

export default function App() {
  const [color, setColor] = useState<string>("#000000");
  const [size, setSize] = useState<number>(5);
  const [tool, setTool] = useState<Tool>("brush");

  const { draw } = useDrawing(color, size);

  return (
    <div>
      <Toolbar setColor={setColor} setSize={setSize} setTool={setTool} tool={tool} color={color} />
      <CanvasBoard draw={draw} width={window.innerWidth-30} height={window.innerHeight-50} tool={tool} />
    </div>
  );
}