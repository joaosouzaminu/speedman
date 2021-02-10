# speedman

Run postman collections in parallel `powered by newman`.

## Installation

Speedman version 1.1.0 allows usage as a CLI, so install it globally using npm:

```sh
npm install -g speedman 
```

After cloning the repo run (v1.0.0):

```sh
$ npm install
```

## Usage

Run the script using a terminal and passing the arguments as follow:

| Argument   | Shorthand (v1.1.0) | Description                                                          | Example                                   |
|------------|--------------------|----------------------------------------------------------------------|-------------------------------------------|
| collection | `-c`               | A postman collection exported to JSON format                         | `./my_collection.postman_collection.json` |
| instances  | `-i`               | The amount of instances to run in parallel                           | `10`                                      |
| count      | `-n`               | The total amount of requests to be distributed between the instances | `10`                                      |

## Full Example

Running `speedman` as a CLI (v1.1.0):

```sh
$ speedman -c ./my-collection.postman_collection.json -i 10 -n 10
```

Running after cloning the repo (v1.0.0):

```sh
$ node index.js --collection ./my-collection.postman_collection.json --instances 10 --count 10
```

## Result

```sh
*** Started running 10 instances for 10 requests ***
✓ Finished Instance 1
✓ Finished Instance 2
✓ Finished Instance 3
✓ Finished Instance 4
✓ Finished Instance 5
✓ Finished Instance 6
✓ Finished Instance 7
✓ Finished Instance 8
✓ Finished Instance 9
✓ Finished Instance 10
** Finished running **
```