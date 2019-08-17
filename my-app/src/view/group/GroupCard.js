import React, { Component } from 'react';
import { Card } from 'antd';
export class GroupCard extends Component {
    render() {
        console.log(this.props.groupList);
        let { groupIcon, groupName } = this.props.groupList;
        console.log(groupIcon, groupName);
        
        return (
            <div>
                <Card style={{ width: 300 }}>
                    <img src={groupIcon} />
                    <p>{groupName}</p>
                </Card>
            </div>
        );
    }
}

export default GroupCard;
