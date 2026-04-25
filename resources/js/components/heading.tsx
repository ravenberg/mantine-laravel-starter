import { Stack, Title, Text } from '@mantine/core';

export default function Heading({
    title,
    description,
    variant = 'default',
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
}) {
    return (
        <Stack gap={0} mb={variant === 'small' ? 0 : 'xl'}>
            <Title
                order={variant === 'small' ? 3 : 2}
                size={variant === 'small' ? 'h4' : 'h3'}
                fw={variant === 'small' ? 500 : 600}
            >
                {title}
            </Title>
            {description && (
                <Text size="sm" c="dimmed">
                    {description}
                </Text>
            )}
        </Stack>
    );
}
