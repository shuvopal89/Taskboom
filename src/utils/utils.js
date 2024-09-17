import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { faBorderAll, faListCheck, faBarsProgress, faSquareCheck, faSquareMinus, faPlus, faGear, faTags, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const homeRoutes = [
    { id: 1, icon: faBorderAll, title: 'Dashboard', link: '/' },
    { id: 2, icon: faSquarePlus, title: 'Create Task', link: '/create-task' },
    { id: 3, icon: faListCheck, title: 'New Tasks', link: '/new-tasks' },
    { id: 4, icon: faBarsProgress, title: 'Running Task', link: '/running-tasks' },
    { id: 5, icon: faSquareCheck, title: 'Completed', link: '/completed-tasks' },
    { id: 6, icon: faSquareMinus, title: 'Canceled', link: '/canceled-tasks' },
    { id: 7, icon: faTags, title: 'Labels', link: '/labels' },
]

export const headerIcons = [
    { id: 1, icon: faPlus },
    { id: 2, icon: faGear },
]

export const dashboardAccountOptions = [
    { id: 1, icon: faGear, title: 'Settings' },
    { id: 2, icon: faArrowRightFromBracket, title: 'Logout' },
]

export const allStatus = [
    { id: 1, name: 'New', bg: 'bg-blue-500' },
    { id: 2, name: 'Running', bg: 'bg-amber-500' },
    { id: 3, name: 'Completed', bg: 'bg-green-500' },
    { id: 4, name: 'Canceled', bg: 'bg-rose-500' },
]

export const allPriorities = [
    { id: 1, name: 'Low' },
    { id: 2, name: 'Medium' },
    { id: 3, name: 'High' },
    { id: 4, name: 'Urgent' },
]
