#### BASE
FROM node:lts-alpine3.17 AS base

ENV MOON_TOOLCHAIN_FORCE_GLOBALS=true

WORKDIR /app

# Install moon binary
RUN npm install -g @moonrepo/cli@1.37.2
RUN npm install -g pnpm

#### SKELETON
FROM base AS skeleton

# Copy entire repository and scaffold
COPY . .

# Copy the minimum of files necessary for installing dependencies
RUN moon docker scaffold cli

#### BUILD
FROM base AS build

# Copy toolchain
COPY --from=skeleton /root/.proto /root/.proto

# Copy workspace skeleton
COPY --from=skeleton /app/.moon/docker/workspace .
# Copy Prisma schema
COPY --from=skeleton /app/.moon/docker/sources/packages/prisma/src/schema.prisma ./packages/prisma/src/schema.prisma

# Install toolchain and dependencies
RUN moon docker setup

# Copy source files
COPY --from=skeleton /app/.moon/docker/sources .

# Build something (optional)
RUN moon run cli:build

# Remove unneeded files and folders
RUN moon docker prune

##### RUNNER
FROM node:lts-alpine3.17 AS runner
WORKDIR /app

COPY --from=build /app/app ./app
COPY --from=build /app/node_modules ./node_modules

# Copy Prisma schema, migrations, and seed script
COPY --from=build /app/packages/prisma/src/schema.prisma ./packages/prisma/src/schema.prisma
COPY --from=build /app/packages/prisma/src/migrations ./packages/prisma/src/migrations
COPY --from=build /app/packages/prisma/seed.mjs ./packages/prisma/seed.mjs

# Copy the entrypoint script to run migrations before starting the app
COPY bin/docker-entry.sh /app/bin/docker-entry.sh
ENTRYPOINT ["/app/bin/docker-entry.sh"]

WORKDIR /app/app
CMD node dist/standalone.mjs
