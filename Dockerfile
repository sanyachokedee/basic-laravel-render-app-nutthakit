# PHP Image
FROM php:8.2-fpm

# ติดตั้ง Extension ที่จำเป็น
RUN apt-get update && apt-get install -y \
    libzip-dev unzip libpq-dev git curl \
    && docker-php-ext-install pdo_mysql pdo_pgsql pgsql zip

# ติดตั้ง Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ติดตั้ง Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

# กำหนด Working Directory
WORKDIR /var/www/html

# Copy source ก่อน build
COPY . .

# PHP Dependencies
RUN composer install --no-dev --optimize-autoloader

# Node Modules
RUN npm install

# กำหนด Environment Variables
ENV NODE_ENV=production

# Build Assets และสร้าง manifest.json
RUN npm run build

# สำคัญ: Confirm ว่ามีไฟล์ manifest จริง
RUN ls -la public/build

# ตั้ง Permission
RUN chmod -R 775 storage bootstrap/cache

# เปิด Port
EXPOSE 10000

# Start Laravel Server
CMD php artisan config:clear \
 && php artisan route:clear \
 && php artisan view:clear \
 && php artisan config:cache \
 && php artisan migrate --force \
 && php artisan serve --host=0.0.0.0 --port=10000