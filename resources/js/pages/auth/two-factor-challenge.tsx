import { Form, Head, setLayoutProps } from '@inertiajs/react';
import { Button, Stack, Text, Anchor, TextInput, PinInput, Center } from '@mantine/core';
import { useMemo, useState } from 'react';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery code',
                description:
                    'Please confirm access to your account by entering one of your emergency recovery codes.',
                toggleText: 'login using an authentication code',
            };
        }

        return {
            title: 'Authentication code',
            description:
                'Enter the authentication code provided by your authenticator application.',
            toggleText: 'login using a recovery code',
        };
    }, [showRecoveryInput]);

    setLayoutProps({
        title: authConfigContent.title,
        description: authConfigContent.description,
    });

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <>
            <Head title="Two-factor authentication" />

            <Form
                {...store.form()}
                resetOnError
                resetOnSuccess={!showRecoveryInput}
            >
                {({ errors, processing, clearErrors }) => (
                    <Stack gap="xl">
                        {showRecoveryInput ? (
                            <TextInput
                                name="recovery_code"
                                label="Recovery code"
                                placeholder="Enter recovery code"
                                autoFocus={showRecoveryInput}
                                required
                                error={errors.recovery_code}
                            />
                        ) : (
                            <Stack gap="xs" align="center">
                                <Center>
                                    <PinInput
                                        length={OTP_MAX_LENGTH}
                                        value={code}
                                        onChange={(value) => setCode(value)}
                                        disabled={processing}
                                        type="number"
                                        size="lg"
                                        autoFocus
                                        error={!!errors.code}
                                    />
                                </Center>
                                {errors.code && <Text size="xs" c="red">{errors.code}</Text>}
                            </Stack>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            loading={processing}
                        >
                            Continue
                        </Button>

                        <Text ta="center" size="sm" c="dimmed">
                            or you can{' '}
                            <Anchor
                                component="button"
                                type="button"
                                size="sm"
                                onClick={() => toggleRecoveryMode(clearErrors)}
                            >
                                {authConfigContent.toggleText}
                            </Anchor>
                        </Text>
                    </Stack>
                )}
            </Form>
        </>
    );
}
