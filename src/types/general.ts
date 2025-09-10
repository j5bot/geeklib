export type ItemDescriptor = {
    name: string;
    displayValue: string;
};

export type Images = {
    micro: string;
    original: string;
    previewthumb: string;
    square: string;
    square200: string;
    squarefit: string;
    tallthumb: string;
    thumb: string;
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

export type SimpleLink = {
    rel: string;
    uri: string;
};

export type ItemLinkKey =
    | 'boardgamedesigner'
    | 'boardgamesolodesigner'
    | 'boardgameartist'
    | 'boardgamepublisher'
    | 'boardgamedeveloper'
    | 'boardgamegraphicdesigner'
    | 'boardgamesculptor'
    | 'boardgameeditor'
    | 'boardgamewriter'
    | 'boardgameinsertdesigner'
    | 'boardgamehonor'
    | 'boardgamecategory'
    | 'boardgamemechanic'
    | 'boardgameexpansion'
    | 'boardgameversion'
    | 'expandsboardgame'
    | 'boardgameintegration'
    | 'contains'
    | 'containedin'
    | 'language'
    | 'reimplementation'
    | 'reimplements'
    | 'boardgamefamily'
    | 'videogamebg'
    | 'boardgamesubdomain'
    | 'boardgameaccessory'
    | 'cardset';

export type ItemLinkCounts = Record<ItemLinkKey, number>;
export type ItemLinkBase = {
    href: string;
    itemstate: 'approved' | string;
    name: string;
    objectid: string;
    objecttype: ObjectType;
    primarylink: number;
    sortindex: string;
};
export type ItemLink = ItemLinkBase & {
    canonical_href: string;
};

export type Link = ItemLinkBase & {
    canonical_link: string;
    direction: 'src' | string;
    gltstamp: string;
    linkid: string;
    linktype: ItemLinkKey;
};

export type ObjectType = ThingType | ItemLinkKey
    | 'property';

export type PromotedAd = {
    from_lowest: boolean;
    href: string;
    image: string;
    price: string;
    title: string;
};

export type Stats = {
    average: number;
    rank: number;
};

export type ThingType =
    | 'boardgame'
    | 'boardgameaccessory'
    | 'boardgameartist'
    | 'boardgamecategory'
    | 'boardgamecompilation' // no linked items index
    | 'boardgamedesigner'
    | 'boardgameexpansion'
    | 'boardgamefamily'
    | 'boardgamemechanic'
    | 'boardgamepublisher' // no linked items index
    | 'boardgameversion'
    | 'videogamebg';

export type Website = {
    url: string | false;
    title?: string;
};
