# faast.js with `sharp` on AWS

This example demonstrates the use of the `packageJson` option to work with the [`sharp`](https://sharp.pixelplumbing.com/en/stable/) package for image manipulation, which can't be bundled by webpack because it has native dependencies.

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
wrote output.png
```

`output.png` should be the same as `expected-output.png`, which is this image:

![expectedoutput](./expected-output.png)
