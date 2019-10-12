import React, {Component} from 'react';
import './App.css'
import Field from './Field'
import Text from './Text'

class App extends Component {
    state = {
        todos: [],
        edit: -1,
        inputText: '',
        search: ''
    }

    getTodos = () => {
        return fetch(`https://jsonplaceholder.typicode.com/todos`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({todos: response})
            })
            .catch(err => alert(err))
    }

    onAdd = () => {
        const txt = this.state.inputText  //document.getElementById('entry').value
        if (txt.trim() == '') {
            return alert('Please enter a text first')
        }
        const todos = this.state.todos.slice();
        todos.unshift({
            'id': todos.length + 1,
            'title': txt,
            'userId': 11,
            'completed': false
        })
        this.setState({todos, inputText: ''})
    }

    onDelete = (i) => {
        const res = window.confirm(`Delete row ${i + 1}?`)
        if (res) {
            const newTodos = this.state.todos.slice()
            newTodos.splice(i, 1)
            this.setState({todos: newTodos})
        }
    }

    onChange = (event, index) => {
        const todos = this.state.todos.slice()
        todos[index].title = event.target.value
        this.setState({todos})
    }

    componentDidMount() {
        this.getTodos()
    }

    handleChange = (event) => {
        this.setState({inputText: event.target.value})
    }

    handleSearchChange = (event) => {
        this.setState({search: event.target.value})
    }

    filterTodosBySearch = (todos, search) => {
        if (search != '') {
            return todos.filter(todo => todo.title.toLowerCase().includes(search))
        }
        return todos
    }

    render() {
        const {inputText, search, todos} = this.state

        return (
            <div className="uk-card-media-left uk-cover-container">
                Search <input
                              type="text"
                              name="search"
                              id="search"
                              value={search}
                              onChange={this.handleSearchChange}/>

                <br/>
                <input value={inputText} name="entry" id="entry"
                       onChange={this.handleChange}/>
                <button class="uk-button-primary" onClick={this.onAdd}>Add</button>
                <ol>
                    To Do List:
                    {this.filterTodosBySearch(todos, search).map((todo, i) =>
                        <>
                            <li onClick={() => {
                                this.setState({edit: i})
                            }}>
                                {this.state.edit != i ?
                                    <Text item={todo}/>
                                    :
                                    <Field item={todo}
                                           onChange={i => this.onChange(window.event, i)}
                                           index={i}
                                           onDelete={this.onDelete}
                                    />
                                }
                            </li>
                        </>
                    )
                    }
                </ol>
            </div>
        )
    }
}

export default App;

