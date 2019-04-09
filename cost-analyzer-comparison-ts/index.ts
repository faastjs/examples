import { CostAnalyzer, FaastModule } from "faastjs";
import * as m from "./functions";
import { writeFile as fsWriteFile } from "fs";
import { promisify } from "util";

const writeFile = promisify(fsWriteFile);

async function work(faastModule: FaastModule<typeof m>) {
    await faastModule.functions.random(1000000);
}

const memorySizes = [128, 256, 512, 1024, 1728, 2048];

const configurations = [
    ...CostAnalyzer.awsConfigurations.filter(c =>
        memorySizes.find(m => m === c.options.memorySize!)
    ),
    ...CostAnalyzer.googleConfigurations.filter(c =>
        memorySizes.find(m => m === c.options.memorySize!)
    )
];

async function compareCloudCosts() {
    const result = await CostAnalyzer.analyze(
        m,
        require.resolve("./functions"),
        { work },
        configurations
    );

    await writeFile("cost.csv", result.csv());
}

compareCloudCosts();
