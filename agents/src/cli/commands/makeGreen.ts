import {Output} from "../chatInterface";

import {Command, Result} from "./types";

const makeGreenCommand = (output: Output): Command => ({
    name: '/makeGreen',
    description: 'Make all tests pass',
    execute: async (): Promise<Result> => {
        output.log("Implementing code based on test results...")
        return {success: true, message: "Success!"};
    },
});

export default makeGreenCommand;