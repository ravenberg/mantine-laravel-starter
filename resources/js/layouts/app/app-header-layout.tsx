import { AppShell, Container } from '@mantine/core';
import { AppHeader } from '@/components/app-header';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    return (
        <AppShell
            header={{ height: 64 }}
            padding="md"
        >
            <AppShell.Header>
                <AppHeader breadcrumbs={breadcrumbs} />
            </AppShell.Header>

            <AppShell.Main>
                <Container size="lg">
                    {children}
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
