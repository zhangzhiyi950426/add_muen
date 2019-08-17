import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
const { SubMenu } = Menu;
export class LeftMenu extends Component {
    // handleClick = e => {
    //     console.log('click ', e);
    // }
    state = {
        menuList: []
    }
    render() {
        let { menuList } = this.state;
        return (
            <div className="menu">
                <Menu onClick={this.handleClick}
                    style={{ width: 200 }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline">
                    {
                        menuList && menuList.map(item => <SubMenu key={item.id} title={
                            <span>
                                <Icon type="mail" />
                                <span>{item.name}</span>
                            </span>
                        }>
                            {item.children.map(it => <Menu.Item key={it.id}>

                                <NavLink to={it.to}>
                                    {it.name}
                                </NavLink>
                            </Menu.Item>)}
                        </SubMenu>)
                    }
                </Menu>
            </div>
        );
    }
    componentDidMount() {
        Axios.get('/api/list').then(res => {
            this.setState({
                menuList: res.data
            })
        })
    }
}

export default LeftMenu;
