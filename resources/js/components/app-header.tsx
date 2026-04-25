import { Link, usePage } from '@inertiajs/react';
import { Group, Box, Tooltip, Avatar, Menu as MantineMenu, Burger, Drawer, Stack, NavLink, ActionIcon, Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BookOpen, Folder, LayoutGrid, Search } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { UserMenuContent } from '@/components/user-menu-content';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { useInitials } from '@/hooks/use-initials';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, NavItem } from '@/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const rightNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppHeader({ breadcrumbs = [] }: Props) {
    const { auth } = usePage().props;
    const getInitials = useInitials();
    const { isCurrentUrl } = useCurrentUrl();
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <Box px="md" style={{ borderBottom: '1px solid var(--mantine-color-gray-2)' }}>
            <Group justify="space-between" h={64}>
                <Group gap="xl">
                    <Group gap="xs">
                        <Burger opened={opened} onClick={open} hiddenFrom="lg" size="sm" />
                        <Link href={dashboard()} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                            <AppLogo />
                        </Link>
                    </Group>

                    <Group gap={5} visibleFrom="lg">
                        {mainNavItems.map((item) => (
                            <Button
                                key={item.title}
                                component={Link}
                                href={item.href}
                                variant={isCurrentUrl(item.href) ? 'light' : 'subtle'}
                                color={isCurrentUrl(item.href) ? 'blue' : 'gray'}
                                leftSection={item.icon && <item.icon size={16} />}
                                size="sm"
                            >
                                {item.title}
                            </Button>
                        ))}
                    </Group>
                </Group>

                <Group gap="xs">
                    <ActionIcon variant="subtle" color="gray" size="lg">
                        <Search size={18} />
                    </ActionIcon>

                    <Group gap={5} visibleFrom="lg">
                        {rightNavItems.map((item) => (
                            <Tooltip key={item.title} label={item.title}>
                                <ActionIcon
                                    component="a"
                                    href={item.href}
                                    target="_blank"
                                    variant="subtle"
                                    color="gray"
                                    size="lg"
                                >
                                    {item.icon && <item.icon size={18} />}
                                </ActionIcon>
                            </Tooltip>
                        ))}
                    </Group>

                    <MantineMenu shadow="md" width={240} position="bottom-end">
                        <MantineMenu.Target>
                            <ActionIcon variant="subtle" color="gray" size="lg" radius="xl">
                                <Avatar src={auth.user?.avatar} size={24} radius="xl">
                                    {getInitials(auth.user?.name ?? '')}
                                </Avatar>
                            </ActionIcon>
                        </MantineMenu.Target>

                        <MantineMenu.Dropdown>
                            {auth.user && <UserMenuContent user={auth.user} />}
                        </MantineMenu.Dropdown>
                    </MantineMenu>
                </Group>
            </Group>

            {breadcrumbs.length > 1 && (
                <Box py="xs" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </Box>
            )}

            <Drawer opened={opened} onClose={close} title="Menu" size="xs">
                <Stack gap="md">
                    <Stack gap={4}>
                        <Text size="xs" fw={700} c="dimmed" tt="uppercase">Main</Text>
                        {mainNavItems.map((item) => (
                            <NavLink
                                key={item.title}
                                component={Link}
                                href={item.href}
                                label={item.title}
                                leftSection={item.icon && <item.icon size={18} />}
                                active={isCurrentUrl(item.href)}
                                onClick={close}
                            />
                        ))}
                    </Stack>

                    <Stack gap={4}>
                        <Text size="xs" fw={700} c="dimmed" tt="uppercase">Resources</Text>
                        {rightNavItems.map((item) => (
                            <NavLink
                                key={item.title}
                                component="a"
                                href={item.href}
                                label={item.title}
                                leftSection={item.icon && <item.icon size={18} />}
                                target="_blank"
                                onClick={close}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Drawer>
        </Box>
    );
}
