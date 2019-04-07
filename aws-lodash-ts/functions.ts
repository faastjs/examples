import * as _ from "lodash";

export function square(input: number[]) {
    return _.map(input, x => x * x);
}
