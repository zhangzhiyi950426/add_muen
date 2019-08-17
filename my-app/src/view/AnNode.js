import React, { Component } from 'react';
import { Table } from 'antd';
import { get, post } from '../server/request';
import Edit from './Edit';
import {connect} from 'react-redux';
import Search from './FuzzySearch';
import AddMember from './addingMembers';
export class AnNode extends Component {
  state = {
    userList: [{
      key: "",
      userName: "",
      userIcon: "",
      address: "",
      phoneNum: "",
      realName: "",
      userId: ""
    }]
  }
  render() {
    const columns = [
      {
        title: '头像',
        dataIndex: 'userIcon',
        key: 'userIcon',
        render: (userIcon) => (
          <img src={userIcon} alt="" className="img" />
        )

      },
      {
        title: '姓名',
        dataIndex: 'userName',
        key: 'userName',
        render: text => <a href="javascript:;">{text}</a>,
      },

      {
        title: '地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName',
      },
      {
        title: '手机号码',
        dataIndex: 'phoneNum',
        key: 'phoneNum',
      }, {
        title: "active",
        key: "delete",
        render: (list, { userId }) => (
          <div>
            <span>
              <Edit list={list} Return={this.returnInformation.bind(this)} />
            </span>
            &nbsp;
            <span onClick={this.delete.bind(this, userId)}>
              删除
          </span>

          </div>
        )
      }

    ];
    let { userList } = this.state;
    
    let {store}=this.props;
    store.map(item=>{
      item.key=item.userId
    })
    
    console.log(Boolean(store.length));
    let data;
    if (store.length) {
      data=store;
    } else {
      data=userList;      
    }

    return (
      <>
        {/* <Table dataSource={dataSource} columns={columns} />; */}
        <div className="SearchAddMember">

          <Search />
          <AddMember />

        </div>
        <Table columns={columns} dataSource={data} pagination={true} />

      </>
    );
  }
  userList() {
    get('/user').then(res => {
      let userList = [];
      res.result.map((item, index) => {
        let obj = {
          key: index,
          userName: item.userName,
          userIcon: item.userIcon,
          address: item.address,
          phoneNum: item.phoneNum,
          realName: item.realName,
          userId: item.userId
        }
        userList.push(obj);
      })
      this.setState({
        userList
      })

    })
  }
  componentDidMount() {
    this.userList();
  }
  delete(id) {
    post('/user/delete', {
      userId: id
    }).then(() => {
      this.userList();
    })
  }
  returnInformation(code) {
    if (code === 1) {
      this.userList();
    }
  }
}

export default connect(
  (store) => {
    return {
      store: store.listData
    }
  }
)(AnNode);
