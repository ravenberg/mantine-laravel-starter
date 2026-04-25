import { Link } from '@inertiajs/react';
import { Stack, Grid, NavLink, Divider, Box, Container } from '@mantine/core';
import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
    },
    {
        title: 'Security',
        href: editSecurity(),
    },
    {
        title: 'Appearance',
        href: editAppearance(),
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <Container size="lg" py="xl">
            <Heading
                title="Settings"
                description="Manage your profile and account settings"
            />

            <Grid gap="xl">
                <Grid.Col span={{ base: 12, md: 3 }}>
                    <Stack gap={4}>
                        {sidebarNavItems.map((item) => (
                            <NavLink
                                key={item.title}
                                component={Link}
                                href={item.href}
                                label={item.title}
                                active={isCurrentOrParentUrl(item.href)}
                            />
                        ))}
                    </Stack>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 9 }}>
                    <Divider mb="xl" hiddenFrom="md" />
                    <Box maw={600}>
                         {children}
                    </Box>
                </Grid.Col>
            </Grid>
        </Container>
    );
}
