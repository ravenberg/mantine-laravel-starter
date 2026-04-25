import { Alert, Text } from '@mantine/core';
import { AlertCircleIcon } from 'lucide-react';

export default function AlertError({
    errors,
    title,
}: {
    errors: string[];
    title?: string;
}) {
    if (errors.length === 0) {
        return null;
    }

    return (
        <Alert
            variant="filled"
            color="red"
            title={title || 'Something went wrong.'}
            icon={<AlertCircleIcon size={16} />}
        >
            <ul style={{ margin: 0, paddingLeft: 20 }}>
                {Array.from(new Set(errors)).map((error, index) => (
                    <li key={index}>
                        <Text size="sm">{error}</Text>
                    </li>
                ))}
            </ul>
        </Alert>
    );
}
