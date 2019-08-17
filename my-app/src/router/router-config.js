import Home from '../component/home';
import Register from '../view/Register';
import Login from '../view/Login';
import AnNode from '../view/../view/AnNode';
import Group from '../view/group/Group';
import NotFound from '../view/error/NotFound';
import ServerError from '../view/error/ServerError';
import AccessDenied from '../view/error/AccessDenied';
const config = [
    {
        path: '/home',
        component: Home,
        children: [{
            path: "/home/table",
            component: AnNode
        }, {
            path: "/home/group",
            component: Group
        }, {
            path: "/home/404",
            component: NotFound
        }, {
            path: "/home/500",
            component: ServerError
        }, {
            path: "/home/403",
            component: AccessDenied
        }, {
            from: "/home",
            to: "/home/table"
        }
        ]
    },
    {
        path: "/register",
        component: Register
    },
    {
        path: "/login",
        component: Login
    },

    {
        from: "/",
        to: "/login"
    }
]
export default config;