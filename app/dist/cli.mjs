import { createRequire } from 'module';
import { logPath, defaultSettings, saveSettings, appPath, getSettings } from './chunk-LM7I6YYA.mjs';
import { logger, xprisma, findStrategy, exchangeCodeMapCCXT, Backtesting, CCXTCandlesProvider, tServer } from './chunk-QARZYCUO.mjs';
import { ExchangeCode, BarSize, calcGridLines } from './chunk-F7O354SE.mjs';
import { Command, Argument, Option } from 'commander';
import { dirname, join } from 'node:path';
import * as fs from 'node:fs';
import { mkdirSync, writeFileSync, readFileSync as readFileSync$1 } from 'node:fs';
import superjson from 'superjson';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { fileURLToPath } from 'url';
import JSON5 from 'json5';
import { pro } from 'ccxt';
import { fileURLToPath as fileURLToPath$1 } from 'node:url';
import { spawn } from 'node:child_process';
import { execa } from 'execa';
import { existsSync, readFileSync, watchFile, createReadStream } from 'fs';
import { createInterface } from 'readline';
import { prettyFactory } from 'pino-pretty';

createRequire(import.meta.url);

        if (typeof globalThis.__dirname === "undefined") {
          globalThis.__dirname = new URL('.', import.meta.url).pathname;
        }
        if (typeof globalThis.__filename === "undefined") {
          globalThis.__filename = new URL(import.meta.url).pathname;
        }

// package.json
var package_default = {
  version: "1.0.0-beta.29"};

// src/utils/command.ts
function handle(asyncFunc) {
  return async (...args) => {
    try {
      const { result } = await asyncFunc(...args);
      if (result) {
        logger.info(result);
      }
    } catch (error) {
      console.error(error);
    }
  };
}
var PASS_FILE = "pass";
var savePassword = (password) => {
  mkdirSync(appPath, { recursive: true });
  writeFileSync(join(appPath, PASS_FILE), password);
};

// src/api/set-password.ts
async function setPassword(newPassword) {
  savePassword(newPassword);
  return {
    result: `Password saved successfully. Please restart the daemon.`
  };
}

// src/commands/set-password.ts
function setPasswordCommand(program2) {
  program2.command("set-password").description("Set admin password").addArgument(new Argument("<password>", "New password")).action(handle(setPassword));
}

// src/utils/validate.ts
function validateTimeframe(timeframe) {
  if (!timeframe) {
    return null;
  }
  const validTimeframes = Object.values(BarSize);
  if (validTimeframes.includes(timeframe)) {
    return timeframe;
  }
  throw new Error(
    `Invalid timeframe: ${timeframe}. Valid values are: ${validTimeframes.join(", ")}`
  );
}
function validatePair(pair) {
  if (!pair) {
    throw new Error("Trading pair is required");
  }
  const [baseCurrency, quoteCurrency] = pair.split("/");
  if (baseCurrency && quoteCurrency) {
    return pair.toUpperCase();
  }
  throw new Error(`Invalid trading pair: ${pair}. Expected format: BTC/USDT`);
}
function validateExchange(exchangeCodeParam) {
  if (!exchangeCodeParam) {
    throw new Error("Exchange is required");
  }
  const validExchanges = Object.values(ExchangeCode);
  const exchangeCode = exchangeCodeParam.toUpperCase();
  if (validExchanges.includes(exchangeCode)) {
    return exchangeCode;
  }
  throw new Error(
    `Invalid exchange: ${exchangeCode}. Valid values are: ${validExchanges.join(", ")}`
  );
}
var createDaemonRpcClient = () => {
  const { host, port } = getSettings();
  const DAEMON_URL = `http://${host}:${port}/api/trpc`;
  return createTRPCProxyClient({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: DAEMON_URL,
        headers: () => ({
          Authorization: process.env.ADMIN_PASSWORD
        })
      })
    ]
  });
};

// src/api/exchanges/add.ts
async function addExchangeAccount(options) {
  const daemonRpc = createDaemonRpcClient();
  await daemonRpc.exchangeAccount.create.mutate({
    name: options.name || options.label,
    label: options.label,
    exchangeCode: options.code,
    apiKey: options.key,
    secretKey: options.secret,
    password: options.password,
    isDemoAccount: options.demo,
    isPaperAccount: options.paper
  });
  return {
    result: "Exchange account added successfully."
  };
}

