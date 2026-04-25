import { AppShell, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import type { AppLayoutProps } from '@/types';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: AppLayoutProps) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <AppShell
            layout="alt"
            header={{ height: 64 }}
            navbar={{
                width: 280,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <AppSidebarHeader breadcrumbs={breadcrumbs} toggle={toggle} opened={opened} />
            </AppShell.Header>

            <AppShell.Navbar>
                <AppSidebar toggle={toggle} opened={opened} />
            </AppShell.Navbar>

            <AppShell.Main>
                <Box maw={1200} mx="auto">
                    {children}
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}
