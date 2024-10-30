export type Command = {
    name: string;
    description: string;
    execute: (args?: string[]) => Promise<Result>;
}

export type Result = {
    success: true;
} | {
    success: false;
    error: string;
};
