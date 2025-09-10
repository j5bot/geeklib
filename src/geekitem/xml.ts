import { ThingType } from '../types';
import { elementGetter } from '../utils';

export type Geekitem = {
    type: ThingType;
    id: number;
    thumbnail?: string;
    image?: string;
    name: string;
    alternateNames?: string[];
    description?: string;
    yearpublished?: number;
    polls?: any;
    pollSummary?: any;
    minplayers?: number;
    maxplayers?: number;
    playingtime?: number;
    minplaytime?: number;
    maxplaytime?: number;
    minage?: number;
    links?: Record<string, { id: number; value: string; }>;
    statistics?: Record<'ratings', any>;
};

export const parseItem = (document: XMLDocument) => {
    // const expansionMap: Record<string, Array<string | number>> = {};
    return Array.from(document.querySelectorAll('item'))?.map(
        (itemTree) => {
            const name = elementGetter(
                itemTree,
                false,
                'name[type="primary]'
            );
            const id = elementGetter(
                itemTree,
                true,
                undefined,
                'id'
            );
            const thingType = elementGetter(
                itemTree,
                false,
                undefined,
                'type'
            );

            // let expansionFor;
            // if (thingType === 'boardgameexpansion') {
            //     const expansionForLinks = itemTree.querySelectorAll(
            //         'link[type="boardgameexpansion"]');
            //     expansionFor = id ? Array.from(expansionForLinks).map(link => {
            //         const forId = link.getAttribute('id') ?? '';
            //
            //         if (expansionMap[forId]) {
            //             if (!expansionMap[forId].includes(id)) {
            //                 expansionMap[forId].push(id);
            //             }
            //         } else {
            //             expansionMap[forId] = [id];
            //         }
            //
            //         return forId;
            //     }) : undefined;
            // }

            const image = itemTree.querySelector('image')?.innerHTML;
            const thumbnail = itemTree.querySelector('thumbnail')
                ?.innerHTML;

            const ratingsTree = itemTree?.querySelector('ratings');
            const avgRating = parseFloat(
                ratingsTree
                    ?.querySelector('average')
                    ?.getAttribute('value') || '',
            );
            const rank = parseInt(
                ratingsTree
                    ?.querySelector('rank[id="1"]')
                    ?.getAttribute('value') ?? '0', 10);

            const usersRated = parseInt(
                ratingsTree
                    ?.querySelector('usersrated')
                    ?.getAttribute('value') ?? '0', 10);

            const numComments = parseInt(
                ratingsTree
                    ?.querySelector('numcomments')
                    ?.getAttribute('value') ?? '0', 10);

            const published = parseInt(
                itemTree
                    .querySelector('yearpublished')
                    ?.getAttribute('value') || '',
                10,
            );
            const description = itemTree.querySelector('description')
                ?.innerHTML;
            const minPlayers = parseInt(
                itemTree
                    .querySelector('minplayers')
                    ?.getAttribute('value') || '',
                10,
            );
            const maxPlayers = parseInt(
                itemTree
                    .querySelector('maxplayers')
                    ?.getAttribute('value') || '',
                10,
            );
            const minAge = parseInt(
                itemTree
                    .querySelector('minage')
                    ?.getAttribute('value') || '',
                10,
            );

            const suggestedAges = Array.from(
                itemTree.querySelectorAll(
                    'poll[name="suggested_playerage"] result',
                ),
            );

            let suggestedAge = minAge;
            for (const age of suggestedAges) {
                if (
                    parseInt(age.getAttribute('numvotes') || '', 10) > 0
                ) {
                    suggestedAge = parseInt(
                        age.getAttribute('value') || '',
                        10,
                    );
                    break;
                }
            }

            const weight = parseFloat(
                ratingsTree
                    ?.querySelector('averageweight')
                    ?.getAttribute('value') || '',
            ).toFixed(2);
            const designer = itemTree
                .querySelector('[type="boardgamedesigner"]')
                ?.getAttribute('value');
            const publisher = itemTree
                .querySelector('[type="boardgamepublisher"]')
                ?.getAttribute('value');
            const category = itemTree
                .querySelector('[type="boardgamecategory"]')
                ?.getAttribute('value');
            const mechanics = Array.from(
                itemTree.querySelectorAll('[type="boardgamemechanic"]'),
            ).map((mechanic) => {
                return mechanic?.getAttribute('value');
            });

            return {
                id,
                name,
                published,
                description,
                thingType,
                image,
                thumbnail,
                avgRating,
                weight,
                minPlayers,
                maxPlayers,
                minAge,
                suggestedAge,
                rank,
                usersRated,
                numComments,
                designer,
                publisher,
                category,
                mechanics,
            };
        }
    );
};