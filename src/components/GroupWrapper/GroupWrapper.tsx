import {Group, Header, SimpleCell, Avatar, Button, ActionSheet, ActionSheetItem} from "@vkontakte/vkui";
import * as React from "react";
import {GroupInterface, User} from "../../types/interfaces";
import {useState} from "react";

const GroupWrapper = ({group}: { group: GroupInterface }) => {
    const [popout, setPopout] = useState<React.ReactElement | null>(null);
    const onClose = () => setPopout(null);
    const baseTargetRef = React.useRef<HTMLDivElement>(null);

    // Список друзей, подписанных на группу
    const friendsItems = group.friends ? group.friends.map((friend: User) => <ActionSheetItem
        key={friend.first_name + friend.last_name} onClick={onClose}>
        {friend.first_name} {friend.last_name}
    </ActionSheetItem>) : null;

    // Функция для открытия блока со списком друзей
    const openBase = () => {
        setPopout(
            <ActionSheet onClose={onClose} toggleRef={baseTargetRef} style={{zIndex: 1}}>
                {friendsItems}
            </ActionSheet>
        );
    };

    return (
        <Group header={<Header>{group.name}</Header>}>
            <SimpleCell
                before={
                    <Avatar
                        size={96}
                        src="#"
                        style={{backgroundColor: group.avatar_color || 'transparent'}}
                    />
                }
                subtitle={group.closed ? 'Закрытая' : 'Открытая'}
            >
                Подписчики: {group.members_count}{' '}
                {group.friends && (
                    <div ref={baseTargetRef} style={{display: 'inline-block'}}>
                        <Button onClick={openBase} mode="tertiary">
                            {'Друзья: ' + group.friends.length}
                        </Button>
                    </div>
                )}
            </SimpleCell>
            {popout}
        </Group>
    );
};

export default GroupWrapper;
