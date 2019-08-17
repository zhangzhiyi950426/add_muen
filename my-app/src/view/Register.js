import React, { Component } from 'react';
import { post } from '../server/request';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Checkbox,
    Button,
    Upload,
    message
} from 'antd';

const { Option } = Select;

const residences = [
    {
        value: '1',
        label: '管理员',
    },
    {
        value: '2',
        label: '组长',
    },
    {
        value: '3',
        label: '普通',
    }
];
//上传头衔
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Register extends Component {
    state = {
        realName: "",
        password: "",
        userName: "",
        confirmDirty: false,
        autoCompleteResult: [],
        loading: false
    }
    //上传头像
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let { password, realName, userName } = values;
                let phoneNum = values.phoneNum || null;
                let userType = values.userType ? values.userType[0] : null;
                let address = values.address || "";
                let userIcon = this.state.imageUrl || "";

                post('/register', {
                    userName,
                    password,
                    realName,
                    phoneNum,
                    userType,
                    address,
                    userIcon,
                }).then(res => {
                    if (res.code === 1) {
                        this.props.history.push('/home/login');
                    } else {
                        console.log(err);
                    }
                })
                // console.log('Received values of form: ', password, realName, userName, phoneNum, userType, address, userIcon);
            }
        });
    };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>,
        );


        return (

            <div className="register">

                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    头像：
                <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                    <Form.Item
                        label={
                            <span>
                                昵称:&nbsp;
              <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your userName!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="密码:" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="请再次输入您的密码:" hasFeedback>
                        {getFieldDecorator('Confirm password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item
                        label={
                            <span>
                                请输入您的真实姓名&nbsp;
              <Tooltip title="Please input your realName!">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('realName', {
                            rules: [{ required: true, message: 'Please input your realName!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item
                        label={
                            <span>
                                地址&nbsp;
                            </span>
                        }
                    >
                        {getFieldDecorator('address')(<Input />)}
                    </Form.Item>

                    <Form.Item label="权限:">
                        {getFieldDecorator('userType')(<Cascader options={residences} />)}
                    </Form.Item>



                    <Form.Item label="手机号码:">
                        {getFieldDecorator('phoneNum')(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>
                                I have read the <a href="">agreement</a>
                            </Checkbox>
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
          </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
    register() {
        // console.log(this);
        post('/register', {
            userName: this.state.realName,
            password: this.state.password,
            realName: this.state.realName
        }).then(res => {
            // console.log(res);
            if (res.code === 1) {
                this.props.history.push('/home/login');
            } else {
                this.props.history.push('/home/login');
            }
        })
    }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

export default WrappedRegistrationForm;
