export type DrawMode = "start" | "move"

export interface DrawFunction {
    ( 
        ctx: CanvasRenderingContext2D,
        event: MouseEvent,
        mode: DrawMode
    ): void
}