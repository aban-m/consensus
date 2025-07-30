import { answer, generatePhrasings } from "./ai";
import chalk from "chalk";
import {
  type CommandLineOptions,
  type OptionDefinition,
  default as args,
} from "command-line-args";

const optionDefinitions: OptionDefinition[] = [
  {
    name: "query",
    type: String,
    defaultOption: true,
  },
];

const getArgs = () => args(optionDefinitions);

async function main() {
  const argv = getArgs();
  const result = await generatePhrasings(argv.query);
  await answer(result);
  /* result.forEach((phrasing) => {
    console.log(chalk.gray(`${phrasing.id}: `), chalk.bold(phrasing.phrasing));
  }); */
}

main().catch(console.error);
