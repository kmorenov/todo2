import React from 'react'

export default function Text({item}) {
    const {userId, id, title, completed} = item
    return <div class="uk-card-media-left uk-cover-container">
        ID: {id}
        User ID: {userId}
        Completed: {completed ? 'true' : 'false'}
        Title: {title}
    </div>
}