import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./redux/store";
import {getGroupsThunk} from "./redux/reducers/groups";

const App: FC = () => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(state => state.groups.groupsList);

  console.log(groups);

  // useEffect(() => {
  //   dispatch(getGroupsThunk());
  // }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
