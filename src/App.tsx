import * as React from 'react';
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Panel,
  PanelHeader,
  usePlatform,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import {useAppDispatch, useAppSelector} from "./redux/store";
import {FC, useEffect} from "react";
import {GroupInterface} from "./types/interfaces";
import GroupWrapper from "./components/GroupWrapper/GroupWrapper";
import Filters from "./components/Filters/Filters";
import {getGroupsThunk} from "./redux/reducers/groups";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const platform = usePlatform();
  const groups: GroupInterface[] = useAppSelector(state => state.groups.filteredGroups);

  const groupsItems = groups.length > 0 ? groups.map((group: GroupInterface) => <GroupWrapper key={group.id} group={group} />) : 'Группы не найдены';

  //Отправка запроса на получение групп
  useEffect(() => {
    dispatch(getGroupsThunk());
  }, [])

  return (
      <AppRoot>
        <SplitLayout header={platform !== 'vkcom' && <PanelHeader delimiter="none" />}>
          <SplitCol autoSpaced>
            <View activePanel="main">
              <Panel id="main">
                <PanelHeader>Группы</PanelHeader>
                <Filters />
                {groupsItems}
              </Panel>
            </View>
          </SplitCol>
        </SplitLayout>
      </AppRoot>
  );
};

export default App;