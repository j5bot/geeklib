import { Images, Link, ThingType } from '../types';
import { GeekItemFunctionParameters } from '../geekitem/types';
import { VersionItemBase } from '../geekitem/types';

export type AccessoryLinkedItem = ThingLinkedItem;
export type ArtistLinkedItem = LinkedItemBase;
export type CategoryLinkedItem = LinkedItemBase;
export type ContainedInLinkedItem = ThingLinkedItem;
export type ContainsLinkedItem = ThingLinkedItem;
export type DesignerLinkedItem = LinkedItemBase;
export type ExpansionLinkedItem = ThingLinkedItem;
export type FamilyLinkedItem = LinkedItemBase;
export type IntegrationLinkedItem = ThingLinkedItem;
export type MechanicLinkedItem = LinkedItemBase;
export type PublisherLinkedItem = LinkedItemBase;
export type ReimplementationLinkedItem = ThingLinkedItem;
export type VideoGameAdaptationLinkedItem = ThingLinkedItem;

export type LinkDataIndex =
    | ThingType
    | 'boardgameintegration'
    | 'contains'
    | 'containedin'
    | 'reimplementation'
    | 'videogamebg';

export type LinkedItem =
    | AccessoryLinkedItem
    | ArtistLinkedItem
    | CategoryLinkedItem
    | ContainedInLinkedItem
    | ContainsLinkedItem
    | DesignerLinkedItem
    | ExpansionLinkedItem
    | FamilyLinkedItem
    | IntegrationLinkedItem
    | MechanicLinkedItem
    | PublisherLinkedItem
    | ReimplementationLinkedItem
    | ThingLinkedItem
    | VersionLinkedItem
    | VideoGameAdaptationLinkedItem
    | unknown;

export type LinkedItemBase = {
    href: string;
    images?: Images;
    itemstate: 'approved' | string;
    linkid: string;
    links: Link[];
    linktype: ThingType;
    name: string;
    objectid: string;
    objecttype: 'person' | 'property' | 'thing' | 'version';
    postdate: string;
    rep_imageid: string;
    subtype: ThingType;
};

export type LinkedItemsConfig = {
    filters: LinkedItemsFilter[];
    numitems: number;
};

export type LinkedItemsFilter = {
    key: string;
    options: LinkedItemsFilterOption[];
    title: string;
};

export type LinkedItemsFilterOption = {
    objectid: string;
    name: string;
};

export type LinkedItemsParameters = GeekItemFunctionParameters & {
    linkdata_index?: LinkDataIndex;
    pageid?: number;
    showcount?: number;
    sort?: string;
    subtype?: ThingType;
};

// TODO expand the any typings used here
export type LinkedItemsResponse = {
    config: LinkedItemsConfig;
    itemdata: any[];
    items: Array<LinkedItem>;
    linkdata: any[];
};

export type ThingLinkedItem = LinkedItemBase & {
    average: string;
    avgweight: string;
    numcomments: string;
    numowned: string;
    numprevowned: string;
    numtrading: string;
    numwanting: string;
    numwish: string;
    rank: string | null;
    usersrated: string;
    yearpublished: string;
};

export type VersionLinkedItem = LinkedItemBase
    & VersionItemBase
    & {
        linkedname: string;
        linkednameid: string;
        versionname: string;
        yearpublished: string;
    };