// src/commands/exchange/add.ts
function addExchangeAccountCommand(program2) {
  program2.command("exchange-add").description("Add an exchange account").addOption(new Option("-e, --code <code>", "Exchange code").argParser(validateExchange).makeOptionMandatory(true)).addOption(new Option("-k, --key <key>", "API Key").makeOptionMandatory(true)).addOption(new Option("-s, --secret <secret>", "Secret Key")).addOption(new Option("-p, --password <password>", "Password. Required for some exchanges").default(null)).addOption(new Option("-d, --demo", "Is demo account?").default(false)).addOption(new Option("--paper", "Is paper account?").default(false)).addOption(new Option("-l, --label <label>", "Exchange label").default("DEFAULT")).addOption(new Option("-n, --name <name>", "Exchange name").default(null)).addOption(new Option("-c, --config <config>", "Config file")).action(handle(addExchangeAccount));
}

// src/api/exchanges/update.ts
async function updateExchangeAccount(options) {
  const daemonRpc = createDaemonRpcClient();
  const exchangeAccounts = await daemonRpc.exchangeAccount.list.query();
  const exchangeAccount = exchangeAccounts.find((account) => account.label === options.label);
  if (!exchangeAccount) {
    logger.error(`Exchange account with label "${options.label}" not found in DB. Create it first.`);
    return {
      result: void 0
    };
  }
  await daemonRpc.exchangeAccount.update.mutate({
    id: exchangeAccount.id,
    body: {
      name: options.name || exchangeAccount.name,
      exchangeCode: options.code,
      apiKey: options.key,
      secretKey: options.secret,
      password: options.password,
      isDemoAccount: options.demo,
      isPaperAccount: options.paper
    }
  });
  return {
    result: `Exchange account with label "${exchangeAccount.label}" updated successfully.`
  };
}

// src/commands/exchange/update.ts
function updateExchangeAccountCommand(program2) {
  program2.command("exchange-update").description("Update an exchange account").addOption(new Option("-e, --code <code>", "Exchange code").argParser(validateExchange).makeOptionMandatory(true)).addOption(new Option("-k, --key <key>", "API Key").makeOptionMandatory(true)).addOption(new Option("-s, --secret <secret>", "Secret Key").makeOptionMandatory(true)).addOption(new Option("-p, --password <password>", "Password. Required for some exchanges").default(null)).addOption(new Option("-d, --demo", "Is demo account?").default(false)).addOption(new Option("--paper", "Is paper account?").default(false)).addOption(new Option("-l, --label <label>", "Exchange label").default("DEFAULT")).addOption(new Option("-n, --name <name>", "Exchange name").default(null)).addOption(new Option("-c, --config <config>", "Config file")).action(handle(updateExchangeAccount));
}
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var rootDir = join(__dirname, "..");
var currDir = process.cwd();
var getConfigFilePath = (path, config) => fs.existsSync(`${path}/${config}`) ? `${path}/${config}` : false;
function readBotConfig(configName = "config.json5") {
  const currDirConfigPath = getConfigFilePath(currDir, configName);
  const rootDirConfigPath = getConfigFilePath(rootDir, configName);
  const configPath = currDirConfigPath || rootDirConfigPath;
  if (!configPath) {
    throw new Error(`Missing ${configName} file in current or root directory`);
  }
  logger.info(`Using bot config file: ${configPath}`);
  const config = JSON5.parse(fs.readFileSync(configPath, "utf8"));
  return config;
}
function readExchangesConfig(configName = "exchanges.json5") {
  const currDirConfigPath = getConfigFilePath(currDir, configName);
  const rootDirConfigPath = getConfigFilePath(rootDir, configName);
  const configPath = currDirConfigPath || rootDirConfigPath;
  if (!configPath) {
    throw new Error(`Missing ${configName} file in current or root directory`);
  }
  logger.info(`Using exchanges config file: ${configPath}`);
  const config = JSON5.parse(
    fs.readFileSync(configPath, "utf8")
  );
  return config;
}

