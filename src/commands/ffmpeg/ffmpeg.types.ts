import { ICommandExecutor } from "../../core/executor/command.types";

export interface IFfmpegInput {
    width: number;
    heigth: number;
    path: string;
    name: string;
}

export interface ICommandExecutorFfmpeg extends ICommandExecutor {
    output: string;
}