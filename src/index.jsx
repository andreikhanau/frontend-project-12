import { createRoot } from 'react-dom/client';
import { io } from 'socket.io-client';
import init from './init.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './styles/main.css';
import i18n from './locales/i18n.js';

const socket = io('/', { autoConnect: true });

document.title = i18n.t('app.title');
createRoot(document.getElementById('root')).render(init(socket));