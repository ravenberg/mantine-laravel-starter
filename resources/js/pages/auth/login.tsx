import { Form, Head, Link } from '@inertiajs/react';
import { TextInput, PasswordInput, Checkbox, Button, Stack, Text, Group, Anchor } from '@mantine/core';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <>
            <Head title="Log in" />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
            >
                {({ processing, errors }) => (
                    <Stack gap="xl">
                        <Stack gap="md">
                            <TextInput
                                label="Email address"
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="email@example.com"
                                error={errors.email}
                            />

                            <Stack gap={4}>
                                <Group justify="space-between">
                                    <Text size="sm" fw={500}>Password</Text>
                                    {canResetPassword && (
                                        <Anchor
                                            component={Link}
                                            href={request()}
                                            size="xs"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </Anchor>
                                    )}
                                </Group>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    error={errors.password}
                                />
                            </Stack>

                            <Checkbox
                                label="Remember me"
                                id="remember"
                                name="remember"
                                tabIndex={3}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                tabIndex={4}
                                loading={processing}
                                data-test="login-button"
                            >
                                Log in
                            </Button>
                        </Stack>

                        {canRegister && (
                            <Text ta="center" size="sm" c="dimmed">
                                Don't have an account?{' '}
                                <Anchor component={Link} href={register()} tabIndex={5}>
                                    Sign up
                                </Anchor>
                            </Text>
                        )}

                        {status && (
                            <Text ta="center" size="sm" c="green" fw={500}>
                                {status}
                            </Text>
                        )}
                    </Stack>
                )}
            </Form>
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
