/**
 * Copyright 2024 bludnic
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Repository URL: https://github.com/bludnic/opentrader
 */

import { ExchangeAccountWithCredentials, SmartTradeWithOrders, TBotWithExchangeAccount } from "@opentrader/db";
import Emittery from "emittery";

export const eventBus = new Emittery<{
  // Exchange Account events
  onExchangeAccountCreated: ExchangeAccountWithCredentials;
  onExchangeAccountDeleted: ExchangeAccountWithCredentials;
  onExchangeAccountUpdated: ExchangeAccountWithCredentials;

  // Bot events
  onBotCreated: TBotWithExchangeAccount;
  startBot: TBotWithExchangeAccount;
  onBeforeBotStarted: TBotWithExchangeAccount;
  onBotStarted: TBotWithExchangeAccount;
  stopBot: TBotWithExchangeAccount;
  onBeforeBotStopped: TBotWithExchangeAccount;
  onBotStopped: TBotWithExchangeAccount;

  // Trade events
  placeTrade: SmartTradeWithOrders;
  cancelTrade: SmartTradeWithOrders;
  onTradeCreated: SmartTradeWithOrders;
  onTradeUpdated: SmartTradeWithOrders;
  onTradeCompleted: SmartTradeWithOrders;
}>();
