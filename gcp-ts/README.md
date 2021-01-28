# faast.js Google Cloud TypeScript example

This example demonstrates some typical Google Cloud options in faast.js in TypeScript.

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
$ node dist/index.js
```

## Expected output

```text
## Logs
https://console.cloud.google.com/logs/viewer?project=derivative-184723&resource=cloud_function%2Ffunction_name%2Ffaast-664f50a3-c255-4dbe-bbab-a0f9b2bb1762
## Output
hello GCP!
## Cost
functionCallDuration  $0.00001600/second            0.1 second     $0.00000160    77.3%  [1]
functionCallRequests  $0.00000040/request             1 request    $0.00000040    19.3%  [2]
outboundDataTransfer  $0.12000000/GB         0.00000057 GB         $0.00000007     3.3%  [3]
pubsub                $0.05859375/GB                  0 GB         $0              0.0%  [4]
---------------------------------------------------------------------------------------
                                                                   $0.00000207 (USD)

  * Estimated using highest pricing tier for each service. Limitations apply.
 ** Does not account for free tier.
[1]: https://cloud.google.com/functions/pricing#compute_time (1024 MB, 1.4 GHz)
[2]: https://cloud.google.com/functions/pricing#invocations
[3]: https://cloud.google.com/functions/pricing#networking
[4]: https://cloud.google.com/pubsub/pricing
## Stats
completed: 1, retries: 0, errors: 0, executionTime.mean: 3ms
```
