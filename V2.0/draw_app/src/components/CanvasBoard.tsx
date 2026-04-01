import { useRef, useEffect } from "react";
import type { DrawFunction } from "../types/drawing";

interface CanvasBoardProps {
    draw: DrawFunction;
    width: number;
    height: number;
}

function CanvasBoard({ draw, width, height }: CanvasBoardProps) {
    const canvasRef = useRef<HTMLCanvasElement | null> (null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext("2d")
        if(!ctx) return;
        let drawing = false;

        const startDrawing = (e:MouseEvent) => {
            drawing = true;
            draw(ctx, e, "start");
        }

        const drwaMove = (e: MouseEvent) => {
            if(!drawing) return;
            draw(ctx, e, "move");
        }

        const stopDrawing = () => {
            drawing = false;
            ctx.beginPath();
        }

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", drwaMove);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseleave", stopDrawing);

        return () => {
            canvas.removeEventListener("mousedown", startDrawing);
            canvas.removeEventListener("mousemove", drwaMove);
            canvas.removeEventListener("mouseup", stopDrawing);
            canvas.removeEventListener("mouseleave", stopDrawing);
        };  
    }, [draw]);

    return <canvas ref={canvasRef} width={width} height={height}/>
}

export default CanvasBoard;