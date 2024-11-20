export interface Command {
    readonly name: string;
    readonly description: string;
    execute: (restOfCommand: string) => Promise<Result<string>>;
}

export type Result<T = string, E = Error> =
    | { readonly success: true; readonly result?: T }
    | { readonly success: false; readonly error: E };

export function errorResponse<T>(error: Error): Result<T> {
    return {
        success: false,
        error: error
    };
}