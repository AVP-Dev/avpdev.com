#!/usr/bin/env bash
# Скрипт для подготовки скриншота для Astro Showcase
# Требования Astro: WebP, строго 1600x900px (16:9), имя avpdev.com.webp

set -euo pipefail

INPUT_IMAGE="${1:-}"

if [ -z "$INPUT_IMAGE" ]; then
    echo "Использование: ./showcase-submission/convert-screenshot.sh <путь-к-скриншоту.(png|jpg|jpeg|webp)>"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

node "$SCRIPT_DIR/convert.mjs" "$INPUT_IMAGE"
