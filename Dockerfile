# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION} as build

LABEL fly_launch_runtime="STELLA"

# NestJS app lives here
WORKDIR /app
# Install node modules
COPY package.json ./
RUN yarn
# Copy application code
COPY . .
# Specify the variable you need
ARG NODE_ENV
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG TOKEN
ARG NEXT_PUBLIC_SENTRY_DSN
ARG GRAPHQL_CONTENT_URL
ARG GRAPHQL_PROJECT_URL
ARG GRAPHQL_SHOP_URL
ARG MONGODB_URI
ARG ACCELERATE_URI
ARG SQL_URL
ARG REDIS_URL
ARG AUTH_FB_APP_ID
ARG AUTH_FB_APP_SECRET
ARG AUTH_GITHUB_CLIENT_ID
ARG AUTH_GITHUB_CLIENT_SECRET
ARG AUTH_GOOGLE_CLIENT_ID
ARG AUTH_GOOGLE_CLIENT_SECRET
ARG AUTH_DISCORD_CLIENT_ID
ARG AUTH_DISCORD_CLIENT_SECRET
ARG S3_ORIGINS
ARG S3_UPLOAD_ENDPOINT
ARG S3_UPLOAD_KEY
ARG S3_UPLOAD_SECRET
ARG S3_UPLOAD_REGION
ARG S3_UPLOAD_BUCKET
ARG EMAIL_HOST
ARG EMAIL_PORT
ARG EMAIL_SECURE
ARG EMAIL_USER
ARG EMAIL_PASS
ARG EMAIL_FROM
ARG STRIPE_SECRET_KEY
ARG STRIPE_WEBHOOK_SECRET
ARG STRIPE_DONATE_ID
ARG STRIPE_METADATA_KEY
ARG NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_GTM
ARG NEXT_PUBLIC_S3_DOWNLOAD_ENDPOINT
ARG NEXT_PUBLIC_S3_UPLOAD_ENDPOINT
# Generate prisma schema
RUN yarn db
# Build application
RUN yarn build

FROM node:${NODE_VERSION}-slim
# NestJS app lives here
WORKDIR /app
# Copy application code
COPY --chown=node:node --from=build /app/.next ./.next
COPY --chown=node:node --from=build /app/public ./public
COPY --chown=node:node --from=build /app/package.json .
COPY --chown=node:node --from=build /app/yarn.lock .
RUN yarn
COPY --chown=node:node --from=build /app/node_modules/.prisma/client  ./node_modules/.prisma/client
# Set production environment
ENV NODE_ENV=production
# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD ["yarn","start"]