// src/api/stop-command.ts
async function stopCommand(options) {
  const daemonRpc = createDaemonRpcClient();
  const config = readBotConfig(options.config);
  logger.debug(config, "Parsed bot config");
  const exchangesConfig = readExchangesConfig(options.config);
  logger.debug(exchangesConfig, "Parsed exchanges config");
  const botLabel = config.label || "default";
  const bot = await xprisma.bot.custom.findUnique({
    where: {
      label: botLabel
    }
  });
  if (!bot) {
    logger.info(`Bot "${botLabel}" does not exists. Nothing to stop`);
    return {
      result: void 0
    };
  }
  try {
    findStrategy(bot.template);
  } catch (err) {
    logger.info(err.message);
    return {
      result: void 0
    };
  }
  logger.info(`Stopping bot "${bot.label}"...`);
  await daemonRpc.bot.stop.mutate({ botId: bot.id });
  logger.info(`Bot "${bot.label}" stopped successfully`);
  return {
    result: void 0
  };
}

// src/commands/stop.ts
function addStopCommand(program2) {
  program2.command("stop").description("Process stop command").addOption(new Option("-c, --config <config>", "Config file")).action(handle(stopCommand));
}
async function runBacktest(strategyName, options) {
  const botConfig = readBotConfig(options.config);
  logger.debug(botConfig, "Parsed bot config");
  let strategy;
  try {
    strategy = findStrategy(strategyName);
  } catch (err) {
    logger.info(err.message);
    return {
      result: void 0
    };
  }
  const { success: isValidSchema, error } = strategy.strategyFn.schema.strict().safeParse(botConfig.settings);
  if (!isValidSchema) {
    logger.error(error.message);
    logger.error(`The params for "${strategyName}" strategy are invalid. Check the "config.dev.json5"`);
    return {
      result: void 0
    };
  }
  const botTimeframe = options.timeframe || botConfig.timeframe || null;
  const botPair = options.pair || botConfig.pair;
  const ccxtExchange = exchangeCodeMapCCXT[options.exchange];
  const exchange = new pro[ccxtExchange]();
  logger.info(`Using ${botPair} on ${options.exchange} exchange with ${botTimeframe} timeframe`);
  const backtesting = new Backtesting({
    botConfig: {
      id: 0,
      symbol: botPair,
      exchangeCode: options.exchange,
      settings: botConfig.settings,
      timeframe: botTimeframe
    },
    botTemplate: strategy.strategyFn
  });
  return new Promise((resolve) => {
    const candles = [];
    const candleProvider = new CCXTCandlesProvider({
      exchange,
      symbol: botPair,
      timeframe: botTimeframe,
      startDate: options.from,
      endDate: options.to
    });
    candleProvider.on("candle", (candle) => candles.push(candle));
    candleProvider.on("done", async () => {
      logger.info(`Fetched ${candles.length} candlesticks`);
      const report = await backtesting.run(candles);
      resolve({
        result: report
      });
    });
    candleProvider.emit("start");
  });
}

// src/commands/backtest.ts
function addBacktestCommand(program2) {
  program2.command("backtest").description("Backtesting a strategy").addArgument(new Argument("<strategy>", "Strategy name")).addOption(
    new Option("--from <from>", "Start date").argParser((dateISO) => new Date(dateISO)).default(/* @__PURE__ */ new Date("2024-03-01"))
  ).addOption(
    new Option("--to <to>", "End date").argParser((dateISO) => new Date(dateISO)).default(/* @__PURE__ */ new Date("2024-03-31"))
  ).addOption(new Option("-p, --pair <pair>", "Trading pair").argParser(validatePair)).addOption(new Option("-t, --timeframe <timeframe>", "Timeframe").default("1h")).addOption(new Option("-c, --config <config>", "Config file")).addOption(
    new Option("-e, --exchange <exchange>", "Exchange").argParser(validateExchange).default(ExchangeCode.OKX)
  ).action(handle(runBacktest));
}

// src/api/grid-lines.ts
function buildGridLines(maxPrice, minPrice, options) {
  const gridLines = calcGridLines(
    maxPrice,
    minPrice,
    options.lines,
    options.quantity
  );
  console.table(gridLines);
  return {
    result: void 0
  };
}

// src/commands/grid-lines.ts
function addGridLinesCommand(program2) {
  program2.command("grid-lines").description("Build grid lines by given parameters").addArgument(new Argument("<max>", "Max price").argParser(parseFloat)).addArgument(new Argument("<min>", "Min price").argParser(parseFloat)).addOption(
    new Option("-l, --lines <lines>", "Number of lines").argParser(parseFloat).default(10)
  ).addOption(
    new Option("-q, --quantity <quantity>", "Quantity").argParser(parseFloat).default(1)
  ).action(handle(buildGridLines));
}

