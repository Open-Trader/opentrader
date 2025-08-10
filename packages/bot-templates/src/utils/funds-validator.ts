import type { IBotConfiguration } from "@opentrader/bot-processor";

/**
 * Utility functions for handling funds validation in bot templates
 */

/**
 * Type for funds requirement - can be static object or dynamic function
 */
export type FundsRequirement<T extends IBotConfiguration> = 
  | Record<string, number>
  | ((botConfig: T) => Record<string, number>);

/**
 * Resolves funds requirement from a strategy template
 * @param fundsRequired - The fundsRequired property from a strategy
 * @param botConfig - Bot configuration to pass to dynamic functions
 * @returns Record of currency -> amount required
 */
export function resolveFundsRequirement<T extends IBotConfiguration>(
  fundsRequired: FundsRequirement<T> | undefined,
  botConfig: T
): Record<string, number> | undefined {
  if (!fundsRequired) {
    return undefined;
  }

  if (typeof fundsRequired === 'function') {
    return fundsRequired(botConfig);
  }

  return fundsRequired;
}

/**
 * Validates that a funds requirement object is valid
 * @param fundsRequired - Funds requirement to validate
 * @returns Array of validation errors (empty if valid)
 */
export function validateFundsRequirement(
  fundsRequired: Record<string, number>
): string[] {
  const errors: string[] = [];

  if (!fundsRequired || typeof fundsRequired !== 'object') {
    errors.push('Funds requirement must be an object');
    return errors;
  }

  for (const [currency, amount] of Object.entries(fundsRequired)) {
    if (typeof currency !== 'string' || !currency.trim()) {
      errors.push('Currency keys must be non-empty strings');
    }

    if (typeof amount !== 'number' || amount < 0 || !isFinite(amount)) {
      errors.push(`Amount for ${currency} must be a non-negative finite number`);
    }
  }

  return errors;
}

/**
 * Creates a human-readable string from funds requirement
 * @param fundsRequired - Funds requirement object
 * @returns Formatted string like "1 ETH, 100 USDT"
 */
export function formatFundsRequirement(
  fundsRequired: Record<string, number>
): string {
  return Object.entries(fundsRequired)
    .map(([currency, amount]) => `${amount} ${currency}`)
    .join(', ');
}

/**
 * Compares two funds objects and returns shortage information
 * @param required - Required funds
 * @param available - Available funds  
 * @returns Object with shortage details
 */
export function calculateFundsShortage(
  required: Record<string, number>,
  available: Record<string, number>
): {
  hasShortage: boolean;
  shortages: Array<{ currency: string; required: number; available: number; shortage: number }>;
} {
  const shortages: Array<{ currency: string; required: number; available: number; shortage: number }> = [];

  for (const [currency, requiredAmount] of Object.entries(required)) {
    const availableAmount = available[currency] || 0;
    
    if (availableAmount < requiredAmount) {
      shortages.push({
        currency,
        required: requiredAmount,
        available: availableAmount,
        shortage: requiredAmount - availableAmount,
      });
    }
  }

  return {
    hasShortage: shortages.length > 0,
    shortages,
  };
}

/**
 * Helper function to extract currency symbols from a trading pair symbol
 * Useful for determining what currencies might be needed for trading
 * @param symbol - Trading pair symbol like "BTC/USDT"
 * @returns Object with base and quote currencies
 */
export function parseSymbolCurrencies(symbol: string): {
  base: string;
  quote: string;
} | null {
  const parts = symbol.split('/');
  if (parts.length !== 2) {
    return null;
  }

  return {
    base: parts[0],
    quote: parts[1],
  };
}