export interface IStreamLogger {
    log(...args: any[]): void;
    end(): void;
    error(...args: any[]): void;
}