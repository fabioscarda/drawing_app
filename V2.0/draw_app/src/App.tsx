import { useState } from "react";
import CanvasBoard from "./components/CanvasBoard";
import Toolbar from "./components/Toolbar";
import  useDrawing from "./hooks/useDrawing";

export default function App() {
  const [color, setColor] = useState<string>("#000000");
  const [size, setSize] = useState<number>(5);

  const { draw } = useDrawing(color, size);

  return (
    <div>
      <Toolbar setColor={setColor} setSize={setSize} />
      <CanvasBoard draw={draw} width={window.innerWidth-30} height={window.innerHeight-50} />
    </div>
  );
}