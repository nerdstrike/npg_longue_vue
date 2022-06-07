import { writable } from "svelte/store";

/*
Example run:
{
    "run_name": ["well1, well2 ..."]
}
*/

export const runCollection = writable([]);

export const focusRun = writable(null);
