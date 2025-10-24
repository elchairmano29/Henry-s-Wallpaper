
export type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

export const ASPECT_RATIOS: { label: string; value: AspectRatio }[] = [
    { label: 'Portrait', value: '9:16' },
    { label: 'Landscape', value: '16:9' },
    { label: 'Square', value: '1:1' },
    { label: 'Classic TV', value: '4:3' },
    { label: 'Classic Photo', value: '3:4' },
];
