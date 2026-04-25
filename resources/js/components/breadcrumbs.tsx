import { Link } from '@inertiajs/react';
import { Breadcrumbs as MantineBreadcrumbs, Anchor, Text } from '@mantine/core';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbItemType[];
}) {
    if (breadcrumbs.length === 0) {
        return null;
    }

    const items = breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        if (isLast) {
            return (
                <Text key={index} size="sm" fw={500}>
                    {item.title}
                </Text>
            );
        }

        return (
            <Anchor component={Link} href={item.href} key={index} size="sm">
                {item.title}
            </Anchor>
        );
    });

    return <MantineBreadcrumbs>{items}</MantineBreadcrumbs>;
}
