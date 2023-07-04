import { IStreamLogger } from "../../core/handlers/stream-logger.interface";

export class ConsoleLogger implements IStreamLogger {
    private static instance: ConsoleLogger;

    public static getInstance() {
        if (!ConsoleLogger.instance) {
            ConsoleLogger.instance = new ConsoleLogger();
        }
    }


    log(...args: any[]): void {
        console.log(...args);
    }

    end(): void {
        console.log('Done!');
    }

    error(...args: any[]): void {
        console.log(...args);
    }

}