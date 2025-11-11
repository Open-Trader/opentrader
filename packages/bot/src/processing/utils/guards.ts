export const nullToUndefined = <T = unknown>(value: T | null): T | undefined => (value !== null ? value : undefined);

export const required = <T = unknown>(value: T | null | undefined, propName: string): T => {
  if (value === null || value === undefined) {
    throw new Error(`Property: ${propName}. Expected non null value. Received: NaN`);
  }

  return value;
};
