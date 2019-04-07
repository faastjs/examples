# faast.js AWS bundled dependency TypeScript example

This example demonstrates that you don't need to do anything special to use package dependencies in cloud functions, even on AWS. This is because faast.js uses webpack to bundle dependencies in the cloud function module for you.

In this example, the code in `functions.ts` imports `lodash` and it just works.

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

## Running

```shell
$ node dist/index.js
```

## Expected output

```text
square([0,1,2]) = [0,1,4]
```
