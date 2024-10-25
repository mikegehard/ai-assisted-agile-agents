import chalk from 'chalk';
import { Output } from './types';

export class ConsoleOutput implements Output {
  log(message: string): void {
    console.log(message);
  }
  error(message: string): void {
    console.log(chalk.red(message));
  }
}
