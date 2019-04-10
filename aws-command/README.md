# faast.js AWS run remote command example

This is a simple command line tool that runs a command on AWS Lambda. Note that every time this command is run, it creates a _new_ lambda. It doesn't make much sense to invoke this script many times from an external program. Instead, adapt the script to handle a set of inputs from a file, or from another process, and invoke the exec function multiple times within a single process execution.

The `-d, --dir` option can be used to send a directory to the lambda function. This directory can contain a binary to run and inputs for the binary, for example.

## Prerequisites

-   Node 8+.

-   TypeScript 3.3 or above. Install globally:

    ```shell
    $ npm install -g typescript
    ```

## Installing dependencies

```shell
$ npm install
```

## Building

```shell
$ npm run build
```

Using `npm run watch` will automatically compile changes on the fly if you're modifying the script.

## Running

```shell
Usage: node runfaast.js [options] <command> [args...]

Run a command on lambda using faast.js

Options:
  -d, --dir      Send a directory to the lambda function and make it available
                 in the current working directory in the cloud function.
  -h, --help     output usage information
```

## Expected output

```text
$ node dist/runfaast.js -d . ls -al
Command: 'ls -al'
Dir: /Users/achou/Code/examples/aws-command
Cwd: /Users/achou/Code/examples/aws-command
Creating cloud function.
Logs: https://us-west-2.console.aws.amazon.com/cloudwatch/...
Output:
total 304
drwxr-xr-x  4 slicer  497   4096 Apr 10 19:17 .
drwxr-xr-x 23 root   root   4096 Apr  1 19:00 ..
drwxr-xr-x  2 slicer  497   4096 Apr 10 18:00 dist
-rw-r--r--  1 slicer  497    134 Apr 10 18:44 functions.ts
-rw-r--r--  1 slicer  497 270250 Apr 10 19:17 index.js
drwxr-xr-x  5 slicer  497   4096 Apr 10 17:58 node_modules
-rw-r--r--  1 slicer  497    269 Apr 10 18:39 package.json
-rw-r--r--  1 slicer  497    697 Apr 10 17:19 package-lock.json
-rw-r--r--  1 slicer  497   1488 Apr 10 18:56 README.md
-rw-r--r--  1 slicer  497   1848 Apr 10 19:17 runfaast.ts
-rw-r--r--  1 slicer  497    396 Apr 10 17:15 tsconfig.json

Cost: $0.00000311
```
