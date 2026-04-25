import { Link, router } from '@inertiajs/react';
import { Menu, rem } from '@mantine/core';
import { LogOut, Settings } from 'lucide-react';
import { UserInfo } from '@/components/user-info';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';
import type { User } from '@/types';

type Props = {
    user: User;
};

export function UserMenuContent({ user }: Props) {
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <>
            <Menu.Label>
                <UserInfo user={user} showEmail={true} />
            </Menu.Label>
            <Menu.Divider />
            <Menu.Item
                component={Link}
                href={edit()}
                leftSection={<Settings style={{ width: rem(14), height: rem(14) }} />}
                onClick={cleanup}
            >
                Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
                component={Link}
                href={logout()}
                method="post"
                leftSection={<LogOut style={{ width: rem(14), height: rem(14) }} />}
                onClick={handleLogout}
                color="red"
            >
                Log out
            </Menu.Item>
        </>
    );
}
