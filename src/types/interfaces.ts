// Интерфейс ответа, приходящего с API
export interface GetGroupsResponse {
    result: 1 | 0,
    data?: Group[]
}

// Интерфейс слайса групп
export interface GroupsState {
    groupsList: Group[],
    isFetching: boolean
}

export interface Group {
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