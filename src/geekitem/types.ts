import {
    Images,
    ImageSets,
    ItemLink,
    ItemLinkCounts,
    ItemLinkKey,
    PromotedAd,
    ThingType,
    Website
} from '../types';

export type AccessoryItem = GeekItemBase & {
    linkedname?: string;
    linkednameid?: string;
    objecttype: 'thing';
    subtype: 'boardgameaccessory';
};

export type ArtistItem = PersonItemBase & {
    subtype: 'boardgameartist';
};

export type BoardGameItem = GeekItemBase
    & StoreItemBase
    & {
        focus_videoid: string | null;
        howtoplay_videoid: string | null;
        maxplayers: string;
        maxplaytime: string;
        minage: string;
        minplayers: string;
        minplaytime: string;
        objecttype: 'thing';
        override_rankable: number;
        playthrough_videoid: string | null;
        reviews_restricted: number;
        short_description: string;
        summary_videoid: string | null;
        targetco_url: string;
        walmart_id: number | null;
    };

export type CategoryItem = GeekItemBase & {
    objecttype: 'property';
    subtype: 'boardgamecategory';
    type: 'properties';
};

export type CompilationItem = BoardGameItem & {
    subtype: 'boardgamecompilation';
};

export type DesignerItem = PersonItemBase;

export type DynamicInfo = {
    polls: Polls;
    rankinfo: RankInfo;
    relatedcounts: RelatedCounts;
    stats: Stats;
};

export type ExpansionItem = BoardGameItem & {
    subtype: 'boardgameexpansion';
};

export type FamilyItem = GeekItemBase & {
    objecttype: 'family';
    subtype: 'boardgamefamily';
    type: 'families';
};

export type GeekItem =
    | AccessoryItem
    | ArtistItem
    | BoardGameItem
    | CategoryItem
    | CompilationItem
    | DesignerItem
    | ExpansionItem
    | FamilyItem
    | MechanicItem
    | PublisherItem
    | VersionItem
    | VideoGameAdaptationItem;

export type GeekItemBase = {
    alternatename: string | null;
    alternatenames: GeekItemName[];
    alternatenamescount: number;
    canonical_link: string;
    description: string;
    href: string;
    id: string;
    imageSets: ImageSets;
    imageid: string;
    imagepagehref: string;
    images?: Images;
    imageurl?: string;
    'imageurl@2x'?: string;
    itemid?: number;
    itemstate: 'approved';
    label: string;
    labelpl: string;
    linkcounts: ItemLinkCounts;
    links: Record<ItemLinkKey, ItemLink>;
    name: string;
    objectid: number;
    objecttype: string;
    primaryname: GeekItemName;
    promoted_ad: PromotedAd | null;
    secondarynamescount: number;
    shortlabel: string;
    shortlabelpl: string;
    subtype: ThingType;
    subtypes: ThingType[];
    topimageurl: string;
    type: string;
    versioninfo: VersionInfo;
    website: Website;
    wiki: string;
    yearpublished: string;
};

export type GeekItemFunctionParameters = {
    objectid: number;
    objecttype?: 'thing' | string;
    subtype?: ThingType;
    type?: 'things' | string;
};

export type GeekItemName = {
    nameid: number;
    name: string;
    primaryname?: string;
    sortindex?: string;
    translit?: string;
};

export type ItemLinkCountsChain = {
    boardgamedesigner?: number;
    boardgameartist?: number;
};

export type ItemUser = {
    username: string;
    userid: string;
};

export type MechanicItem = GeekItemBase & {
    objecttype: 'property';
    subtype: 'boardgamemechanic';
    type: 'properties';
};

export type PersonItemBase = GeekItemBase
    & {
        linkcounts_chain: ItemLinkCountsChain;
        objecttype: 'person';
        special_user: ItemUser;
    };

export type Polls = Record<PollTypes, string | UserPlayerPoll | WeightPoll>;

export type PollTypes =
    | 'boardgameweight'
    | 'languageindependence'
    | 'playerage'
    | 'subdomain'
    | 'userplayers';

export type PublisherItem = GeekItemBase & {
    objecttype: 'company';
    subtype: 'boardgamepublisher';
    type: 'companies';
};

export type RankInfo = RankInfoValue[];

export type RankInfoValue = {
    baverage: string;
    browsesubtype: ThingType;
    prettyname: string;
    rank: string;
    rankobjectid: number;
    rankobjecttype: string;
    shortprettyname: string;
    subdomain: string | null;
    veryshortprettyname: string;
};

export type RelatedCountKeys =
    | 'news'
    | 'blogs'
    | 'weblink'
    | 'podcast';

export type RelatedCounts = Record<RelatedCountKeys, number>;

export type Stats = Record<StatsKeys, string>;

export type StatsKeys =
    | 'average'
    | 'avgweight'
    | 'baverage'
    | 'numcomments'
    | 'numfans'
    | 'numgeeklists'
    | 'numhasparts'
    | 'numowned'
    | 'numplays'
    | 'numplays_month'
    | 'numpreordered'
    | 'numprevowned'
    | 'numtrading'
    | 'numwanting'
    | 'numwantparts'
    | 'numwanttobuy'
    | 'numwanttoplay'
    | 'numweights'
    | 'numwish'
    | 'numwishlistcomments'
    | 'playmonth'
    | 'stddev'
    | 'usersrated'
    | 'views';

export type StoreItemBase = {
    bggstore_product: string | null;
};

export type UserPlayerPoll = {
    best: UserPlayerPollVote[];
    recommended: UserPlayerPollVote[];
};

export type UserPlayerPollVote = {
    min: number;
    max: number;
};

export type VersionInfo = VersionInfoBase & {
    gamepageorderurl?: string | null;
    overrideordertype?: string;
    // TODO find type
    shopifyitem?: unknown | string | null;
    shopifyname?: string;
};

export type VersionInfoBase = {
    orderenddate?: string;
    orderstartdate?: string;
    orderurl?: string;
};

export type VersionItem = GeekItemBase
    & VersionItemBase
    & VersionInfoBase
    & {
    // TODO find types
    dimensions: unknown | null;
    ordertype: string | null;
    releasecomment: string;
    releasestatus: string;
};

export type VersionItemBase = {
    depth: string;
    length: string;
    overridedate: string;
    productcode: string;
    releasedate: string;
    weight: string;
    width: string;
};

export type VideoGameAdaptationItem = GeekItemBase & {
    subtype: 'videogame';
};

export type WeightPoll = {
    averageweight: number;
    votes: string;
};
