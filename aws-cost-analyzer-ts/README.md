# faast.js Cost Analyzer TypeScript example on AWS

The cost analyzer summarizes the cost of running a particular workload against multiple configurations. In this example, we generate 100,000 random numbers in each workload. For each memory size, the workload is executed 10 times. Memory sizes from 1024MB to 2048MB are analyzed and the results printed in real time to the console and also output in CSV format to the file "cost.csv".

Note: if you only need a cost estimate for a specific run of faast.js you can use cost snapshots. See the [aws-ts](../aws-ts/README.md) example.

## Prerequisites

-   Node 8+.

-   AWS account and IAM user. See faast.js documentation for account setup instructions.

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
  ✔ aws 1024MB https 0.009s 0.006σ $0.00001914
  ✔ aws 1088MB https 0.008s 0.006σ $0.00002018
  ✔ aws 1152MB https 0.009s 0.006σ $0.00002122
  ✔ aws 1216MB https 0.009s 0.005σ $0.00002227
  ✔ aws 1280MB https 0.009s 0.005σ $0.00002331
  ✔ aws 1344MB https 0.009s 0.005σ $0.00002435
  ✔ aws 1408MB https 0.008s 0.005σ $0.00002539
  ✔ aws 1472MB https 0.007s 0.004σ $0.00002643
  ✔ aws 1536MB https 0.007s 0.004σ $0.00002747
  ✔ aws 1600MB https 0.008s 0.005σ $0.00002852
  ✔ aws 1664MB https 0.006s 0.004σ $0.00002956
  ✔ aws 1728MB https 0.005s 0.003σ $0.00003060
  ✔ aws 1792MB https 0.005s 0.003σ $0.00003164
  ✔ aws 1856MB https 0.006s 0.003σ $0.00003268
  ✔ aws 1920MB https 0.005s 0.003σ $0.00003372
  ✔ aws 1984MB https 0.006s 0.003σ $0.00003477
  ✔ aws 2048MB https 0.005s 0.003σ $0.00003581
```
