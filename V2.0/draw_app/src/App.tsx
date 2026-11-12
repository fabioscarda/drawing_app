import { useEffect, useState, useRef } from "react";
import CanvasBoard from "./components/CanvasBoard";
import Toolbar from "./components/Toolbar";
import useDrawing from "./hooks/useDrawing";
import type { Tool } from "./types/drawing";

export default function App() {
  const [color, setColor] = useState<string>("#000000");
  const [size, setSize] = useState<number>(5);
  const [tool, setTool] = useState<Tool>("brush");

  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight - 80 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure useDrawing returns the correct object
  const { draw, finishDrawing, redraw, undo, redo } = useDrawing(color, size, tool);

  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    }
    
    window.addEventListener("resize", updateSize);
    updateSize();
    
    const timer = setTimeout(updateSize, 100);
    
    return () => {
      window.removeEventListener("resize", updateSize);
      clearTimeout(timer);
    };
  }, []);

  const handleUndo = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) undo(ctx);
    }
  };

  const handleRedo = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) redo(ctx);
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-50 flex flex-col overflow-hidden">
      <header className="w-full bg-white shadow-md p-2 z-10">
        <div className="max-w-7xl mx-auto">
          <Toolbar 
            setColor={setColor} 
            setSize={setSize} 
            setTool={setTool} 
            onUndo={handleUndo}
            onRedo={handleRedo}
            tool={tool} 
            color={color} 
          />
        </div>
      </header>
      <main ref={containerRef} className="flex-1 w-full bg-slate-100 overflow-hidden">
        <CanvasBoard 
          draw={draw} 
          finishDrawing={finishDrawing}
          redraw={redraw}
          width={dimensions.width} 
          height={dimensions.height} 
          tool={tool} 
        />
      </main>
    </div>
  );
}