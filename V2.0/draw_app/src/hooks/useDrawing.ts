import { useRef, useCallback } from "react";
import type { DrawFunction, Stroke, Tool } from "../types/drawing";

function useDrawing(color: string, size: number, tool: Tool){
    const strokesRef = useRef<Stroke[]>([]);
    const redoRef = useRef<Stroke[]>([]);
    const currentStrokeRef = useRef<Stroke | null>(null);

    const redraw = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (const stroke of strokesRef.current) {
            if (stroke.points.length === 0) continue;

            ctx.beginPath();
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.size;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
            for (let i = 1; i < stroke.points.length; i++) {
                ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
            }
            ctx.stroke();
        }
    }, []);

    const draw: DrawFunction = (ctx, event, mode) => {
        const canvas = event.target as HTMLCanvasElement;
        const rect = canvas.getBoundingClientRect();

        const x = (event.clientX - rect.left) * (canvas.width / rect.width);
        const y = (event.clientY - rect.top) * (canvas.height / rect.height);

        if (mode === "start") {
            currentStrokeRef.current = {
                points: [{ x, y }],
                color: tool === "eraser" ? "#FFFFFF" : color,
                size: size,
                tool: tool
            };
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else if (mode === "move") {
            if (!currentStrokeRef.current) return;
            currentStrokeRef.current.points.push({ x, y });
            ctx.lineTo(x, y);
            ctx.strokeStyle = currentStrokeRef.current.color;
            ctx.lineWidth = size;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();
        }
    };

    const finishDrawing = () => {
        if (currentStrokeRef.current) {
            strokesRef.current.push(currentStrokeRef.current);
            currentStrokeRef.current = null;
            redoRef.current = []; 
        }
    };

    const undo = (ctx: CanvasRenderingContext2D | null) => {
        if (strokesRef.current.length > 0) {
            const lastStroke = strokesRef.current.pop();
            if (lastStroke) {
                redoRef.current.push(lastStroke);
            }
            if (ctx) redraw(ctx);
        }
    };

    const redo = (ctx: CanvasRenderingContext2D | null) => {
        if (redoRef.current.length > 0) {
            const strokeToRedo = redoRef.current.pop();
            if (strokeToRedo) {
                strokesRef.current.push(strokeToRedo);
            }
            if (ctx) redraw(ctx);
        }
    };

    return { draw, finishDrawing, redraw, undo, redo };
}

export default useDrawing;