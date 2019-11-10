import React from 'react'

export default function Text({item}) {
    const {userId, id, title, completed} = item
    return <div className="uk-card-body">
        <h3 className="uk-card-title">Media Left</h3>
        {/*                                                <p onClick={() => {
                                                    this.setState({edit: i})
                                                }}>*/}
        ID: {id}
        User ID: {userId}
        Completed: {completed ? 'true' : 'false'}
        Title: {title}
    </div>
}