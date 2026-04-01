import type { DrawFunction } from "../types/drawing";

function useDrawing(color: string, size: number){
    const draw: DrawFunction = (ctx, event, mode) => {
        const rect = (event.target as HTMLCanvasElement).getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        if(mode === "start"){
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else if(mode === "move"){
            ctx.lineTo(x, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
            ctx.lineCap = "round";
            //ctx.lineJoin = "round";
            ctx.stroke();
        }
    }
    return { draw };
    
}

export default useDrawing; 