import { useId } from 'react';

interface PlaceholderPatternProps {
    className?: string;
    style?: React.CSSProperties;
}

export function PlaceholderPattern({ className, style }: PlaceholderPatternProps) {
    const patternId = useId();

    return (
        <svg className={className} style={{ ...style }} fill="none">
            <defs>
                <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M0 20L20 0M-1 1L1 -1M19 21L21 19" strokeWidth="1" />
                </pattern>
            </defs>
            <rect stroke="none" fill={`url(#${patternId})`} width="100%" height="100%"></rect>
        </svg>
    );
}
