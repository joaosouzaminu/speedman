#!/usr/bin/env node

const { Command } = require('commander');
const { version } = require('../package.json');

const program = new Command();
program.version(version);

program
  .requiredOption('-c, --collection <path>', 'A postman collection exported to JSON format')
  .requiredOption('-i, --instances <number>', 'The amount of instances to run in parallel')
  .requiredOption('-n, --count <number>', 'The total amount of requests to be distributed between the instances');

program.parse(process.argv);

const options = program.opts();

const Speedman = require('../speedman');

const speedman = new Speedman(options);
speedman.run();