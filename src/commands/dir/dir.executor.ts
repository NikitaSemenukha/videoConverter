import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/executor/command.executor";
import { ICommandExecutor } from "../../core/executor/command.types";
import { IStreamLogger } from "../../core/handlers/stream-logger.interface";
import { PromptService } from "../../core/prompt/prompt.service";
import { DirInput } from "./dir.types";
import { DirBuilder } from "./dir.builder";
import { StreamHandler } from "../../core/handlers/stream-logger.handler";

export class DirExecutor extends CommandExecutor<DirInput> {

    private promptService: PromptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger);
    }

    protected async prompt(): Promise<DirInput> {
        let path = await this.promptService.input<string>('Путь', 'input');
        return { path };
    }

    protected build({ path }: DirInput): ICommandExecutor {
        const args = (new DirBuilder())
            .detailedOutput()
            .output();
        return { command: 'dir', args: args.concat(path) };
    }

    protected executeSpawn({ command, args }: ICommandExecutor): ChildProcessWithoutNullStreams {
        return spawn(command, args, { shell: true });
    }

    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }
}
