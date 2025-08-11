import { getPostData } from '@/lib/posts';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Компонент для стилизации Markdown контента с помощью Chakra UI
const ChakraMarkdown = ({ content }: { content: string }) => {
  return (
    <Box className="markdown-content">
      <style>
        {`
          .markdown-content h1, .markdown-content h2, .markdown-content h3 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; }
          .markdown-content h1 { font-size: 2.25rem; }
          .markdown-content h2 { font-size: 1.875rem; }
          .markdown-content h3 { font-size: 1.5rem; }
          .markdown-content p { margin-bottom: 16px; line-height: 1.7; }
          .markdown-content a { color: #3182ce; text-decoration: underline; }
          .markdown-content ul, .markdown-content ol { margin-left: 20px; margin-bottom: 16px; }
          .markdown-content li { margin-bottom: 8px; }
          .markdown-content pre { background-color: #f6f8fa; padding: 16px; border-radius: 6px; margin-bottom: 16px; overflow-x: auto; }
          .markdown-content code { font-family: monospace; }
          .markdown-content blockquote { border-left: 4px solid #e2e8f0; padding-left: 16px; color: #718096; margin-left: 0; margin-bottom: 16px; }
        `}
      </style>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </Box>
  );
};


export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug);

  return (
    <Container maxW="container.md" py={10}>
      <article>
        <Heading as="h1" size="2xl" mb={2}>
          {post.title}
        </Heading>
        <Text color="gray.500" mb={8}>
          Опубликовано: {new Date(post.date).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <ChakraMarkdown content={post.content} />
      </article>
    </Container>
  );
}
