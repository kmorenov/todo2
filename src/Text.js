import React from 'react'

export  default function Text ({item, switchMode}) {
    const {userId, id, title, completed} = item

        return <div onClick={switchMode}>
            ID: {id}
            Name: {title}
            User ID: {userId}
            Completed: {completed ? 'true' : 'false'}
        </div>
}