import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputFile = process.argv[2];
if (!inputFile) {
    console.error("❌ Ошибка: укажите путь к изображению!");
    console.error("Пример: node showcase-submission/convert.mjs /путь/к/скриншоту.png");
    process.exit(1);
}

if (!fs.existsSync(inputFile)) {
    console.error(`❌ Ошибка: файл '${inputFile}' не найден!`);
    process.exit(1);
}

const outputFile = path.join(__dirname, 'avpdev.com.webp');

async function processImage() {
    try {
        const image = sharp(inputFile);
        const metadata = await image.metadata();

        console.log(`📷 Исходный файл: ${inputFile}`);
        console.log(`📐 Исходный размер: ${metadata.width}x${metadata.height} (${metadata.format})`);

        // Требование Astro Showcase: строго 1600x900 (16:9), WebP
        await image
            .resize(1600, 900, {
                fit: 'cover',
                position: 'top' // сохраняем шапку и верхнюю часть сайта без обрезки сверху
            })
            .webp({ quality: 85 })
            .toFile(outputFile);

        const outMeta = await sharp(outputFile).metadata();
        const stats = fs.statSync(outputFile);
        const sizeKb = (stats.size / 1024).toFixed(1);

        console.log(`\n✅ Готово! Файл успешно создан:`);
        console.log(`📁 Путь: ${outputFile}`);
        console.log(`📐 Финальный размер: ${outMeta.width}x${outMeta.height} (${outMeta.format})`);
        console.log(`⚖️  Вес: ${sizeKb} KB (оптимально для Astro Showcase)`);
    } catch (err) {
        console.error("❌ Ошибка обработки изображения:", err);
        process.exit(1);
    }
}

processImage();
