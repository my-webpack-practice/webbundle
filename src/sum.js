import { getRandomNum } from './ab';
import { log } from './helpers/index';

export function cube(x) {
  return x ** 3;
}

export default function sum(a, b) {
  return a + b;
}

const r1 = getRandomNum();
const r2 = getRandomNum();

log(sum(r1, r2));
