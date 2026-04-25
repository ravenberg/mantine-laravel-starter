import { Head } from '@inertiajs/react';
import { SimpleGrid, Paper, Box } from '@mantine/core';
import { PlaceholderPattern } from '@/components/placeholder-pattern';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <Box p="md">
                <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md" mb="md">
                    <Paper withBorder radius="lg" style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                        <PlaceholderPattern style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', stroke: 'var(--mantine-color-gray-3)' }} />
                    </Paper>
                    <Paper withBorder radius="lg" style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                        <PlaceholderPattern style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', stroke: 'var(--mantine-color-gray-3)' }} />
                    </Paper>
                    <Paper withBorder radius="lg" style={{ aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}>
                        <PlaceholderPattern style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', stroke: 'var(--mantine-color-gray-3)' }} />
                    </Paper>
                </SimpleGrid>
                <Paper withBorder radius="lg" style={{ minHeight: '60vh', overflow: 'hidden', position: 'relative' }}>
                    <PlaceholderPattern style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', stroke: 'var(--mantine-color-gray-3)' }} />
                </Paper>
            </Box>
        </>
    );
}

Dashboard.layout = () => ({
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
});
