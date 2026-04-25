import { Avatar, Text, Stack, Group } from '@mantine/core';
import { useInitials } from '@/hooks/use-initials';
import type { User } from '@/types';

export function UserInfo({
    user,
    showEmail = true,
}: {
    user: User;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <Group gap="sm" wrap="nowrap">
            <Avatar src={user.avatar} alt={user.name} radius="xl" size={32}>
                {getInitials(user.name)}
            </Avatar>
            <Stack gap={0} style={{ flex: 1, overflow: 'hidden' }}>
                <Text size="sm" fw={500} truncate>
                    {user.name}
                </Text>
                {showEmail && (
                    <Text size="xs" c="dimmed" truncate>
                        {user.email}
                    </Text>
                )}
            </Stack>
        </Group>
    );
}