// src/utils/bot.ts
async function createOrUpdateExchangeAccounts(exchangesConfig) {
  const exchangeAccounts = [];
  for (const [exchangeLabel, exchangeData] of Object.entries(exchangesConfig)) {
    let exchangeAccount = await xprisma.exchangeAccount.findFirst({
      where: {
        label: exchangeLabel
      }
    });
    if (exchangeAccount) {
      logger.info(`Exchange account "${exchangeLabel}" found in DB. Updating credentials...`);
      exchangeAccount = await xprisma.exchangeAccount.update({
        where: {
          id: exchangeAccount.id
        },
        data: {
          ...exchangeData,
          label: exchangeLabel,
          owner: {
            connect: {
              id: 1
            }
          }
        }
      });
      logger.info(`Exchange account "${exchangeLabel}" updated`);
    } else {
      logger.info(`Exchange account "${exchangeLabel}" not found. Adding to DB...`);
      exchangeAccount = await xprisma.exchangeAccount.create({
        data: {
          ...exchangeData,
          label: exchangeLabel,
          owner: {
            connect: {
              id: 1
            }
          }
        }
      });
      logger.info(`Exchange account "${exchangeLabel}" created`);
    }
    exchangeAccounts.push(exchangeAccount);
  }
  return exchangeAccounts;
}
async function createOrUpdateBot(strategyName, options, botConfig, exchangeAccounts) {
  const exchangeLabel = options.exchange || botConfig.exchange;
  const botType = botConfig.type || "Bot";
  const botName = botConfig.name || "Default bot";
  const botLabel = botConfig.label || "default";
  const botTemplate = strategyName || botConfig.template;
  const botTimeframe = options.timeframe || botConfig.timeframe || null;
  const botPair = options.pair || botConfig.pair;
  const exchangeAccount = exchangeAccounts.find((exchangeAccount2) => exchangeAccount2.label === exchangeLabel);
  if (!exchangeAccount) {
    throw new Error(`Exchange account with label "${exchangeLabel}" not found. Check the exchanges config file.`);
  }
  let bot = await xprisma.bot.custom.findFirst({
    where: {
      label: botLabel
    }
  });
  if (bot) {
    logger.info(`Bot "${botLabel}" found in DB. Updating...`);
    bot = await xprisma.bot.custom.update({
      where: {
        id: bot.id
      },
      data: {
        type: botType,
        name: botName,
        label: botLabel,
        template: botTemplate,
        timeframe: botTimeframe,
        symbol: botPair,
        settings: JSON.stringify(botConfig.settings),
        state: JSON.stringify({}),
        // resets bot state
        exchangeAccount: {
          connect: {
            id: exchangeAccount.id
          }
        },
        owner: {
          connect: {
            id: 1
          }
        }
      }
    });
    logger.info(`Bot "${botLabel}" updated`);
  } else {
    logger.info(`Bot "${botLabel}" not found. Adding to DB...`);
    bot = await xprisma.bot.custom.create({
      data: {
        type: botType,
        name: botName,
        label: botLabel,
        template: strategyName,
        timeframe: botTimeframe,
        symbol: botPair,
        settings: JSON.stringify(botConfig.settings),
        exchangeAccount: {
          connect: {
            id: exchangeAccount.id
          }
        },
        owner: {
          connect: {
            id: 1
          }
        }
      }
    });
    logger.info(`Bot "${botLabel}" created`);
  }
  return bot;
}
async function resetProcessing(botId) {
  await xprisma.bot.custom.update({
    where: {
      id: botId
    },
    data: {
      processing: false
    }
  });
}

