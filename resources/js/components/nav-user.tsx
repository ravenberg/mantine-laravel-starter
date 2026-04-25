import { usePage } from '@inertiajs/react';
import { Menu, UnstyledButton, Group } from '@mantine/core';
import { ChevronsUpDown } from 'lucide-react';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';

export function NavUser() {
    const { auth } = usePage().props;

    if (!auth.user) {
        return null;
    }

    return (
        <Menu shadow="md" width={240} position="bottom-end">
            <Menu.Target>
                <UnstyledButton p="xs" style={{ width: '100%', borderRadius: 'var(--mantine-radius-md)' }}>
                    <Group justify="space-between" wrap="nowrap">
                        <UserInfo user={auth.user} showEmail={false} />
                        <ChevronsUpDown size={16} />
                    </Group>
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
                <UserMenuContent user={auth.user} />
            </Menu.Dropdown>
        </Menu>
    );
}
