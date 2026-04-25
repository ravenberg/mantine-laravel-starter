import { createInertiaApp } from '@inertiajs/react';
import { MantineProvider, createTheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import AppLayout from '@/layouts/app-layout';
import AuthLayout from '@/layouts/auth-layout';
import SettingsLayout from '@/layouts/settings/layout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const theme = createTheme({
    // primaryColor: 'blue',
    fontFamily: 'Instrument Sans, ui-sans-serif, system-ui, sans-serif',
});

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <MantineProvider theme={theme} defaultColorScheme="auto">
                <ModalsProvider>
                    <Notifications />
                    {app}
                </ModalsProvider>
            </MantineProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

