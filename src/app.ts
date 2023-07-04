import { DirExecutor } from "./commands/dir/dir.executor";
import { FfmpegExecutor } from "./commands/ffmpeg/ffmpeg.executor";
import { ConsoleLogger } from "./out/console-logger/console-logger";

export class App {
    async run() {
        new FfmpegExecutor(ConsoleLogger.getInstance()).execute();
        // Если запускаете на mac то в папке dir в файле dir.exeuter
        // измените return { command: 'ls', args: args.concat(path) };
        // new DirExecutor(ConsoleLogger.getInstance()).execute();
    }
}

const app = new App();
app.run();