import { Form } from '@inertiajs/react';
import { Modal, Button, Stack, Text, Center, Box, TextInput, PinInput, Group, ActionIcon, Divider } from '@mantine/core';
import { Check, Copy, ScanLine } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import AlertError from '@/components/alert-error';
import { useAppearance } from '@/hooks/use-appearance';
import { useClipboard } from '@/hooks/use-clipboard';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { confirm } from '@/routes/two-factor';

function GridScanIcon() {
    return (
        <Center mb="md">
            <Box style={{ padding: 10, borderRadius: '50%', backgroundColor: 'var(--mantine-color-gray-1)' }}>
                <ScanLine size={32} />
            </Box>
        </Center>
    );
}

function TwoFactorSetupStep({
    qrCodeSvg,
    manualSetupKey,
    buttonText,
    onNextStep,
    errors,
}: {
    qrCodeSvg: string | null;
    manualSetupKey: string | null;
    buttonText: string;
    onNextStep: () => void;
    errors: string[];
}) {
    const { resolvedAppearance } = useAppearance();
    const [copiedText, copy] = useClipboard();
    const IconComponent = copiedText === manualSetupKey ? Check : Copy;

    return (
        <Stack gap="xl">
            {errors?.length ? (
                <AlertError errors={errors} />
            ) : (
                <>
                    <Center>
                        <Box p="md" style={{ border: '1px solid var(--mantine-color-gray-3)', borderRadius: 'var(--mantine-radius-md)' }}>
                            {qrCodeSvg ? (
                                <Box
                                    w={200}
                                    h={200}
                                    dangerouslySetInnerHTML={{ __html: qrCodeSvg }}
                                    style={{
                                        filter: resolvedAppearance === 'dark' ? 'invert(1) brightness(1.5)' : undefined,
                                    }}
                                />
                            ) : (
                                <Text size="sm">Loading QR code...</Text>
                            )}
                        </Box>
                    </Center>

                    <Button fullWidth onClick={onNextStep}>
                        {buttonText}
                    </Button>

                    <Divider label="or, enter the code manually" labelPosition="center" />

                    {manualSetupKey && (
                        <TextInput
                            readOnly
                            value={manualSetupKey}
                            rightSection={
                                <ActionIcon onClick={() => copy(manualSetupKey)} variant="subtle" color="gray">
                                    <IconComponent size={16} />
                                </ActionIcon>
                            }
                        />
                    )}
                </>
            )}
        </Stack>
    );
}

function TwoFactorVerificationStep({
    onClose,
    onBack,
}: {
    onClose: () => void;
    onBack: () => void;
}) {
    const [code, setCode] = useState<string>('');

    return (
        <Form
            {...confirm.form()}
            onSuccess={() => onClose()}
            resetOnError
            resetOnSuccess
        >
            {({ processing, errors }) => (
                <Stack gap="xl">
                    <Stack gap="xs" align="center">
                        <PinInput
                            length={OTP_MAX_LENGTH}
                            onChange={setCode}
                            disabled={processing}
                            type="number"
                            size="lg"
                            autoFocus
                            error={!!errors?.confirmTwoFactorAuthentication?.code}
                        />
                        {errors?.confirmTwoFactorAuthentication?.code && (
                            <Text size="xs" c="red">{errors.confirmTwoFactorAuthentication.code}</Text>
                        )}
                    </Stack>

                    <Group grow>
                        <Button variant="outline" color="gray" onClick={onBack} disabled={processing}>
                            Back
                        </Button>
                        <Button type="submit" loading={processing} disabled={code.length < OTP_MAX_LENGTH}>
                            Confirm
                        </Button>
                    </Group>
                </Stack>
            )}
        </Form>
    );
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
    requiresConfirmation: boolean;
    twoFactorEnabled: boolean;
    qrCodeSvg: string | null;
    manualSetupKey: string | null;
    clearSetupData: () => void;
    fetchSetupData: () => Promise<void>;
    errors: string[];
};

export default function TwoFactorSetupModal({
    isOpen,
    onClose,
    requiresConfirmation,
    twoFactorEnabled,
    qrCodeSvg,
    manualSetupKey,
    clearSetupData,
    fetchSetupData,
    errors,
}: Props) {
    const [showVerificationStep, setShowVerificationStep] = useState<boolean>(false);

    const modalConfig = useMemo(() => {
        if (twoFactorEnabled) {
            return {
                title: 'Two-factor authentication enabled',
                description: 'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
                buttonText: 'Close',
            };
        }

        if (showVerificationStep) {
            return {
                title: 'Verify authentication code',
                description: 'Enter the 6-digit code from your authenticator app',
                buttonText: 'Continue',
            };
        }

        return {
            title: 'Enable two-factor authentication',
            description: 'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
            buttonText: 'Continue',
        };
    }, [twoFactorEnabled, showVerificationStep]);

    const resetModalState = useCallback(() => {
        setShowVerificationStep(false);
        clearSetupData();
    }, [clearSetupData]);

    const handleClose = useCallback(() => {
        resetModalState();
        onClose();
    }, [onClose, resetModalState]);

    const handleModalNextStep = useCallback(() => {
        if (requiresConfirmation) {
            setShowVerificationStep(true);

            return;
        }

        handleClose();
    }, [requiresConfirmation, handleClose]);

    useEffect(() => {
        if (isOpen && !qrCodeSvg) {
            fetchSetupData();
        }
    }, [isOpen, qrCodeSvg, fetchSetupData]);

    return (
        <Modal opened={isOpen} onClose={handleClose} title={modalConfig.title} centered>
            <Stack gap="md">
                <GridScanIcon />
                <Text ta="center" size="sm" c="dimmed">
                    {modalConfig.description}
                </Text>

                {showVerificationStep ? (
                    <TwoFactorVerificationStep
                        onClose={handleClose}
                        onBack={() => setShowVerificationStep(false)}
                    />
                ) : (
                    <TwoFactorSetupStep
                        qrCodeSvg={qrCodeSvg}
                        manualSetupKey={manualSetupKey}
                        buttonText={modalConfig.buttonText}
                        onNextStep={handleModalNextStep}
                        errors={errors}
                    />
                )}
            </Stack>
        </Modal>
    );
}
