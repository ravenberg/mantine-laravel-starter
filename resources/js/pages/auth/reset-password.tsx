import { Form, Head } from '@inertiajs/react';
import { TextInput, PasswordInput, Button, Stack } from '@mantine/core';
import { update } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <>
            <Head title="Reset password" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
            >
                {({ processing, errors }) => (
                    <Stack gap="md">
                        <TextInput
                            label="Email"
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            readOnly
                            error={errors.email}
                        />

                        <PasswordInput
                            label="Password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            autoFocus
                            placeholder="Password"
                            error={errors.password}
                        />

                        <PasswordInput
                            label="Confirm password"
                            id="password_confirmation"
                            name="password_confirmation"
                            autoComplete="new-password"
                            placeholder="Confirm password"
                            error={errors.password_confirmation}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            loading={processing}
                            data-test="reset-password-button"
                            mt="md"
                        >
                            Reset password
                        </Button>
                    </Stack>
                )}
            </Form>
        </>
    );
}

ResetPassword.layout = {
    title: 'Reset password',
    description: 'Please enter your new password below',
};
