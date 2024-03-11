import {Group, Header, FormLayoutGroup, FormItem, RadioGroup, Radio, Checkbox, Button} from "@vkontakte/vkui";
import * as React from "react";
import {Friends, Privacy} from "../../types/interfaces";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {applyFilters, changeColors, changeFriendsMod, changePrivacyMod} from "../../redux/reducers/groups";
import {FC} from "react";

const Filters: FC = () => {
    const dispatch = useAppDispatch();
    const privacyMod: Privacy = useAppSelector(state => state.groups.filters.privacy);
    const friendsMod: Friends = useAppSelector(state => state.groups.filters.friends);
    const allColors: string[] = useAppSelector(state => state.groups.colorsList);
    const selectedColors: string[] = useAppSelector(state => state.groups.filters.avatar_colors);

    const onChangePrivacyMod = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changePrivacyMod(e.target.value as Privacy));
    };

    const onChangeFriendsMod = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeFriendsMod(e.target.value as Friends));
    }

    const onChangeSelectedColors = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeColors(e.target.value));
    }

    const onApplyFilters = () => {
        dispatch(applyFilters());
    }

    const allColorsItems = allColors.length > 0 ? allColors.map((color: string) => <Checkbox key={color}
                                                                                             value={color}
                                                                                             onChange={onChangeSelectedColors}
                                                                                             checked={Boolean(selectedColors.includes(color))}>{color}</Checkbox>) : null;

    return (
        <Group header={<Header mode={"primary"}>Фильтры</Header>}>
            <FormLayoutGroup>
                <FormItem top={"Приватность"}>
                    <RadioGroup mode={"horizontal"}>
                        <Radio name='privacy' checked={privacyMod === 'all'} onChange={onChangePrivacyMod}
                               value={'all'}>
                            Все
                        </Radio>
                        <Radio name='privacy' checked={privacyMod === 'opened'} onChange={onChangePrivacyMod}
                               value={'opened'}>
                            Открытые
                        </Radio>
                        <Radio name='privacy' checked={privacyMod === 'closed'} onChange={onChangePrivacyMod}
                               value={'closed'}>
                            Закрытые
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem top={"Друзья в группе"}>
                    <RadioGroup mode={'horizontal'}>
                        <Radio name='friends' checked={friendsMod === 'all'} onChange={onChangeFriendsMod}
                               value={'all'}>
                            Все
                        </Radio>
                        <Radio name='friends' checked={friendsMod === 'yes'} onChange={onChangeFriendsMod}
                               value={'yes'}>
                            Есть
                        </Radio>
                        <Radio name='friends' checked={friendsMod === 'no'} onChange={onChangeFriendsMod} value={'no'}>
                            Нет
                        </Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem top={"Цвет аватарки"}>
                    {allColorsItems}
                </FormItem>
                <Button size={"l"} stretched={true} onClick={onApplyFilters} appearance={"accent-invariable"}>Сохранить
                    фильтры</Button>
            </FormLayoutGroup>
        </Group>
    )
};

export default Filters;