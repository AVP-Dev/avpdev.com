/** @type {import('next').NextConfig} */
const nextConfig = {
    // Включаем строгий режим React для выявления потенциальных проблем
    reactStrictMode: true,
    // Настройка для вывода автономного приложения, оптимизированного для Docker
    output: 'standalone',
};

export default nextConfig;
