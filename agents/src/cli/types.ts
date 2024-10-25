export interface Command {
  name: string;
  description: string;
  execute: (args?: string[]) => Promise<Result>;
}

export type Result = {
  success: true;
} | {
  success: false;
  error: string;
}

export interface Output {
  log: (message: string) => void;
  error: (message: string) => void;
}
