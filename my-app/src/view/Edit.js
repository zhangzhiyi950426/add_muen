import React, { Component } from 'react';
import { get, post } from '../server/request';
import { Button, Modal, Form, Input, Cascader, Select } from 'antd';
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            const { Option } = Select;
            const residences = [
                {
                    value: '1',
                    label: '1'
                },
                {
                    value: '2',
                    label: '2'
                },
                {
                    value: '3',
                    label: '3'
                }
            ];
            const prefixSelector = getFieldDecorator('prefix', {
                initialValue: '86',
            })(
                <Select style={{ width: 70 }}>
                    <Option value="86">+86</Option>
                    <Option value="87">+87</Option>
                </Select>,
            );
            return (
                <Modal
                    visible={visible}
                    title="编辑"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="地址">
                            {getFieldDecorator('address', {
                                rules: [
                                    {
                                        type: 'string',
                                        message: '请输入您的正确地址',
                                    },
                                    {
                                        required: true,
                                        message: '请输入您的地址',
                                    },
                                ],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="真实姓名">
                            {getFieldDecorator('realName', {
                                rules: [
                                    {
                                        type: 'string',
                                        message: '请正确输入您的真实姓名',
                                    },
                                    {
                                        required: true,
                                        message: '请输入您的真实姓名',
                                    },
                                ],
                            })(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item label="密码">
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        type: 'string',
                                        message: '请输入您的密码格式',
                                    },
                                    {
                                        required: true,
                                        message: '请输入您的密码',
                                    },
                                ],
                            })(<Input type="password" />)}
                        </Form.Item>
                        <Form.Item label="电话">
                            {getFieldDecorator('phoneNum', {
                                rules: [
                                    {
                                        type: 'string',
                                        message: '请输入正确的号码格式',
                                    },
                                    {
                                        required: true,
                                        message: '请输入您的电话号码',
                                    },
                                ],
                            })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
                        </Form.Item>
                        <Form.Item label="用户权限">
                            {getFieldDecorator('userType', {
                                rules: [
                                    { type: 'array', required: true, message: '请选择您的用户权限' },
                                ],
                            })(<Cascader options={residences} />)}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);


class Edit extends Component {
    state = {
        visible: false,
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // console.log(this.props.list);
            let userId = this.props.list.userId;
            // console.log(userId);

            let address = values.address || this.props.list.address;
            let realName = values.realName || this.props.list.realName;
            let password = values.password || this.props.list.password;
            let phoneNum = values.phoneNum || this.props.list.phoneNum;
            let userType = values.userType || this.props.list.userType;
            post('/user/update', {
                userId,
                address,
                realName,
                password,
                phoneNum,
                userType
            }).then(res => {
                // console.log(res);
                // console.log(this.props);
                this.props.Return(res.code)
            })
            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ visible: false });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    编辑
          </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

export default Edit;
