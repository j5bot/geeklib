export type ItemDescriptor = {
    name: string;
    displayValue: string;
};

export type ImageSet = Record<
    'src' | 'src@2x',
    string
>;
export type ImageSets = Record<
    'mediacard' | 'mediacard100' | 'square100',
    ImageSet
>;

export type LinkedImage = {
    alt: string;
    blocks_ads: boolean;
    href: string;
    image: ImageSet;
};

export type Link = {
    rel: string;
    uri: string;
};

export type Stats = {
    average: number;
    rank: number;
};
