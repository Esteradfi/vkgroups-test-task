import {createAsyncThunk, createSlice, PayloadAction,} from "@reduxjs/toolkit";
import {Friends, GetGroupsResponse, GroupsState, Privacy} from "../../types/interfaces";
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
    groupsList: [],
    filteredGroups: [],
    filters: {
        privacy: "all",
        friends: "all",
        avatar_colors: []
    },
    colorsList: [],
    isFetching: false
}

export const GroupsSlice = createSlice({
    name: 'Groups',
    initialState,
    reducers: {
        changePrivacyMod: (state, action: PayloadAction<Privacy>) => {
          state.filters.privacy = action.payload;
        },
        changeFriendsMod: (state, action: PayloadAction<Friends>) => {
          state.filters.friends = action.payload;
        },
        changeColors: (state, action: PayloadAction<string>) => {
            let actionColor = action.payload;
            let indexColor = state.filters.avatar_colors.indexOf(actionColor);

            if(indexColor !== -1) {
                state.filters.avatar_colors.splice(indexColor, 1);
            } else {
                state.filters.avatar_colors.push(actionColor);
            }
        },
        applyFilters: (state) => {
            const { privacy, friends, avatar_colors } = state.filters;
            const avatarColorsSet = new Set(avatar_colors);
            state.filteredGroups = state.groupsList.filter(group => {
                let groupColor = group.avatar_color || 'no color'; // Если у группы нет цвета, то присваиваем 'no color'
                if (
                    (privacy === "all" || (privacy === "opened" && !group.closed) || (privacy === "closed" && group.closed)) &&
                    ((friends === "all") ||
                        (friends === "yes" && group.friends && group.friends.length > 0) ||
                        (friends === "no" && (!group.friends || group.friends.length === 0))) &&
                    (avatar_colors.length === 0 || avatarColorsSet.has(groupColor))
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
                    state.groupsList = state.filteredGroups = action.payload;

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