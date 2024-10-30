export interface Command {
    readonly name: string;
    readonly description: string;
    execute: (args?: readonly string[]) => Promise<Result>;
}

export type Result = 
    | { readonly success: true }
    | { readonly success: false; readonly error: string };
