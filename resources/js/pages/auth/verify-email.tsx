import { Form, Head, Link } from '@inertiajs/react';
import { Button, Stack, Text, Anchor } from '@mantine/core';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Email verification" />

            <Stack gap="xl">
                {status === 'verification-link-sent' && (
                    <Text ta="center" size="sm" c="green" fw={500}>
                        A new verification link has been sent to the email address
                        you provided during registration.
                    </Text>
                )}

                <Form {...send.form()}>
                    {({ processing }) => (
                        <Stack gap="md" align="center">
                            <Button type="submit" loading={processing} variant="light">
                                Resend verification email
                            </Button>

                            <Anchor
                                component={Link}
                                href={logout()}
                                method="post"
                                as="button"
                                size="sm"
                                c="dimmed"
                            >
                                Log out
                            </Anchor>
                        </Stack>
                    )}
                </Form>
            </Stack>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Verify email',
    description:
        'Please verify your email address by clicking on the link we just emailed to you.',
};
