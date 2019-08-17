import React, { Component } from 'react';
import GroupCard from './GroupCard';
import { get } from '../../server/request';
export class Group extends Component {
    state = {
        groupList: []
    }
    render() {
        let { groupList } = this.state;
        return (
            <>
                {groupList && groupList.map(item => <GroupCard groupList={item} key={item.groupId}>
                </GroupCard>)}
            </>
        );
    }
    componentDidMount() {
        get('/group/list').then(res => {
            // console.log(res);
            this.setState({
                groupList: res.result
            })
        })
    }
}

export default Group;
