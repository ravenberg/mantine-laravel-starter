import { Text } from '@mantine/core';
import type { HTMLAttributes } from 'react';

export default function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <Text size="xs" c="red" mt={4} {...props}>
            {message}
        </Text>
    ) : null;
}
