# faast.js with Babel example

This example demonstrates how to use faast.js with babel.

## Prerequisites

-   Node 8+.

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
$ node lib/index.js
```

## Expected output

```text
## Logs
https://us-west-2.console.aws.amazon.com/cloudwatch/...
## Output
hello aws!
## Cost
functionCallDuration  $0.00002813/second            0.1 second     $0.00000281    91.9%  [1]
functionCallRequests  $0.00000020/request             1 request    $0.00000020     6.5%  [2]
outboundDataTransfer  $0.09000000/GB         0.00000052 GB         $0.00000005     1.5%  [3]
sqs                   $0.00000040/request             0 request    $0              0.0%  [4]
sns                   $0.00000050/request             0 request    $0              0.0%  [5]
logIngestion          $0.50000000/GB                  0 GB         $0              0.0%  [6]
---------------------------------------------------------------------------------------
                                                                   $0.00000306 (USD)

  * Estimated using highest pricing tier for each service. Limitations apply.
 ** Does not account for free tier.
[1]: https://aws.amazon.com/lambda/pricing (rate = 0.00001667/(GB*second) * 1.6875 GB = 0.00002813/second)
[2]: https://aws.amazon.com/lambda/pricing
[3]: https://aws.amazon.com/ec2/pricing/on-demand/#Data_Transfer
[4]: https://aws.amazon.com/sqs/pricing
[5]: https://aws.amazon.com/sns/pricing
[6]: https://aws.amazon.com/cloudwatch/pricing/ - Log ingestion costs not currently included.
## Stats
completed: 1, retries: 0, errors: 0, executionTime.mean: 2ms
```
