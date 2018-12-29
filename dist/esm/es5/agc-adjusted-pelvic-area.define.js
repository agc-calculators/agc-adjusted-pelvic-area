
// AgcAdjustedPelvicArea: Custom Elements Define Library, ES Module/es5 Target

import { defineCustomElement } from './agc-adjusted-pelvic-area.core.js';
import {
  AgcAdjustedPelvicArea,
  AgcAdjustedPelvicAreaProgress,
  AgcAdjustedPelvicAreaResults,
  AgcAdjustedPelvicAreaResultsPlaceholder
} from './agc-adjusted-pelvic-area.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    AgcAdjustedPelvicArea,
    AgcAdjustedPelvicAreaProgress,
    AgcAdjustedPelvicAreaResults,
    AgcAdjustedPelvicAreaResultsPlaceholder
  ], opts);
}
