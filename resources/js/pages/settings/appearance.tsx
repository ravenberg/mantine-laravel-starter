import { Head } from '@inertiajs/react';
import { Stack } from '@mantine/core';
import AppearanceTabs from '@/components/appearance-tabs';
import Heading from '@/components/heading';
import { edit as editAppearance } from '@/routes/appearance';

export default function Appearance() {
    return (
        <Stack gap="xl">
            <Head title="Appearance settings" />

            <Heading
                variant="small"
                title="Appearance settings"
                description="Update your account's appearance settings"
            />
            <AppearanceTabs />
        </Stack>
    );
}

Appearance.layout = (page: React.ReactNode) => ({
    breadcrumbs: [
        {
            title: 'Appearance settings',
            href: editAppearance(),
        },
    ],
});
