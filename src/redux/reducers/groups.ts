import {createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {Friends, GetGroupsResponse, GroupsState, Privacy} from "../../types/interfaces";
import $api from "../../api";


// Запрос на получение групп
export const getGroupsThunk = createAsyncThunk(
    'groups/getGroups',
    async () => {
        try {
            const response = await $api.get<GetGroupsResponse>(`/groups`);

            //Обработка на случай отсутствия data или result === 0
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

// Начальные значения State
const initialState: GroupsState = {
    groupsList: [],
    filteredGroups: [],
    filters: {
        privacy: "all",
        friends: "all",
        avatar_colors: []
    },
    colorsList: [],
}

export const GroupsSlice = createSlice({
    name: 'Groups',
    initialState,
    reducers: {
        // Изменение фильтра по приватности
        changePrivacyMod: (state, action: PayloadAction<Privacy>) => {
          state.filters.privacy = action.payload;
        },
        // Изменение фильтра по наличию друзей в группе
        changeFriendsMod: (state, action: PayloadAction<Friends>) => {
          state.filters.friends = action.payload;
        },
        // Изменение фильтра по цвету
        changeColors: (state, action: PayloadAction<string>) => {
            let actionColor = action.payload;
            let indexColor = state.filters.avatar_colors.indexOf(actionColor);

            if(indexColor !== -1) {
                state.filters.avatar_colors.splice(indexColor, 1);
            } else {
                state.filters.avatar_colors.push(actionColor);
            }
        },
        // Сохранение выбранных фильтров
        applyFilters: (state) => {
            const { privacy, friends, avatar_colors } = state.filters;
            state.filteredGroups = state.groupsList.filter(group => {
                let groupColor = group.avatar_color || 'no color'; // Если у группы нет цвета, то присваивается 'no color'
                if (
                    (privacy === "all" || (privacy === "opened" && !group.closed) || (privacy === "closed" && group.closed)) &&
                    ((friends === "all") ||
                        (friends === "yes" && group.friends && group.friends.length > 0) ||
                        (friends === "no" && (!group.friends || group.friends.length === 0))) &&
                    (avatar_colors.length === 0 || avatar_colors.includes(groupColor))
                ) {
                    return true;
                }
                return false;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGroupsThunk.fulfilled, (state, action) => {
                if (action.payload) {
                    // Полученные данные сохраняются в двух местах, т.к. groupsList хранит изначально полученные данные, а filteredGroups - отфильтрованные данные
                    state.groupsList = state.filteredGroups = action.payload;

                    // Проходимся по массиву групп и формируем коллекцию цветов аватарок, не забывая добавить 'no colors' для групп без аватарок
                    state.colorsList = Array.from(new Set([
                        ...action.payload
                            .map((group: { avatar_color?: string }) => group.avatar_color)
                            .filter((color: string | undefined): color is string => color !== undefined),
                        "no color"
                    ]));
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

export const {changePrivacyMod, changeFriendsMod, applyFilters, changeColors} = GroupsSlice.actions;