// src/api/run-trading.ts
async function runTrading(strategyName, options) {
  const daemonRpc = createDaemonRpcClient();
  const config = readBotConfig(options.config);
  logger.debug(config, "Parsed bot config");
  const exchangesConfig = readExchangesConfig(options.config);
  logger.debug(exchangesConfig, "Parsed exchanges config");
  let strategy;
  try {
    strategy = findStrategy(strategyName);
  } catch (err) {
    logger.info(err.message);
    return {
      result: void 0
    };
  }
  const { success: isValidSchema, error } = strategy.strategyFn.schema.safeParse(config.settings);
  if (!isValidSchema) {
    logger.error(error.message);
    logger.error(`The params for "${strategyName}" strategy are invalid. Check the "config.dev.json5"`);
    return {
      result: void 0
    };
  }
  let bot = await xprisma.bot.custom.findUnique({
    where: {
      label: config.label || "default"
    }
  });
  const isDaemonRunning = await checkDaemonHealth(daemonRpc);
  if (!isDaemonRunning) {
    logger.info("Daemon is not running. Please start it before running the bot");
    return {
      result: void 0
    };
  }
  if (bot?.processing) {
    logger.warn(`Bot "${bot.label}" is already processing. It could happen because previous process was interrupted.`);
    await resetProcessing(bot.id);
    logger.warn(`The bot processing state was cleared`);
  }
  if (bot?.enabled) {
    logger.info(`Bot "${bot.label}" is already enabled. Cancelling previous orders...`);
    await tServer.bot.stop({ botId: bot.id });
    logger.info(`The bot was stoped`);
  }
  const exchangeAccounts = await createOrUpdateExchangeAccounts(exchangesConfig);
  bot = await createOrUpdateBot(strategyName, options, config, exchangeAccounts);
  const result = await daemonRpc.bot.start.mutate({ botId: bot.id });
  if (result) {
    logger.info(`Bot "${bot.label}" started succesfully`);
  } else {
    logger.error(`Bot "${bot.label}" failed to start. Check the daemon logs`);
  }
  return {
    result: void 0
  };
}
async function checkDaemonHealth(daemonRpc) {
  try {
    await daemonRpc.public.healhcheck.query();
    return true;
  } catch (err) {
    return false;
  }
}

// src/commands/trade.ts
function addTradeCommand(program2) {
  program2.command("trade").description("Live trading").addArgument(new Argument("<strategy>", "Strategy name").argOptional()).addOption(new Option("-c, --config <config>", "Config file")).addOption(
    new Option("-p, --pair <pair>", "Trading pair").argParser(validatePair)
  ).addOption(new Option("-e, --exchange <exchange>", "Exchange account")).addOption(
    new Option("-t, --timeframe <timeframe>", "Timeframe").argParser(validateTimeframe).default(null)
  ).action(handle(runTrading));
}
var savePid = (pid) => {
  mkdirSync(appPath, { recursive: true });
  writeFileSync(join(appPath, "pid"), pid.toString());
};
var getPid = () => {
  try {
    const pid = parseInt(readFileSync$1(join(appPath, "pid"), "utf8"));
    return isNaN(pid) ? null : pid;
  } catch (err) {
    return null;
  }
};
var clearPid = () => {
  mkdirSync(appPath, { recursive: true });
  writeFileSync(join(appPath, "pid"), "");
};

// src/api/up/index.ts
var __filename2 = fileURLToPath$1(import.meta.url);
var __dirname2 = dirname(__filename2);
async function up(options) {
  const pid = getPid();
  if (pid) {
    logger.warn(`OpenTrader already running [PID: ${pid}]`);
    return {
      result: void 0
    };
  }
  saveSettings({ host: options.host, port: options.port });
  const daemonProcess = spawn("node", [join(__dirname2, "daemon.mjs")], {
    detached: options.detach,
    stdio: options.detach ? "ignore" : void 0
  });
  if (daemonProcess.pid === void 0) {
    throw new Error("OpenTrader process not started. PID is undefined.");
  }
  logger.debug(`OpenTrader daemon started with PID: ${daemonProcess.pid}`);
  if (options.detach) {
    daemonProcess.unref();
    savePid(daemonProcess.pid);
    logger.info(`OpenTrader started as a daemon [PID: ${daemonProcess.pid}]`);
  } else {
    daemonProcess.stdout?.pipe(process.stdout);
    daemonProcess.stderr?.pipe(process.stderr);
  }
  return {
    result: void 0
  };
}

// src/commands/up.ts
function addUpCommand(program2) {
  program2.command("up").addOption(new Option("-d, --detach", "Run in detached mode").default(false)).addOption(new Option("--host <host>", "Custom daemon host. Default to `localhost`").default(defaultSettings.host)).addOption(new Option("-p, --port <port>", "Custom daemon port. Default to `8000`").default(defaultSettings.port)).action(handle(up));
}

