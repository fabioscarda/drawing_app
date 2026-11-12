import { useRef, useEffect } from "react";
import type { DrawFunction, Tool } from "../types/drawing";

interface CanvasBoardProps {
    draw: DrawFunction;
    finishDrawing: () => void;
    redraw: (ctx: CanvasRenderingContext2D) => void;
    width: number;
    height: number;
    tool: Tool;
}

function CanvasBoard({ draw, finishDrawing, redraw, width, height, tool }: CanvasBoardProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Redraw existing strokes whenever dimensions (width/height) change
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        redraw(ctx);
    }, [width, height, redraw]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        let drawing = false;

        const startDrawing = (e: MouseEvent) => {
            drawing = true;
            draw(ctx, e, "start");
        };

        const drawMove = (e: MouseEvent) => {
            if (!drawing) return;
            draw(ctx, e, "move");
        };

        const stopDrawing = () => {
            if (drawing) {
                drawing = false;
                ctx.beginPath();
                finishDrawing();
            }
        };

        const getTouchEventAsMouse = (e: TouchEvent, canvas: HTMLCanvasElement): MouseEvent => {
            const touch = e.touches[0] || e.changedTouches[0];

            const simulatedEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY,
                bubbles: true,
            });

            Object.defineProperty(simulatedEvent, "target", {
                value: canvas,
                writable: false,
            });

            return simulatedEvent;
        };

        const startTouch = (e: TouchEvent) => {
            e.preventDefault();
            drawing = true;
            draw(ctx, getTouchEventAsMouse(e, canvas), "start");
        };

        const moveTouch = (e: TouchEvent) => {
            e.preventDefault();
            if (!drawing) return;
            draw(ctx, getTouchEventAsMouse(e, canvas), "move");
        };

        const stopTouch = (e: TouchEvent) => {
            e.preventDefault();
            if (drawing) {
                drawing = false;
                ctx.beginPath();
                finishDrawing();
            }
        };

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", drawMove);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseleave", stopDrawing);

        canvas.addEventListener("touchstart", startTouch, { passive: false });
        canvas.addEventListener("touchmove", moveTouch, { passive: false });
        canvas.addEventListener("touchend", stopTouch, { passive: false });
        canvas.addEventListener("touchcancel", stopTouch, { passive: false });

        canvas.addEventListener("mouseover", () => {
            if (tool === "brush") {
                canvas.style.cursor = "url('img/brush.png'), auto";
            } else if (tool === "eraser") {
                canvas.style.cursor = "url('img/eraser.png'), auto";
            } else if (tool === "bucket") {
                canvas.style.cursor = "url('img/bucket.png'), auto";
            } else if (tool === "pen") {
                canvas.style.cursor = "url('img/pen.png'), auto";
            } else if (tool === "highlighter") {
                canvas.style.cursor = "url('img/highlighter.png'), auto";
            } else {
                canvas.style.cursor = "auto";
            }
        });

        return () => {
            canvas.removeEventListener("mousedown", startDrawing);
            canvas.removeEventListener("mousemove", drawMove);
            canvas.removeEventListener("mouseup", stopDrawing);
            canvas.removeEventListener("mouseleave", stopDrawing);

            canvas.removeEventListener("touchstart", startTouch);
            canvas.removeEventListener("touchmove", moveTouch);
            canvas.removeEventListener("touchend", stopTouch);
            canvas.removeEventListener("touchcancel", stopTouch);
        };
    }, [draw, finishDrawing, tool]);

    return (
        <canvas 
            className="block w-full h-full bg-white cursor-crosshair"
            ref={canvasRef} 
            width={width} 
            height={height} 
        />
    );
}

export default CanvasBoard;