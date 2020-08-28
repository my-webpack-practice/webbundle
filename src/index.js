import sum from './sum';
import ab, { getRandomNum } from './ab';
import { log } from './helpers';

const count = sum(getRandomNum(), getRandomNum());

log('[index]', ab, count);
