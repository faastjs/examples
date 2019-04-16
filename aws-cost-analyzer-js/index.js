const { CostAnalyzer } = require("faastjs");
const funcs = require("./functions");
const { writeFileSync } = require("fs");

async function main() {
    const result = await CostAnalyzer.analyze(
        {
            funcs,
            work: async m => {
                const promises = [];
                for (let i = 0; i < 10; i++) {
                    promises.push(m.functions.random(100000));
                }
                await Promise.all(promises);
            }
        },
        CostAnalyzer.awsConfigurations.filter(
            c => c.options.memorySize >= 1024 && c.options.memorySize <= 2048
        )
    );
    writeFileSync("cost.csv", result.csv());
    console.log(`Wrote 'cost.csv'.`);
}

main();
