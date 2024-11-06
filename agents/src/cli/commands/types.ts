export interface Command {
    readonly name: string;
    readonly description: string;
    execute: (restOfCommand: string) => Promise<Result>;
}

export type Result = 
    | { readonly success: true; readonly message: string }
    | { readonly success: false; readonly message: string };
