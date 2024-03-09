import {createAsyncThunk, createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {GetGroupsResponse, Group, GroupsState} from "../../types/interfaces";
import {SliceActions} from "@reduxjs/toolkit/dist/query/core/buildSlice";
import $api from "../../api";

export const getGroupsThunk = createAsyncThunk(
    'groups/getGroups',
    async () => {
        try {
            const response = await $api.get<GetGroupsResponse>(`/groups`);
            console.log(response);

            if (response.data.result === 0 || !response.data.data) {
                return [];
            }

            return response.data.data;
        } catch (error: any) {
            console.log(error.response?.data.message);
            throw error;
        }
    }
)

const initialState: GroupsState = {
    groupsList: [
        {
            "id": 1,
            "name": "Котики",
            "closed": false,
            "avatar_color": "red",
            "members_count": 457,
            "friends": [
                {
                    "first_name": "Маша",
                    "last_name": "Петрова"
                },
                {
                    "first_name": "Фёдор",
                    "last_name": "Агапов"
                },
                {
                    "first_name": "Вера",
                    "last_name": "Петрова"
                }
            ]
        },
        {
            "id": 2,
            "name": "Собачки",
            "closed": false,
            "avatar_color": "green",
            "members_count": 147
        },
        {
            "id": 3,
            "name": "Бабочки",
            "closed": true,
            "avatar_color": "yellow",
            "members_count": 2,
            "friends": [
                {
                    "first_name": "Василий",
                    "last_name": "Гончаров"
                }
            ]
        },
        {
            "id": 4,
            "name": "Утята",
            "closed": false,
            "avatar_color": "blue",
            "members_count": 88,
            "friends": [
                {
                    "first_name": "Маша",
                    "last_name": "Пивоварова"
                },
                {
                    "first_name": "Илья",
                    "last_name": "Кот"
                }
            ]
        },
        {
            "id": 5,
            "name": "Мишки",
            "closed": true,
            "avatar_color": "red",
            "members_count": 4
        },
        {
            "id": 6,
            "name": "Улитки",
            "closed": true,
            "members_count": 99,
            "friends": [
                {
                    "first_name": "Маша",
                    "last_name": "Петрова"
                }
            ]
        },
        {
            "id": 7,
            "name": "Выдры",
            "closed": false,
            "avatar_color": "purple",
            "members_count": 5,
            "friends": [
                {
                    "first_name": "Ирина",
                    "last_name": "Харитонова"
                },
                {
                    "first_name": "Владислав",
                    "last_name": "Самсонов"
                },
                {
                    "first_name": "Сергей",
                    "last_name": "Антонов"
                }
            ]
        },
        {
            "id": 8,
            "name": "Зайки",
            "closed": false,
            "avatar_color": "white",
            "members_count": 777
        },
        {
            "id": 9,
            "name": "Кролики",
            "closed": true,
            "avatar_color": "yellow",
            "members_count": 8,
            "friends": [
                {
                    "first_name": "Даша",
                    "last_name": "Елец"
                }
            ]
        },
        {
            "id": 10,
            "name": "Утконосы",
            "closed": true,
            "members_count": 0
        },
        {
            "id": 11,
            "name": "Куропатки",
            "closed": false,
            "avatar_color": "red",
            "members_count": 33,
            "friends": [
                {
                    "first_name": "Зоя",
                    "last_name": "Петрова"
                },
                {
                    "first_name": "Марфа",
                    "last_name": "Зайцева"
                }
            ]
        },
        {
            "id": 12,
            "name": "Козлики",
            "closed": false,
            "members_count": 7,
            "friends": [
                {
                    "first_name": "Катя",
                    "last_name": "Самсонова"
                }
            ]
        },
        {
            "id": 13,
            "name": "Тигры",
            "closed": false,
            "avatar_color": "orange",
            "members_count": 11,
            "friends": [
                {
                    "first_name": "Лев",
                    "last_name": "Лещенко"
                },
                {
                    "first_name": "Фёдор",
                    "last_name": "Бондарчук"
                },
                {
                    "first_name": "Вера",
                    "last_name": "Брежнева"
                }
            ]
        },
        {
            "id": 14,
            "name": "Птички",
            "closed": true,
            "avatar_color": "blue",
            "members_count": 23
        }
    ],
    isFetching: false
}

export const GroupsSlice = createSlice({
    name: 'Groups',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getGroupsThunk.fulfilled, (state, action) => {
                if (action.payload) {
                    state.groupsList = action.payload;
                }
            })
            .addCase(getGroupsThunk.rejected, (state, action) => {
                if (action.payload) {
                    console.log(action.payload);
                }
            });
    }
})

export default GroupsSlice.reducer;

export const {}: SliceActions = GroupsSlice.actions;