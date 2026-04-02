export type DrawMode = "start" | "move"
export type Tool = "bucket" | "brush" | "eraser" | "pen" | "highlighter";

export interface DrawFunction {
    ( 
        ctx: CanvasRenderingContext2D,
        event: MouseEvent,
        mode: DrawMode
    ): void
}