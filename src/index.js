import sum from './sum';
import { getRandomNum } from './ab';
import { log } from './log';

const count = sum(getRandomNum(), getRandomNum());

log(count);
