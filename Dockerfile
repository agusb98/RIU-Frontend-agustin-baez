FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Debug: mostrar qué se generó
RUN echo "=== Contenido de dist ==="
RUN find dist/ -type f | head -20

FROM nginx:alpine

# Eliminar archivos por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar desde la carpeta browser que contiene los archivos estáticos
COPY --from=build /app/dist/RIU-Frontend-agustin-baez/browser/ /usr/share/nginx/html/

# Configuración de nginx para SPA
RUN echo 'server { \
    listen 80; \
    server_name localhost; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
