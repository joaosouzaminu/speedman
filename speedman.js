const newman = require('newman');
const Spinnies = require('spinnies');
const spinnies = new Spinnies();

class Speedman {
  constructor(cliArguments) {
    this.arguments = cliArguments || {
      collection: null,
      instances: null,
      count: null
    }

    this._shouldGetArguments = !cliArguments;
    this.runners = [];
    this.instanceCounter = 1;
  }

  async run() {
    this._getArguments();
    this._createRunners();
    await this._executeRunners();
  }

  _getArguments() {
    this._shouldGetArguments && this._readCLIArguments();
    this._validateArguments();
  }

  _readCLIArguments() {
    for (const argumentKey of Object.keys(this.arguments)) {
      const argumentIndex = process.argv.findIndex((arg) => arg === `--${argumentKey}`);
      const argumentValue = process.argv[argumentIndex + 1];

      if (!argumentValue) throw new Error(`Invalid argument value for ${argumentKey}`);

      this.arguments[argumentKey] = argumentValue;
    }
  }

  _validateArguments() {
    if (this.arguments.count < this.arguments.instances) throw new Error('Count should be bigger than or equal to Instances');
  }

  _createRunners() {
    const { count, instances, collection } = this.arguments;
    const requestsByRunner = Math.floor(count / instances);

    for (let index = 0; index < instances; index++) {
      this.runners.push(this._runnerFactory(collection, requestsByRunner));
    }
  }

  _runnerFactory(collection, iterationCount) {
    return () => new Promise((resolve, reject) => {
      const instance = this.instanceCounter++;
      spinnies.add(`spinner-${instance}`, { text: `Processing Instance ${instance}` });

      newman.run({
        collection: require(collection),
        silent: true,
        iterationCount
      }, (error, summary) => {
        if (error) reject(error);
        spinnies.succeed(`spinner-${instance}`, { text: `Finished Instance ${instance}` });
        resolve(summary)
      })
    })
  }

  async _executeRunners() {
    const { instances, count } = this.arguments;

    console.log(`*** Started running ${instances} instances for ${count} requests ***`);
    await Promise.all(this.runners.map(runner => runner()));
    console.log('*** Finished running ***');
  }
}

module.exports = Speedman;