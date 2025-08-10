import { TRPCError } from "@trpc/server";
import type { TBotWithExchangeAccount } from "@opentrader/db";
import { findStrategy } from "@opentrader/bot-templates/server";
import { exchangeProvider } from "@opentrader/exchanges";
import type { IBotConfiguration } from "@opentrader/bot-processor";
import type { IAccountAsset } from "@opentrader/types";

export interface FundsValidationResult {
  hasEnoughFunds: boolean;
  requiredFunds?: Record<string, number>;
  availableFunds?: Record<string, number>;
  errorMessage?: string;
}

export class FundsValidationService {
  constructor(private bot: TBotWithExchangeAccount) {}

  /**
   * Validates if the bot has enough funds to run the strategy
   */
  async validateFunds(): Promise<FundsValidationResult> {
    try {
      // Find the strategy template
      const { strategyFn } = findStrategy(this.bot.template);
      
      // Skip validation if strategy doesn't define fundsRequired
      if (!strategyFn.fundsRequired) {
        return { hasEnoughFunds: true };
      }

      // Get required funds from strategy
      const requiredFunds = this.getRequiredFunds(strategyFn, this.bot);
      
      // Skip validation if strategy returns undefined (e.g., for market orders)
      if (!requiredFunds) {
        return { hasEnoughFunds: true };
      }
      
      // Get current portfolio
      const availableFunds = await this.getAvailableFunds();

      // Check if we have enough funds
      const validationResult = this.compareFunds(requiredFunds, availableFunds);

      return {
        hasEnoughFunds: validationResult.hasEnoughFunds,
        requiredFunds,
        availableFunds,
        errorMessage: validationResult.errorMessage,
      };
    } catch (error) {
      return {
        hasEnoughFunds: false,
        errorMessage: `Failed to validate funds: ${error instanceof Error ? error.message : 'Unknown error'}`,
      };
    }
  }

  /**
   * Validates funds and throws an error if insufficient
   */
  async validateFundsOrThrow(): Promise<void> {
    const result = await this.validateFunds();
    
    if (!result.hasEnoughFunds) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: result.errorMessage || "Insufficient funds to run the strategy",
      });
    }
  }

  /**
   * Extracts required funds from strategy template
   */
  private getRequiredFunds(
    strategyFn: any, 
    bot: TBotWithExchangeAccount
  ): Record<string, number> | undefined {
    if (typeof strategyFn.fundsRequired === 'function') {
      // Create a minimal bot configuration for the function
      const botConfig: IBotConfiguration = {
        id: bot.id,
        symbol: bot.symbol,
        settings: bot.settings,
      };
      
      return strategyFn.fundsRequired(botConfig);
    } else {
      return strategyFn.fundsRequired;
    }
  }

  /**
   * Fetches current account assets from exchange
   */
  private async getAvailableFunds(): Promise<Record<string, number>> {
    // Convert to ExchangeAccountWithCredentials format
    const exchangeAccountWithCredentials = {
      ...this.bot.exchangeAccount,
      credentials: {
        code: this.bot.exchangeAccount.exchangeCode,
        apiKey: this.bot.exchangeAccount.apiKey,
        secretKey: this.bot.exchangeAccount.secretKey,
        password: this.bot.exchangeAccount.password,
        isDemoAccount: this.bot.exchangeAccount.isDemoAccount,
        isPaperAccount: this.bot.exchangeAccount.isPaperAccount,
      }
    };

    const exchange = exchangeProvider.fromAccount(exchangeAccountWithCredentials);

    try {
      const accountAssets: IAccountAsset[] = await exchange.accountAssets();
      
      // Convert to a simple currency -> available balance mapping
      const availableFunds: Record<string, number> = {};
      
      for (const asset of accountAssets) {
        availableFunds[asset.currency] = asset.availableBalance;
      }
      
      return availableFunds;
    } finally {
      await exchange.destroy();
    }
  }

  /**
   * Compares required funds with available funds
   */
  private compareFunds(
    requiredFunds: Record<string, number>,
    availableFunds: Record<string, number>
  ): { hasEnoughFunds: boolean; errorMessage?: string } {
    const insufficientCurrencies: string[] = [];
    const portfolioDetails: string[] = [];
    const requiredDetails: string[] = [];

    for (const [currency, requiredAmount] of Object.entries(requiredFunds)) {
      const availableAmount = availableFunds[currency] || 0;
      
      portfolioDetails.push(`${availableAmount} ${currency}`);
      requiredDetails.push(`${requiredAmount} ${currency}`);

      if (availableAmount < requiredAmount) {
        insufficientCurrencies.push(
          `${currency}: need ${requiredAmount}, have ${availableAmount}`
        );
      }
    }

    if (insufficientCurrencies.length > 0) {
      const portfolioStr = portfolioDetails.join(', ');
      const requiredStr = requiredDetails.join(', ');
      
      return {
        hasEnoughFunds: false,
        errorMessage: `Not enough funds to run the strategy. Your portfolio: ${portfolioStr}. Required: ${requiredStr}`,
      };
    }

    return { hasEnoughFunds: true };
  }
}