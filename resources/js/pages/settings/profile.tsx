import { Form, Head, Link, usePage } from '@inertiajs/react';
import { TextInput, Button, Stack, Text, Anchor, Group, Box } from '@mantine/core';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import { edit } from '@/routes/profile';
import { send } from '@/routes/verification';

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Profile settings" />

            <Stack gap="xl">
                <Heading
                    variant="small"
                    title="Profile information"
                    description="Update your name and email address"
                />

                <Form
                    {...ProfileController.update.form()}
                    options={{
                        preserveScroll: true,
                    }}
                >
                    {({ processing, errors }) => (
                        <Stack gap="md">
                            <TextInput
                                label="Name"
                                id="name"
                                name="name"
                                defaultValue={auth.user.name}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                                error={errors.name}
                            />

                            <TextInput
                                label="Email address"
                                id="email"
                                type="email"
                                name="email"
                                defaultValue={auth.user.email}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                                error={errors.email}
                            />

                            {mustVerifyEmail &&
                                auth.user.email_verified_at === null && (
                                    <Box>
                                        <Text size="sm" c="dimmed">
                                            Your email address is unverified.{' '}
                                            <Anchor
                                                component={Link}
                                                href={send()}
                                                method="post"
                                                as="button"
                                                size="sm"
                                            >
                                                Click here to resend the verification email.
                                            </Anchor>
                                        </Text>

                                        {status === 'verification-link-sent' && (
                                            <Text size="sm" c="green" mt="xs">
                                                A new verification link has been sent to your email address.
                                            </Text>
                                        )}
                                    </Box>
                                )}

                            <Group justify="flex-start">
                                <Button
                                    type="submit"
                                    loading={processing}
                                    data-test="update-profile-button"
                                >
                                    Save
                                </Button>
                            </Group>
                        </Stack>
                    )}
                </Form>

                <DeleteUser />
            </Stack>
        </>
    );
}

Profile.layout = {
    breadcrumbs: [
        {
            title: 'Profile settings',
            href: edit(),
        },
    ],
};
