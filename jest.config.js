const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [
    "default", // mantém saída padrão
    "jest-progress-bar-reporter" // adiciona a barrinha
  ]
};