# Use official PHP image with Apache
FROM php:8.2-cli

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    libzip-dev \
    zip \
    npm \
    && docker-php-ext-install zip pdo pdo_mysql

# Install Composer
COPY --from=composer:2.5 /usr/bin/composer /usr/bin/composer

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader
RUN npm install
RUN npm run build

# Expose the port Laravel will serve on
EXPOSE 8000

# Start Laravel development server
CMD php artisan migrate:fresh
CMD php artisan storage:link
CMD php artisan serve --host=0.0.0.0 --port=8000

