#!/usr/bin/env bash
# Скрипт для подготовки скриншота для Astro Showcase
# Требования Astro: WebP, ширина 1600px, имя avpdev.com.webp

set -euo pipefail

INPUT_IMAGE="${1:-}"

if [ -z "$INPUT_IMAGE" ]; then
    echo "Использование: ./showcase-submission/convert-screenshot.sh <путь-к-скриншоту.(png|jpg|jpeg|webp)>"
    exit 1
fi

if [ ! -f "$INPUT_IMAGE" ]; then
    echo "Ошибка: Файл '$INPUT_IMAGE' не найден!"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUTPUT_FILE="$SCRIPT_DIR/avpdev.com.webp"

echo "Конвертация и оптимизация скриншота..."
cwebp -resize 1600 0 -q 85 "$INPUT_IMAGE" -o "$OUTPUT_FILE"

echo "Готово! Создан файл: $OUTPUT_FILE"
ls -lh "$OUTPUT_FILE"
