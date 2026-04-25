import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { useEffect } from 'react';

export type ResolvedAppearance = 'light' | 'dark';
export type Appearance = ResolvedAppearance | 'system';

export type UseAppearanceReturn = {
    readonly appearance: Appearance;
    readonly resolvedAppearance: ResolvedAppearance;
    readonly updateAppearance: (mode: Appearance) => void;
};

export function useAppearance(): UseAppearanceReturn {
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    const appearance: Appearance = colorScheme === 'auto' ? 'system' : (colorScheme as Appearance);
    const resolvedAppearance: ResolvedAppearance = computedColorScheme;

    const updateAppearance = (mode: Appearance): void => {
        const mantineMode = mode === 'system' ? 'auto' : mode;
        setColorScheme(mantineMode);
    };

    useEffect(() => {
        document.documentElement.classList.toggle('dark', resolvedAppearance === 'dark');
        document.documentElement.style.colorScheme = resolvedAppearance;
    }, [resolvedAppearance]);

    return { appearance, resolvedAppearance, updateAppearance } as const;
}