// src/api/down.ts
async function down(options) {
  const pid = getPid();
  if (!pid) {
    logger.warn("OpenTrader already stopped.");
    return {
      result: void 0
    };
  }
  try {
    if (options.force) {
      process.kill(pid, "SIGKILL");
      logger.info(`OpenTrader has been forcefully stopped [PID: ${[pid]}]`);
    } else {
      process.kill(pid, "SIGTERM");
      logger.warn(`OpenTrader has been gracefully stopped [PID: ${[pid]}]`);
    }
  } catch (err) {
    logger.warn(`Failed to stop OpenTrader process [PID: ${pid}]. Retry with: opentrader down --force`);
    logger.error(err);
  }
  clearPid();
  return {
    result: void 0
  };
}

// src/commands/down.ts
function addDownCommand(program2) {
  program2.command("down").addOption(
    new Option("-f, --force", "Forcefully stop the daemon process").default(
      false
    )
  ).action(handle(down));
}

// src/api/status.ts
async function status() {
  const pid = getPid();
  if (pid) {
    logger.info(`Status: \u{1F7E2} Running [PID: ${pid}]`);
  } else {
    logger.info("Status: \u{1F534} Stopped");
  }
  return {
    result: void 0
  };
}

// src/commands/status.ts
function addStatusCommand(program2) {
  program2.command("status").action(handle(status));
}
var __filename3 = fileURLToPath$1(import.meta.url);
var __dirname3 = dirname(__filename3);
var ROOT_DIR = join(__dirname3, "../");
var PRISMA_BIN = join(ROOT_DIR, "node_modules/prisma/build/index.js");
var PRISMA_SCHEMA = join(ROOT_DIR, "./schema.prisma");
async function db(operation) {
  if (operation === "migrate") {
    execa(
      `${PRISMA_BIN} migrate dev --schema ${PRISMA_SCHEMA} --skip-generate`,
      {
        stdio: "inherit",
        shell: true
      }
    );
    logger.info("Database migrated successfully.");
  } else {
    throw new Error(`Operation ${operation} is not supported.`);
  }
  return {
    result: void 0
  };
}

// src/commands/db.ts
function dbCommands(program2) {
  program2.command("db").description("Database operations").addArgument(new Argument("<operation>", "Operation")).action(handle(db));
}
var pretty = prettyFactory({});
var prettyLog = (message) => {
  const parsedMessage = JSON.parse(message);
  const prettifiedMessage = pretty(parsedMessage);
  console.log(prettifiedMessage.replace(/\n/g, ""));
};

// src/api/logs.ts
async function logs(options) {
  const logFileExists = existsSync(logPath);
  if (!logFileExists) {
    logger.info("Log file does not exist. Nothing to show logs for.");
    return {
      result: void 0
    };
  }
  if (options.follow) {
    const logsData = readFileSync(logPath, "utf8");
    const logsLines = logsData.split("\n");
    for (const line of logsLines.slice(-10)) {
      const isBreak = line === "";
      if (!isBreak) {
        prettyLog(line);
      }
    }
    let lastSize = 0;
    watchFile(logPath, (curr, prev) => {
      if (curr.size > prev.size) {
        const stream = createReadStream(logPath, {
          start: lastSize,
          end: curr.size
        });
        const rl = createInterface({ input: stream });
        rl.on("line", (line) => {
          prettyLog(line);
        });
        rl.on("close", () => {
          lastSize = curr.size;
        });
      }
    });
  } else {
    const logsData = readFileSync(logPath, "utf8");
    const logsLines = logsData.split("\n");
    for (const line of logsLines) {
      const isBreak = line === "";
      if (!isBreak) {
        prettyLog(line);
      }
    }
  }
  return {
    result: void 0
  };
}

// src/commands/logs.ts
function addLogsCommand(program2) {
  program2.command("logs").addOption(new Option("-f, --follow", "Follow logs").default(false)).action(handle(logs));
}

// src/cli.ts
process.env.LOG_FILE = logPath;
var program = new Command();
program.name("@opentrader/cli").description("CLI for OpenTrader").version(package_default.version, "-v, --version", "Output the OpenTrader version");
setPasswordCommand(program);
addExchangeAccountCommand(program);
updateExchangeAccountCommand(program);
addBacktestCommand(program);
addGridLinesCommand(program);
addTradeCommand(program);
addStopCommand(program);
addUpCommand(program);
addDownCommand(program);
addStatusCommand(program);
dbCommands(program);
addLogsCommand(program);
program.parse();
