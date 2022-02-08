import React from "react";
import { Button, Tooltip } from "antd";

export default function IconButton(props) {
    return (
        <>
            <Tooltip title={props.tooltip}>
                <Button type={props.type} onClick={props.onClick}>
                    {props.icon}
                </Button>
            </Tooltip>
        </>
    )
}