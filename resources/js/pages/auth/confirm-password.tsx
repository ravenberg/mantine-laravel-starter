import { Form, Head } from '@inertiajs/react';
import { PasswordInput, Button, Stack } from '@mantine/core';
import { store } from '@/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <Stack gap="md">
                        <PasswordInput
                            label="Password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="current-password"
                            autoFocus
                            error={errors.password}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            loading={processing}
                            data-test="confirm-password-button"
                            mt="md"
                        >
                            Confirm password
                        </Button>
                    </Stack>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Confirm your password',
    description:
        'This is a secure area of the application. Please confirm your password before continuing.',
};
