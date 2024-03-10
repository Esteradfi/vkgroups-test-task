import * as React from 'react';
import { createRoot } from 'react-dom/client';
import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell, usePlatform,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {useAppDispatch, useAppSelector} from "./redux/store";
import {FC} from "react";
import {GroupInterface} from "./types/interfaces";
import GroupWrapper from "./components/GroupWrapper/GroupWrapper";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const platform = usePlatform();
  const groups = useAppSelector(state => state.groups.groupsList);
  const groupsItems = groups.length > 0 ? groups.map((group: GroupInterface) => <GroupWrapper key={group.id} group={group} />) : 'Группы не найдены';

// useEffect(() => {
//   dispatch(getGroupsThunk());
// }, [])

  return (
      <AppRoot>
        <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
          <SplitCol autoSpaced>
            <View activePanel="main">
              <Panel id="main">
                <PanelHeader>Группы</PanelHeader>
                <Group header={<Header mode={"secondary"}>Фильтры</Header>}>

                </Group>
                {groupsItems}
              </Panel>
            </View>
          </SplitCol>
        </SplitLayout>
      </AppRoot>
  );
};

export default App;