import { Group, Box, Text } from '@mantine/core';
import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <Group gap="sm">
            <Box
                w={32}
                h={32}
                style={{
                    backgroundColor: 'var(--mantine-primary-color-filled)',
                    color: 'var(--mantine-color-white)',
                    borderRadius: 'var(--mantine-radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <AppLogoIcon style={{ width: 20, height: 20, fill: 'currentColor' }} />
            </Box>
            <Text size="sm" fw={600}>
                Laravel Mantine Starter Kit
            </Text>
        </Group>
    );
}
