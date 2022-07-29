/* eslint-disable no-alert */
import React, { PureComponent } from 'react';
import { Dropdown, Menu } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import s from './index.less';

class ActionTable extends PureComponent {
  handleMenuClick = ({ key }) => {
    const { listMenu = [] } = this.props;
    const itemClicked = listMenu.find((menu) => menu.text === key) || {};
    const { onClick = () => {} } = itemClicked;
    onClick();
  };

  render() {
    const { listMenu = [] } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {listMenu.map((item) => (
          <Menu.Item key={item.text}>{item.text}</Menu.Item>
        ))}
      </Menu>
    );

    return (
      <div className={s.root}>
        <Dropdown
          overlay={menu}
          placement="bottomRight"
          arrow={false}
          trigger="click"
          overlayClassName={s.customDropdown}
        >
          <UnorderedListOutlined style={{ cursor: 'pointer' }} />
        </Dropdown>
      </div>
    );
  }
}

export default ActionTable;
