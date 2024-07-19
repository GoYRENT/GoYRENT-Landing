# Base stage with a specific Node.js version
FROM node:21-alpine AS base

# Install dependencies only when needed
FROM base AS deps

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install jq for extracting pnpm version and install pnpm
# RUN apk add --no-cache jq && \
#     export PNPM_VERSION=$(jq -r '.engines.pnpm' < package.json) && \
#     yarn global add pnpm@$PNPM_VERSION && \
#     pnpm install --frozen-lockfile --prefer-offline

RUN apk add --no-cache jq
# Get PNPM version from package.json
RUN export PNPM_VERSION=$(cat package.json | jq '.engines.pnpm' | sed -E 's/[^0-9.]//g')
RUN yarn global add pnpm@$PNPM_VERSION
RUN pnpm i --frozen-lockfile --prefer-offline

# Rebuild the source code only when needed
FROM base AS builder

# Set the working directory
WORKDIR /app

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source code
COPY . .


ARG NUXT_UI_PRO_LICENSE
ENV NUXT_UI_PRO_LICENSE=${NUXT_UI_PRO_LICENSE}
ARG NUXT_PUBLIC_SITE_URL
ENV NUXT_PUBLIC_SITE_URL=${NUXT_PUBLIC_SITE_URL}

# Get PNPM version from package.json
RUN export PNPM_VERSION=$(cat package.json | jq '.engines.pnpm' | sed -E 's/[^0-9.]//g')
RUN yarn global add pnpm@$PNPM_VERSION

# Build the application
RUN pnpm build

# Prune development dependencies
RUN pnpm prune --prod

# Production image, copy all the necessary files and run the app
FROM base AS runner

# Set the working directory
WORKDIR /app

# Copy the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.output ./.output

# Expose port 3000
EXPOSE 3000

# Set NuxtJS environment variables
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Start the NuxtJS application
CMD ["node", ".output/server/index.mjs"]
