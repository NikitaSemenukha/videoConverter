import { ChildProcessWithoutNullStreams } from "child_process";
import { IStreamLogger } from "../handlers/stream-logger.interface";
import { ICommandExecutor } from "./command.types";

export abstract class CommandExecutor<Input> {

    constructor(private logger: IStreamLogger) { }

    public async execute() {
        const input = await this.prompt();
        const command = this.build(input);
        const stream = this.executeSpawn(command);
        this.processStream(stream, this.logger);
    }

    protected abstract prompt(): Promise<Input>;
    protected abstract build(input: Input): ICommandExecutor;
    protected abstract executeSpawn(command: any): ChildProcessWithoutNullStreams;
    protected abstract processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void;
}
