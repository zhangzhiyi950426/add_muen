import React, { Component } from 'react';
import { Input } from 'antd';
import {get} from '../server/request';

import {connect} from 'react-redux';
const { Search } = Input;
export class FuzzySearch extends Component {
    render() {
        
        return (
            <>
                <div>
                    <Search
                        placeholder="input search text"
                        onSearch={value => {this.Search.call(this,value)}}
                        style={{ width: 275,float:"left" }}
                    />
                    {/* <br />
                    <br />
                    <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                    <br />
                    <br />
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        onSearch={value => console.log(value)}
                    /> */}
                </div>
            </>
        );
    }
    Search(value){
        get('/user/search?input='+value).then(res=>{
            // console.log(res);
            // this.props.dataList(res.result)
            this.props.searchUserList(res.result);
        })
    }
}

export default connect(
    null,
    (dispatch)=>{
        return {
            searchUserList(data){
            dispatch({type:"SEARCH_LIST",data:data})
        }
    }
    }
)(FuzzySearch);
