import { Link } from '@inertiajs/react';
import { Container, Stack, Center, Title, Text, Box } from '@mantine/core';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <Center style={{ minHeight: '100vh' }} bg="var(--mantine-color-body)" p="md">
            <Container size="xs" w="100%" p={0}>
                <Stack gap="xl">
                    <Stack gap="md" align="center">
                        <Link
                            href={home()}
                            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            <Box w={36} h={36}>
                                <AppLogoIcon style={{ width: '100%', height: '100%' }} />
                            </Box>
                        </Link>

                        <Stack gap={4} align="center">
                            <Title order={2} size="h3" fw={500}>{title}</Title>
                            <Text size="sm" c="dimmed" ta="center">
                                {description}
                            </Text>
                        </Stack>
                    </Stack>
                    {children}
                </Stack>
            </Container>
        </Center>
    );
}
