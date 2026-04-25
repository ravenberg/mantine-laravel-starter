import { Form } from '@inertiajs/react';
import { Button, Stack, Text, Modal, Paper, Group, PasswordInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRef } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import Heading from '@/components/heading';

export default function DeleteUser() {
    const [opened, { open, close }] = useDisclosure(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    return (
        <Stack gap="xl">
            <Heading
                variant="small"
                title="Delete account"
                description="Delete your account and all of its resources"
            />

            <Paper withBorder p="md" radius="md" style={{ borderColor: 'var(--mantine-color-red-2)', backgroundColor: 'rgba(255, 0, 0, 0.05)' }}>
                <Stack gap="xs" mb="md">
                    <Text fw={500} c="red.9">Warning</Text>
                    <Text size="sm" c="red.8">
                        Please proceed with caution, this cannot be undone.
                    </Text>
                </Stack>

                <Button
                    color="red"
                    onClick={open}
                    data-test="delete-user-button"
                >
                    Delete account
                </Button>
            </Paper>

            <Modal opened={opened} onClose={close} title="Are you sure you want to delete your account?">
                <Stack gap="md">
                    <Text size="sm" c="dimmed">
                        Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.
                    </Text>

                    <Form
                        {...ProfileController.destroy.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        onError={() => passwordInput.current?.focus()}
                        resetOnSuccess
                    >
                        {({ resetAndClearErrors, processing, errors }) => (
                            <Stack gap="md">
                                <PasswordInput
                                    label="Password"
                                    id="password"
                                    name="password"
                                    ref={passwordInput}
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    error={errors.password}
                                />

                                <Group justify="flex-end" mt="xl">
                                    <Button
                                        variant="subtle"
                                        color="gray"
                                        onClick={() => {
                                            resetAndClearErrors();
                                            close();
                                        }}
                                    >
                                        Cancel
                                    </Button>

                                    <Button
                                        color="red"
                                        type="submit"
                                        loading={processing}
                                        data-test="confirm-delete-user-button"
                                    >
                                        Delete account
                                    </Button>
                                </Group>
                            </Stack>
                        )}
                    </Form>
                </Stack>
            </Modal>
        </Stack>
    );
}
