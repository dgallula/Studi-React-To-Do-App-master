import React from "react";
import { Button, Tooltip } from 'antd';

export default function MyButton(props) {
  return (
    <Tooltip title={props.tooltip}>
      <Button
        shape="round"
        type="primary"
        size="large"
        onClick={props.onClick}
        icon={props.icon}
      >
        {props.children}
      </Button>
    </Tooltip>
  );
}