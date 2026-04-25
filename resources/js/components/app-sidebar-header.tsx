import { Group, Burger } from '@mantine/core';
import { Breadcrumbs } from '@/components/breadcrumbs';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({
    breadcrumbs = [],
    toggle,
    opened,
}: {
    breadcrumbs?: BreadcrumbItemType[];
    toggle?: () => void;
    opened?: boolean;
}) {
    return (
        <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </Group>
    );
}
