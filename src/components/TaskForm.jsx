import { Input } from 'antd'
import React from 'react'

export default function TaskForm(props) {
    function handleChange(event) {
        props.setTitle(event.target.value);
    }

    return (
        <form>
            <label htmlFor="title">Nom</label>
            <Input placeholder="Nom de la tâche" onChange={handleChange} value={props.title} name="title" id="title" />
        </form>
    )
}
