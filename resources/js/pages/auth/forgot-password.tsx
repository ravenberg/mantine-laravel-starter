import { Form, Head, Link } from '@inertiajs/react';
import { TextInput, Button, Stack, Text, Anchor } from '@mantine/core';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            <Stack gap="xl">
                {status && (
                    <Text ta="center" size="sm" c="green" fw={500}>
                        {status}
                    </Text>
                )}

                <Form {...email.form()}>
                    {({ processing, errors }) => (
                        <Stack gap="md">
                            <TextInput
                                label="Email address"
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                autoFocus
                                placeholder="email@example.com"
                                error={errors.email}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                loading={processing}
                                data-test="email-password-reset-link-button"
                            >
                                Email password reset link
                            </Button>
                        </Stack>
                    )}
                </Form>

                <Text ta="center" size="sm" c="dimmed">
                    Or, return to{' '}
                    <Anchor component={Link} href={login()}>
                        log in
                    </Anchor>
                </Text>
            </Stack>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
};
