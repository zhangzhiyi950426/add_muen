import React, { Component } from 'react';
import RouterView from '../router/MapRouter';
import Header from './Header';
import LeftMenu from './LeftMenu';
import { Provider } from 'react-redux';
import store from '../store';
class home extends Component {
    // state={
    //     menuList:[]
    // }
    render() {
        // let {menuList}=this.state;
        return (
            <>
                <Header />

                <main>
                    <div className="left">
                        <LeftMenu />
                    </div>
                    <div className="right">
                        <Provider store={store}>

                            <RouterView route={this.props.route} />

                        </Provider>
                    </div>
                </main>

            </>
        );
    }
    // componentDidMount(){
    //     Axios.get('/api/list').then(res => {
    //         this.setState({
    //             menuList: res.data
    //         })
    //     })
    // }
}

export default home;
