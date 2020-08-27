import sum from './sum';
import { getRandomNum } from './ab';
import { log } from './helpers/index';

const count = sum(getRandomNum(), getRandomNum());

log(count);
