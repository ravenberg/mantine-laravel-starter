import { Head, Link, usePage } from '@inertiajs/react';
import { Container, Stack, Group, Button, Title, Text, Box, List, ThemeIcon, Paper, SimpleGrid, Anchor, Center } from '@mantine/core';
import { ExternalLink, Check } from 'lucide-react';
import { dashboard, login, register } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome" />

            <Box bg="var(--mantine-color-body)" style={{ minHeight: '100vh' }}>
                <Container size="lg" py="xl">
                    <header>
                        <Group justify="flex-end" mb={60}>
                            {auth.user ? (
                                <Button component={Link} href={dashboard()} variant="outline" color="gray" radius="md">
                                    Dashboard
                                </Button>
                            ) : (
                                <>
                                    <Button component={Link} href={login()} variant="subtle" color="gray" radius="md">
                                        Log in
                                    </Button>
                                    {canRegister && (
                                        <Button component={Link} href={register()} variant="outline" color="gray" radius="md">
                                            Register
                                        </Button>
                                    )}
                                </>
                            )}
                        </Group>
                    </header>

                    <main>
                        <Paper shadow="sm" radius="lg" withBorder style={{ overflow: 'hidden' }}>
                            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing={0}>
                                <Box p={{ base: 'xl', lg: 80 }}>
                                    <Stack gap="xl">
                                        <Box>
                                            <Title order={1} size="h3" mb="xs" fw={500}>Let's get started</Title>
                                            <Text c="dimmed" size="sm">
                                                Laravel has an incredibly rich ecosystem. We suggest starting with the following.
                                            </Text>
                                        </Box>

                                        <List
                                            spacing="sm"
                                            size="sm"
                                            icon={
                                                <ThemeIcon color="gray" size={20} radius="xl" variant="light">
                                                    <Check size={12} />
                                                </ThemeIcon>
                                            }
                                        >
                                            <List.Item>
                                                Read the <Anchor href="https://laravel.com/docs" target="_blank" fw={500} c="orange.9">Documentation</Anchor>
                                            </List.Item>
                                            <List.Item>
                                                Watch video tutorials at <Anchor href="https://laracasts.com" target="_blank" fw={500} c="orange.9">Laracasts</Anchor>
                                            </List.Item>
                                        </List>

                                        <Box>
                                            <Button
                                                component="a"
                                                href="https://cloud.laravel.com"
                                                target="_blank"
                                                variant="filled"
                                                color="dark"
                                                radius="md"
                                                rightSection={<ExternalLink size={14} />}
                                            >
                                                Deploy now
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Box>

                                <Center bg="orange.0" p="xl" style={{ minHeight: 300 }}>
                                    <Stack align="center" gap="xs">
                                        <Title order={2} c="orange.9" size={48} fw={700}>Laravel</Title>
                                        <Text c="orange.8" fw={500}>Starter Kit</Text>
                                    </Stack>
                                </Center>
                            </SimpleGrid>
                        </Paper>
                    </main>
                </Container>
            </Box>
        </>
    );
}
