// Интерфейс ответа, приходящего с API
export interface GetGroupsResponse {
    result: 1 | 0,
    data?: GroupInterface[]
}

// Интерфейс слайса групп
export interface GroupsState {
    groupsList: GroupInterface[],
    isFetching: boolean
}

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