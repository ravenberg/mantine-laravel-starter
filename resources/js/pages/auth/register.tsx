import { Form, Head, Link } from '@inertiajs/react';
import { TextInput, PasswordInput, Button, Stack, Text, Anchor } from '@mantine/core';
import { login } from '@/routes';
import { store } from '@/routes/register';

export default function Register() {
    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <Stack gap="xl">
                        <Stack gap="md">
                            <TextInput
                                label="Name"
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                name="name"
                                placeholder="Full name"
                                error={errors.name}
                            />

                            <TextInput
                                label="Email address"
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                name="email"
                                placeholder="email@example.com"
                                error={errors.email}
                            />

                            <PasswordInput
                                label="Password"
                                id="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                name="password"
                                placeholder="Password"
                                error={errors.password}
                            />

                            <PasswordInput
                                label="Confirm password"
                                id="password_confirmation"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                name="password_confirmation"
                                placeholder="Confirm password"
                                error={errors.password_confirmation}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                tabIndex={5}
                                loading={processing}
                                data-test="register-user-button"
                                mt="md"
                            >
                                Create account
                            </Button>
                        </Stack>

                        <Text ta="center" size="sm" c="dimmed">
                            Already have an account?{' '}
                            <Anchor component={Link} href={login()} tabIndex={6}>
                                Log in
                            </Anchor>
                        </Text>
                    </Stack>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
