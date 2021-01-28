# faast.js Cost Analyzer example comparing AWS Lambda and Google Cloud Functions costs

The cost analyzer summarizes the cost of running a particular workload against multiple configurations. In this example, we generate 100,000 random numbers in each workload. For each memory size, the workload is executed 10 times. Then the workload is executed on both AWS Lambda and Google Cloud Functions, with memory sizes that include 128MB, 256MB, 512MB, 1024MB, 2048MB. In addition, AWS is tested with 1728MB. The results are printed in real time to the console and also output in CSV format to the file "cost.csv".

## Prerequisites

-   Node 8+.

-   AWS account and IAM user. See faast.js documentation for account setup instructions.

-   Google Cloud account. See faast.js documentation for account setup instructions.

## Installing dependencies

```shell
$ npm install
```

## Building

```shell
$ npm run build
```

## Running

```shell
$ node dist/index.js
```

## Expected output

```text

```
