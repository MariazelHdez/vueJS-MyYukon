const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

const nodeEnv = process.env.NODE_ENV || "development";
const envCandidates = [
    `.env.${nodeEnv}`,
    ".env",
    `env.${nodeEnv}`,
    "env",
    `.emv.${nodeEnv}`,
    ".emv"
];

const envPath = envCandidates
    .map((candidate) => path.resolve(process.cwd(), candidate))
    .find((candidate) => fs.existsSync(candidate));

if (envPath) {
    const envConfig = dotenv.config({ path: envPath });
    dotenvExpand.expand(envConfig);
}

module.exports = {
    configureWebpack: {
        devtool: "source-map"
    }
};
