
import React, { Component } from 'react';
import { Result, Button } from 'antd';
import { NavLink } from 'react-router-dom';
export class AccessDenied extends Component {
    render() {
        return (
            <>
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
    //                 extra={<Button type="primary"><NavLink to="/home">
    //                     Back Home
    // </NavLink></Button>}
                />
            </>
        );
    }
}

export default AccessDenied;
// import { Result, Button } from 'antd';
// import { NavLink } from 'react-router-dom';
// ReactDOM.render(
//     <Result
//         status="403"
//         title="403"
//         subTitle="Sorry, you are not authorized to access this page."
//         extra={<Button type="primary"><NavLink to="/home">
//             Back Home
//     </NavLink></Button>}
//     />,
//     mountNode,
// );
