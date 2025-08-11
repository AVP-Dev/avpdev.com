import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Путь к директории со статьями
const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
    id: string;
    title: string;
    date: string;
    [key: string]: any;
}

export interface Post extends PostData {
    content: string;
}

/**
 * Получает отсортированные данные всех статей.
 * @returns {PostData[]} Массив объектов с данными статей.
 */
export function getSortedPostsData(): PostData[] {
  // Получаем имена файлов в /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Убираем ".md" из имени файла, чтобы получить id
    const id = fileName.replace(/\.md$/, '');

    // Читаем markdown-файл как строку
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Используем gray-matter для парсинга метаданных (front-matter)
    const matterResult = matter(fileContents);

    // Собираем данные
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      ...matterResult.data,
    };
  });

  // Сортируем статьи по дате
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Получает данные конкретной статьи по ее id.
 * @param {string} id - Идентификатор статьи.
 * @returns {Promise<Post>} Объект с полными данными статьи, включая контент.
 */
export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Используем gray-matter для парсинга
  const matterResult = matter(fileContents);

  // Собираем данные
  return {
    id,
    content: matterResult.content,
    title: matterResult.data.title,
    date: matterResult.data.date,
    ...matterResult.data,
  };
}
