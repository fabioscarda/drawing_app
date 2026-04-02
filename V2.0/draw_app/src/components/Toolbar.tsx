import { useEffect, useState } from "react";
import type { Tool } from "../types/drawing";

interface ToolbarProps {
  setColor: (color: string) => void;
  setSize: (size: number) => void;
  setTool: (tool: Tool) => void;
  tool: Tool;
  color: string;
}

function Toolbar({ setColor, setSize, setTool, tool, color }: ToolbarProps) {
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
    <div>
      <input
        type="color"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setColor(e.target.value)
        }
      />

      <input
        type="range"
        min="1"
        max="50"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSize(Number(e.target.value))
        }
      />

      <span className={`btn-tool ${tool === 'pen' ? 'btn-tool-active' : ''}`}
        onClick={() => setTool("pen")}
        style={{
          borderBottomColor: tool === 'pen' ? color : 'black',
          borderBottomWidth: tool === 'pen' ? '4px' : '1px'
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m490-527 37 37 217-217-37-37-217 217ZM200-200h37l233-233-37-37-233 233v37Zm355-205L405-555l167-167-29-29-219 219-56-56 218-219q24-24 56.5-24t56.5 24l29 29 50-50q12-12 28.5-12t28.5 12l93 93q12 12 12 28.5T828-678L555-405ZM270-120H120v-150l285-285 150 150-285 285Z" /></svg>
      </span>

      <span className={`btn-tool ${tool === 'brush' ? 'btn-tool-active' : ''}`}
        onClick={() => setTool("brush")}
        style={{
          borderBottomColor: tool === 'brush' ? color : 'black',
          borderBottomWidth: tool === 'brush' ? '4px' : '1px'
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-120q-45 0-89-22t-71-58q26 0 53-20.5t27-59.5q0-50 35-85t85-35q50 0 85 35t35 85q0 66-47 113t-113 47Zm0-80q33 0 56.5-23.5T320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 23-5.5 42T220-202q5 2 10 2h10Zm230-160L360-470l358-358q11-11 27.5-11.5T774-828l54 54q12 12 12 28t-12 28L470-360Zm-190 80Z" /></svg>
      </span>

      <span className={`btn-tool ${tool === 'highlighter' ? 'btn-tool-active' : ''}`}
        onClick={() => setTool("highlighter")}
        style={{
          borderBottomColor: tool === 'highlighter' ? color : 'black',
          borderBottomWidth: tool === 'highlighter' ? '4px' : '1px'
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M544-400 440-504 240-304l104 104 200-200Zm-47-161 104 104 199-199-104-104-199 199Zm-84-28 216 216-229 229q-24 24-56 24t-56-24l-2-2-26 26H60l126-126-2-2q-24-24-24-56t24-56l229-229Zm0 0 227-227q24-24 56-24t56 24l104 104q24 24 24 56t-24 56L629-373 413-589Z" /></svg>
      </span>

      <span className={`btn-tool ${tool === 'eraser' ? 'btn-tool-active' : ''}`}
        onClick={() => setTool("eraser")}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M690-240h190v80H610l80-80Zm-500 80-85-85q-23-23-23.5-57t22.5-58l440-456q23-24 56.5-24t56.5 23l199 199q23 23 23 57t-23 57L520-160H190Zm296-80 314-322-198-198-442 456 64 64h262Zm-6-240Z" /></svg>
      </span>

      <span className={`btn-tool ${tool === 'bucket' ? 'btn-tool-active' : ''}`}
        onClick={() => setTool("bucket")}
        style={{
          borderBottomColor: tool === 'bucket' ? color : 'black',
          borderBottomWidth: tool === 'bucket' ? '4px' : '1px'
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M346-140 100-386q-10-10-15-22t-5-25q0-13 5-25t15-22l230-229-106-106 62-65 400 400q10 10 14.5 22t4.5 25q0 13-4.5 25T686-386L440-140q-10 10-22 15t-25 5q-13 0-25-5t-22-15Zm47-506L179-432h428L393-646Zm399 526q-36 0-61-25.5T706-208q0-27 13.5-51t30.5-47l42-54 44 54q16 23 30 47t14 51q0 37-26 62.5T792-120Z" /></svg>
      </span>

    </div>
  );
}

export default Toolbar;