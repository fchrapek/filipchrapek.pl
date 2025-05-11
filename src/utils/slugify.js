import kebabcase from "lodash.kebabcase";

export const slugifyStr = (str) => kebabcase(str);

export const slugifyAll = (arr) => arr.map(str => slugifyStr(str));
