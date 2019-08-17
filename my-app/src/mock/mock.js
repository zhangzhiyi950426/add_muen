import Mock from 'mockjs';

Mock.mock('/api/list', [
    {
        name: "用户管理",
        id: "A1",
        children: [
            {
                name: "所有用户",
                id: "1",
                to: "/home/table"
            }
        ]
    }, {
        name: "小组管理",
        id: "A2",
        children: [
            {
                name: "小组列表",
                id: "2",
                to: "/home/group"
            },
            {
                name: "成员管理",
                id: "3",
                to: '/home'
            },
        ]
    }, {
        name: "动态管理",
        id: "A3",
        children: [
            {
                name: "添加动态",
                id: "4",
                to: '/home'
            }, {
                name: "沐恩动态",
                id: "5",
                to: '/home'
            }, {
                name: "个人动态",
                id: "6",
                to: '/home'
            },
        ]
    }, {
        name: "代祷事项",
        id: "A4",
        children: [
            {
                name: "代祷管理",
                id: "7",
                to: '/home'
            }
        ]
    }, {
        name: "奉献",
        id: "A5",
        children: [
            {
                name: "奉献管理",
                id: "8",
                to: '/home'
            }
        ]
    }, {
        name: "意见反馈", id: "A6",
        children: [
            {
                name: "反馈列表",
                id: "9",
                to: '/home'
            }, {
                name: "反馈详情",
                id: "10",
                to: '/home'
            }
        ]
    }, {
        name: "礼品管理", id: "A7",
        children: [
            {
                name: "礼品列表",
                id: "11",
                to: '/home'
            }
        ]
    }, {
        name: "留言管理", id: "A8",
        children: [
            {
                name: "留言列表",
                id: "12",
                to: '/home'
            }
        ]
    }, {
        name: "投票管理", id: "A9",
        children: [
            {
                name: "发起投票",
                id: "13",
                to: '/home'
            }, {
                name: "投票列表",
                id: "14",
                to: '/home'
            },
        ]
    }, {
        name: "主日分享", id: "A10",
        children: [
            {
                name: "主日分享",
                id: "15",
                to: '/home'
            }
        ]
    }, {
        name: "异常页面", id: "A11",
        children: [
            {
                name: "403",
                id: "16",
                to: '/home/403'
            }, {
                name: "404",
                id: "17",
                to: '/home/404'
            }, {
                name: "500",
                id: "18",
                to: '/home/500'
            }
        ]
    }
])