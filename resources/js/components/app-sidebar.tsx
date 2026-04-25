import { Link } from '@inertiajs/react';
import { NavLink, Stack, Group, ScrollArea, Burger } from '@mantine/core';
import { BookOpen, FolderGit2, LayoutGrid } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavUser } from '@/components/nav-user';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

interface AppSidebarProps {
    toggle?: () => void;
    opened?: boolean;
}

export function AppSidebar({ toggle, opened }: AppSidebarProps) {
    return (
        <Stack h="100%" gap="md" p="md">
            <Group p="xs" justify="space-between">
                <Link href={dashboard()} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                    <AppLogo />
                </Link>
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            </Group>

            <ScrollArea style={{ flex: 1 }}>
                <Stack gap={4}>
                    {mainNavItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.title}
                                component={Link}
                                href={item.href}
                                label={item.title}
                                leftSection={Icon ? <Icon size={18} /> : null}
                                active={window.location.pathname === item.href}
                            />
                        )
                    })}
                </Stack>
            </ScrollArea>

            <Stack gap={4}>
                {footerNavItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.title}
                            component="a"
                            href={item.href as string}
                            label={item.title}
                            leftSection={Icon ? <Icon size={18} /> : null}
                            target="_blank"
                        />
                    )
                })}
                <NavUser />
            </Stack>
        </Stack>
    );
}
