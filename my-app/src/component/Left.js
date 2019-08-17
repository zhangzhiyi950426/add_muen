import React, { Component } from 'react';
import { Tree } from 'antd';
import Axios from 'axios';
class Left extends Component {
    state = {
        menuList: []
    }
    render() {
        let { TreeNode } = Tree;
        let { menuList } = this.state;
        return (
            <div className="menu">
                <Tree showLine defaultExpandedKeys={['0-0-0']} onSelect={this.onSelect}>
                    {menuList && menuList.map((item, index) => <TreeNode title={item.name} key={0 - index}>
                        {
                            item.children.map((it, idx) => <TreeNode title={it.name} key={0 - index - idx}>
                            </TreeNode>)
                        }
                    </TreeNode>)}
                </Tree>
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

export default Left;
