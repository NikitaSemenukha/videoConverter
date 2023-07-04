import { ChildProcessWithoutNullStreams } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { ICommandExecutor } from "../../core/executor/command.types";
import { IStreamLogger } from "../../core/handlers/stream-logger.interface";
import { ICommandExecutorFfmpeg, IFfmpegInput } from "./ffmpeg.types";
import { FileService } from "../../core/files/file.service";
import { PromptService } from "../../core/prompt/prompt.service";
import { FfmpegBuilder } from "./ffmpeg.builder";

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput> {
    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger);
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Ширина', 'number');
        const heigth = await this.promptService.input<number>('Высота', 'number');
        const path = await this.promptService.input<string>('Путь до файл', 'input');
        const name = await this.promptService.input<string>('Имя', 'input');
        return { width, heigth, path, name };
    }

    protected build({ width, heigth, path, name }: IFfmpegInput): ICommandExecutorFfmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = (new FfmpegBuilder)
            .input(path)
            .setVideoSize(width, heigth)
            .output(output);
        return { command: 'ffmpeg', args, output };
    }
    protected spawn(command: ICommandExecutorFfmpeg): ChildProcessWithoutNullStreams {
        throw new Error("Method not implemented.");
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        throw new Error("Method not implemented.");
    }

}