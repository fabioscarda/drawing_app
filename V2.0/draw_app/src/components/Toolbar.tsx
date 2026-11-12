import { useEffect, useState } from "react";
import type { Tool } from "../types/drawing";

interface ToolbarProps {
  setColor: (color: string) => void;
  setSize: (size: number) => void;
  setTool: (tool: Tool) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  tool: Tool;
  color: string;
}

function Toolbar({ setColor, setSize, setTool, onUndo, onRedo, tool, color }: ToolbarProps) {
  const [savedColor, setSavedColor] = useState("#000000");
  useEffect(() => {
    if (tool === "eraser") {
      setSavedColor(String(color));
      console.log(savedColor);

      setColor("#FFFFFF");
      setSize(20);
    } else if (tool === "highlighter") {
      console.log(color);
      setSavedColor(color)

      setColor("rgba(255, 255, 0, 0.05)");
      setSize(30);
    } else if (tool === "pen") {
      setSize(5);
    } else if (tool === "brush") {
      setSize(10);
    } else if (tool === "bucket") {
      setSize(100000);
    }

  }, [tool])

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-white rounded-lg">
      {/* Undo & Redo Actions */}
      <div className="flex items-center gap-1 border-r border-slate-200 pr-3">
        <button 
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-700 active:scale-95 transition-all" 
          onClick={onUndo}
          title="Undo">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/></svg>
        </button>
        <button 
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-700 active:scale-95 transition-all" 
          onClick={onRedo}
          title="Redo">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M396-200q-97 0-166.5-63T160-420q0-94 69.5-157T396-640h252L544-744l56-56 200 200-200 200-56-56 104-104H396q-63 0-109.5 40T240-420q0 60 46.5 100T396-280h284v80H396Z"/></svg>
        </button>
      </div>

      {/* Drawing Tools */}
      <div className="flex items-center gap-1.5">
        {/* Pen */}
        <button 
          className={`p-2.5 rounded-xl border-b-4 transition-all duration-200 active:scale-95 ${
            tool === 'pen' ? 'bg-indigo-50 border-indigo-500 shadow-sm' : 'border-transparent hover:bg-slate-50 hover:border-slate-300'
          }`}
          onClick={() => setTool("pen")}
          style={{ borderBottomColor: tool === 'pen' ? color : 'transparent' }}
          title="Pen">
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#334155"><path d="m490-527 37 37 217-217-37-37-217 217ZM200-200h37l233-233-37-37-233 233v37Zm355-205L405-555l167-167-29-29-219 219-56-56 218-219q24-24 56.5-24t56.5 24l29 29 50-50q12-12 28.5-12t28.5 12l93 93q12 12 12 28.5T828-678L555-405ZM270-120H120v-150l285-285 150 150-285 285Z" /></svg>
        </button>

        {/* Brush */}
        <button 
          className={`p-2.5 rounded-xl border-b-4 transition-all duration-200 active:scale-95 ${
            tool === 'brush' ? 'bg-indigo-50 border-indigo-500 shadow-sm' : 'border-transparent hover:bg-slate-50 hover:border-slate-300'
          }`}
          onClick={() => setTool("brush")}
          style={{ borderBottomColor: tool === 'brush' ? color : 'transparent' }}
          title="Brush">
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#334155"><path d="M240-120q-45 0-89-22t-71-58q26 0 53-20.5t27-59.5q0-50 35-85t85-35q50 0 85 35t35 85q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 23-5.5 42T220-202q5 2 10 2h10Zm230-160L360-470l358-358q11-11 27.5-11.5T774-828l54 54q12 12 12 28t-12 28L470-360Zm-190 80Z" /></svg>
        </button>

        {/* Highlighter */}
        <button 
          className={`p-2.5 rounded-xl border-b-4 transition-all duration-200 active:scale-95 ${
            tool === 'highlighter' ? 'bg-indigo-50 border-indigo-500 shadow-sm' : 'border-transparent hover:bg-slate-50 hover:border-slate-300'
          }`}
          onClick={() => setTool("highlighter")}
          style={{ borderBottomColor: tool === 'highlighter' ? color : 'transparent' }}
          title="Highlighter">
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#334155"><path d="M544-400 440-504 240-304l104 104 200-200Zm-47-161 104 104 199-199-104-104-199 199Zm-84-28 216 216-229 229q-24 24-56 24t-56-24l-2-2-26 26H60l126-126-2-2q-24-24-24-56t24-56l229-229Zm0 0 227-227q24-24 56-24t56 24l104 104q24 24 24 56t-24 56L629-373 413-589Z" /></svg>
        </button>

        {/* Eraser */}
        <button 
          className={`p-2.5 rounded-xl border-b-4 transition-all duration-200 active:scale-95 ${
            tool === 'eraser' ? 'bg-indigo-50 border-indigo-500 shadow-sm' : 'border-transparent hover:bg-slate-50 hover:border-slate-300'
          }`}
          onClick={() => setTool("eraser")}
          style={{ borderBottomColor: tool === 'eraser' ? '#ffffff' : 'transparent' }}
          title="Eraser">
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#334155"><path d="M690-240h190v80H610l80-80Zm-500 80-85-85q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L520-160H190Zm296-80 314-322-198-198-442 456 64 64h262Zm-6-240Z" /></svg>
        </button>

        {/* Bucket */}
        <button 
          className={`p-2.5 rounded-xl border-b-4 transition-all duration-200 active:scale-95 ${
            tool === 'bucket' ? 'bg-indigo-50 border-indigo-500 shadow-sm' : 'border-transparent hover:bg-slate-50 hover:border-slate-300'
          }`}
          onClick={() => setTool("bucket")}
          style={{ borderBottomColor: tool === 'bucket' ? color : 'transparent' }}
          title="Bucket">
          <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="#334155"><path d="M346-140 100-386q-10-10-15-22t-5-25q0-13 5-25t15-22l230-229-106-106 62-65 400 400q10 10 14.5 22t4.5 25q0 13-4.5 25T686-386L440-140q-10 10-22 15t-25 5q-13 0-25-5t-22-15Zm47-506L179-432h428L393-646Zm399 526q-36 0-61-25.5T706-208q0-27 13.5-51t30.5-47l42-54 44 54q16 23 30 47t14 51q0 37-26 62.5T792-120Z" /></svg>
        </button>
      </div>

      {/* Style & Options (Color Picker & Size Slider) */}
      <div className="flex items-center gap-4 pl-3 border-l border-slate-200">
        {/* Color Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Color</span>
          <div className="relative w-9 h-9 rounded-full border border-slate-200 shadow-sm overflow-hidden active:scale-95 transition-all">
            <input
              type="color"
              value={color}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
              className="absolute inset-0 w-full h-full p-0 border-none cursor-pointer scale-150"
            />
          </div>
        </div>

        {/* Line Thickness */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Size</span>
          <input
            type="range"
            min="1"
            max="50"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSize(Number(e.target.value))}
            className="w-28 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Toolbar;