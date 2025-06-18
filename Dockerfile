FROM node:18-alpine

# تنظیم دایرکتوری کاری
WORKDIR /app

# کپی کردن فایل‌های پروژه
COPY . .

# نصب وابستگی‌ها و build
RUN npm install && npm run build

# نصب global Vite برای اجرا در حالت preview
RUN npm install -g vite

# پورت پیش‌فرض Vite preview
EXPOSE 2084

# اجرای برنامه در حالت production
CMD ["npm", "start"]
