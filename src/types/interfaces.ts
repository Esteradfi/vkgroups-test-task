// Интерфейс ответа, приходящего с API
export interface GetGroupsResponse {
    result: 1 | 0,
    data?: GroupInterface[]
}

// Интерфейс слайса групп
export interface GroupsState {
    groupsList: GroupInterface[],
    filteredGroups: GroupInterface[],
    filters: Filters,
    colorsList: string[],
}

// Интерфейс фильтров
export interface Filters {
    privacy: Privacy,
    friends: Friends,
    avatar_colors: string[]
}

export type Privacy = 'all' | 'opened' | 'closed';
export type Friends = 'all' | 'yes' | 'no';

export interface GroupInterface {
    "id": number,
    "name": string,
    "closed": boolean,
    "avatar_color"?: string,
    "members_count": number,
    "friends"?: User[]
}

export interface User {
    "first_name": string,
    "last_name": string
}