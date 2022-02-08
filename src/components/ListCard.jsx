import React, { useState } from "react";
import { Card } from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import IconButton from "./IconButton";
import { PlusCircleOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import RemoveModal from "./RemoveModal";
import TaskModal from "./TaskModal";

export default function ListCard(props) {
    const [isRemoveModalVisible, setIsRemoveModalVisible] = useState(false);
    const [isTaskModalVisible, setIsTaskModalVisible] = useState(false);

    return (
        <>
            <Card
                title={
                    <p style={{ color: props.list.color }}>{props.list.name}</p>
                }
                style={{ width: 300 }}
                className="m-3"
            >
                {props.list.tasks.length <= 0 && (
                    <p>Aucune tâche pour cette liste.</p>
                )}
                {props.list.tasks.map(task => (
                    <div key={task.title}>
                        <Checkbox>
                            <p>{task.title}</p>
                        </Checkbox>
                    </div>
                ))}

                <IconButton
                    tooltip= "Ajouter une tâche"
                    type="link"
                    icon={<PlusCircleOutlined className="text-success fs-5" />}
                    onClick={() => setIsTaskModalVisible(true)}
                />

                <div className="d-flex justify-content-between">
                    <IconButton
                        tooltip= "Modifer la liste"
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            props.setIsModalVisible(true);
                            props.setSelectedList(props.list);
                        }}
                    />

                    <IconButton
                        tooltip= "Supprimer la liste"
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => setIsRemoveModalVisible(true)}
                    />
                </div>
            </Card>
            <RemoveModal
                list={props.list}
                isVisible={isRemoveModalVisible}
                title={`Supprimer la liste ${props.list.name} ?`}
                onClose={() => setIsRemoveModalVisible(false)}
            />
            <TaskModal
                isVisible={isTaskModalVisible}
                title={`Ajouter un tâche à la liste ${props.list.name} ?`}
                onClose={() => setIsTaskModalVisible(false)}
                list = {props.list}
            />
        </>
    );
}