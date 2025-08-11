import { getSortedPostsData, PostData } from '@/lib/posts';
import { Box, Container, Heading, Link, Text, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading as="h1" size="2xl" mb={2}>
            Блог
          </Heading>
          <Text fontSize="lg" color="gray.500">
            Мысли, заметки и статьи о веб-разработке.
          </Text>
        </Box>

        <VStack spacing={6} align="stretch">
          {allPostsData.map(({ id, date, title }: PostData) => (
            <Box key={id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
              <Heading as="h2" size="md">
                <Link as={NextLink} href={`/${id}`}>
                  {title}
                </Link>
              </Heading>
              <Text mt={2} color="gray.500">
                {new Date(date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
}
