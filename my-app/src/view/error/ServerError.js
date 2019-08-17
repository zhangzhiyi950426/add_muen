import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Result, Button } from 'antd';
export class ServerError extends Component {
    render() {
        return (
            <>
                <Result
                    status="500"
                    title="500"
                    subTitle="Sorry, the server is wrong."
    //                 extra={<Button type="primary"><NavLink to="/home">
    //                     Back Home
    // </NavLink></Button>}
                />
            </>
        );
    }
}

export default ServerError;

// ReactDOM.render(
//     <Result
//         status="500"
//         title="500"
//         subTitle="Sorry, the server is wrong."
//         extra={<Button type="primary"><NavLink to="/home">
//             Back Home
//     </NavLink></Button>}
//     />,
//     mountNode,
// );