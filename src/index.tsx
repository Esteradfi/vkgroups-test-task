import React from 'react';
import ReactDOM, {createRoot} from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import { ConfigProvider, AdaptivityProvider } from '@vkontakte/vkui';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <ConfigProvider>
        <AdaptivityProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </AdaptivityProvider>
    </ConfigProvider>,
);
