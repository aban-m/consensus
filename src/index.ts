import { pipeline } from "./ai";
import { type OptionDefinition, default as args } from "command-line-args";

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
  await pipeline(argv.query);
}

main().catch(console.error);
