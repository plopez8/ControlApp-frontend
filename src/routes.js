import LoginView from 'views/Login';
import DocumentsView from 'views/documentsView';
import taskHistory from 'views/taskHistory';
import documentHistory from 'views/documentsHistory';
import WorkersList from 'views/workersList';

export const dashboardRoutes = [
    {
        path: '/documents',
        name: 'Documents',
        component: DocumentsView,
        layout: '/private',
    },
    {
        path: '/documentHistory',
        name: 'Historial de documents',
        component: documentHistory,
        layout: '/private',
    },
    {
        path: '/taskhistory',
        name: 'Historial de tasques',
        component: taskHistory,
        layout: '/private',
    },
    {
        path: '/workers',
        name: 'Treballadors',
        component: WorkersList,
        layout: '/private',
    },   
];

export const homeRoutes = [
    {
        path: '/',
        name: 'Login',
        component: LoginView,
        layout: '/public',
    },
];
