export type DrawMode = "start" | "move"
export type Tool = "bucket" | "brush" | "eraser" | "pen" | "highlighter";

export interface Point {
    x: number;
    y: number;
}

export interface Stroke {
    points: Point[];
    color: string;
    size: number;
    tool: Tool;
}

export interface DrawFunction {
    ( 
        ctx: CanvasRenderingContext2D,
        event: MouseEvent,
        mode: DrawMode
    ): void
}