import { current, past } from "./constant.mjs";
import { diff } from "./diff.mjs";

const res = diff(past, current);
console.log(JSON.stringify(res, null, 2));
