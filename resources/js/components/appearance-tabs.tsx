import { SegmentedControl, Center, rem } from '@mantine/core';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { Appearance } from '@/hooks/use-appearance';
import { useAppearance } from '@/hooks/use-appearance';

export default function AppearanceToggleTab() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <SegmentedControl
            value={appearance}
            onChange={(value) => updateAppearance(value as Appearance)}
            data={[
                {
                    value: 'light',
                    label: (
                        <Center style={{ gap: 10 }}>
                            <Sun style={{ width: rem(16), height: rem(16) }} />
                            <span>Light</span>
                        </Center>
                    ),
                },
                {
                    value: 'dark',
                    label: (
                        <Center style={{ gap: 10 }}>
                            <Moon style={{ width: rem(16), height: rem(16) }} />
                            <span>Dark</span>
                        </Center>
                    ),
                },
                {
                    value: 'system',
                    label: (
                        <Center style={{ gap: 10 }}>
                            <Monitor style={{ width: rem(16), height: rem(16) }} />
                            <span>System</span>
                        </Center>
                    ),
                },
            ]}
        />
    );
}
