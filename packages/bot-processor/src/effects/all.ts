import { ALL, BaseEffect, EffectType } from "./types/index.js";
import { makeEffect } from "./utils/index.js";

/**
 * Works like Promise.all() but for generators
 */
export function all(payload: Array<Promise<unknown> | BaseEffect<EffectType, any, any>>) {
  return makeEffect(ALL, payload, undefined);
}
