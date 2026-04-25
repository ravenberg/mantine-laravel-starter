import { Form } from '@inertiajs/react';
import { Card, Text, Button, Group, Stack, Box, Collapse, Code } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Eye, EyeOff, LockKeyhole, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';
import AlertError from '@/components/alert-error';
import { regenerateRecoveryCodes } from '@/routes/two-factor';

type Props = {
    recoveryCodesList: string[];
    fetchRecoveryCodes: () => Promise<void>;
    errors: string[];
};

export default function TwoFactorRecoveryCodes({
    recoveryCodesList,
    fetchRecoveryCodes,
    errors,
}: Props) {
    const [opened, { toggle }] = useDisclosure(false);
    const canRegenerateCodes = recoveryCodesList.length > 0 && opened;

    const handleToggle = async () => {
        if (!opened && !recoveryCodesList.length) {
            await fetchRecoveryCodes();
        }

        toggle();
    };

    useEffect(() => {
        if (!recoveryCodesList.length) {
            fetchRecoveryCodes();
        }
    }, [recoveryCodesList.length, fetchRecoveryCodes]);

    const RecoveryCodeIconComponent = opened ? EyeOff : Eye;

    return (
        <Card withBorder radius="md" p="md">
            <Stack gap="xs">
                <Group gap="xs">
                    <LockKeyhole size={16} />
                    <Text fw={500}>2FA recovery codes</Text>
                </Group>
                <Text size="sm" c="dimmed">
                    Recovery codes let you regain access if you lose your 2FA
                    device. Store them in a secure password manager.
                </Text>
            </Stack>

            <Box mt="md">
                <Group justify="space-between">
                    <Button
                        variant="light"
                        onClick={handleToggle}
                        leftSection={<RecoveryCodeIconComponent size={16} />}
                    >
                        {opened ? 'Hide' : 'View'} recovery codes
                    </Button>

                    {canRegenerateCodes && (
                        <Form
                            {...regenerateRecoveryCodes.form()}
                            options={{ preserveScroll: true }}
                            onSuccess={fetchRecoveryCodes}
                        >
                            {({ processing }) => (
                                <Button
                                    variant="subtle"
                                    color="gray"
                                    type="submit"
                                    loading={processing}
                                    leftSection={<RefreshCw size={16} />}
                                >
                                    Regenerate codes
                                </Button>
                            )}
                        </Form>
                    )}
                </Group>

                <Collapse in={opened}>
                    <Box mt="md">
                        {errors?.length ? (
                            <AlertError errors={errors} />
                        ) : (
                            <Stack gap="md">
                                <Code block p="md" radius="md">
                                    {recoveryCodesList.length ? (
                                        recoveryCodesList.map((code, index) => (
                                            <div key={index}>{code}</div>
                                        ))
                                    ) : (
                                        <Text size="sm">
                                            Loading recovery codes...
                                        </Text>
                                    )}
                                </Code>

                                <Text size="xs" c="dimmed">
                                    Each recovery code can be used once to
                                    access your account and will be removed
                                    after use. If you need more, click{' '}
                                    <Text component="span" fw={700}>
                                        Regenerate codes
                                    </Text>{' '}
                                    above.
                                </Text>
                            </Stack>
                        )}
                    </Box>
                </Collapse>
            </Box>
        </Card>
    );
}
