export interface InputTransform<TIn, TOut> {
  (value: TIn): TOut;
}

export function toNumber(value: string): number {
  return Number(value);
}
