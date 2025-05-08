FROM node:18 as build

WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files (including .env)
COPY . .

# Override .env values with build args (ưu tiên cao nhất)
ARG REACT_APP_API_URL
RUN echo "REACT_APP_API_URL=${REACT_APP_API_URL}" > .env.production && \
    echo "REACT_APP_API_URL=${REACT_APP_API_URL}" > .env

# Build ứng dụng
RUN npm run build

FROM nginx:alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]