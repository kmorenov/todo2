import React from 'react'

export default function Field({item, onChange, index, onDelete}) {
    const {userId, id, title, completed} = item
    return <div class="uk-card-default">
        ID: {id}
        User ID: {userId}
        Completed: {completed ? 'true' : 'false'}
        <label htmlFor="name">Title: </label>
        <input class="uk-text-bold"
            size={55}
               value={title}
               name={id}
               id={id}
               onChange={(e) => onChange(index)}
               type="text"/>
        <button onClick={() => {onDelete(index)}} class="uk-button-danger">Delete</button>
    </div>
}