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

            <main className="uk-main">
                <div className="uk-section">
                    <div className="uk-container">
                        <div className="uk-margin-medium-bottom uk-flex">
                            <form
                                className="uk-search uk-search-default uk-width-medium uk-margin-remove uk-margin-right">
                                <span data-uk-search-icon/>
                                <input className="uk-search-input" type="search" placeholder="Search..."/>
                            </form>
                            <select className="uk-select uk-width-small uk-margin-auto-left">
                                <option value="asc">ASC</option>
                                <option value="desc">DESC</option>
                            </select>
                            <select className="uk-select uk-width-small uk-margin-left">
                                <option value={5}>6</option>
                                <option value={10}>12</option>
                                <option value={20}>24</option>
                            </select>
                            <div className="uk-button-group uk-margin-left">
                                <button className="uk-button uk-button-default">
                                    <span uk-icon="icon:  grid"/>
                                </button>
                                <button className="uk-button uk-button-default uk-active">
                                    <span uk-icon="icon:  list"/>
                                </button>
                            </div>
                        </div>

                        {this.filterTodosBySearch(todos, search).map((todo, i) =>
                            <>
                            <div className="uk-grid uk-child-width-1-2@s uk-child-width-1-2@m">
                                <div key={todo.id}>
                                    <a href="#"
                                       className="uk-card uk-card-default uk-margin-medium-bottom uk-child-width-1-2@s uk-grid-collapse uk-margin"
                                       data-uk-grid>

                                        <div>
                                            <div className="uk-card-media-left uk-cover-container">
                                                <img src="https://picsum.photos/600/400" alt="" data-uk-cover/>
                                                <canvas width="600" height="400"></canvas>
                                            </div>

                                                    {this.state.edit != i ?
                                                        <Text item={todo}/>
                                                        :
                                                        <Field item={todo}
                                                               onChange={i => this.onChange(window.event, i)}
                                                               index={i}
                                                               onDelete={this.onDelete}
                                                        />
                                                    }
                                        </div>
                                    </a>
                                </div>
                            </div>
                            </>
                            )
                            }



                            < ul className="uk-pagination uk-flex-center uk-flex-middle" data-uk-margin>
                            <li>
                            <a href="#"><span data-uk-pagination-previous /></a>
                            </li>
                            <li><a href="#">1</a></li>
                            {/* <li class="uk-disabled"><span>...</span></li> */}
                            <li><a href="#">5</a></li>
                            <li><a href="#">6</a></li>
                            <li className="uk-active"><span>7</span></li>
                            <li><a href="#">8</a></li>
                            <li>
                            <a href="#"><span data-uk-pagination-next /></a>
                            </li>
                            </ul>
                            </div>
                            </div>
                            </main>

                            /*<div className="uk-card-media-left uk-cover-container">


                            <main className="uk-main">
                            <div className="uk-section">
                            <div className="uk-container">
                            <div className="uk-margin-medium-bottom uk-flex">
                            <form
                            className="uk-search uk-search-default uk-width-medium uk-margin-remove uk-margin-right"
                            >
                            <span data-uk-search-icon></span>
                            <input
                            className="uk-search-input"
                            type="search"
                            placeholder="Search..."
                            />`
                            <input
                            className="uk-search-input"
                            type="search"
                            placeholder="Search entire site..."
                            name="search"
                            id="search"
                            value={search}
                            onChange={this.handleSearchChange}/>

                            <br/>
                            <input value={inputText} name="entry" id="entry"
                            onChange={this.handleChange}/>
                            <button className="uk-button-primary" onClick={this.onAdd}>Add</button>

                            </form>
                            <select className="uk-select uk-width-small uk-margin-auto-left">
                            <option value="asc">ASC</option>
                            <option value="desc">DESC</option>
                            </select>
                            <select className="uk-select uk-width-small uk-margin-left">
                            <option value="5">6</option>
                            <option value="10">12</option>
                            <option value="20">24</option>
                            </select>
                            <div className="uk-button-group uk-margin-left">
                            <button className="uk-button uk-button-default">
                            <span uk-icon="icon:  grid"></span>
                            </button>
                            <button className="uk-button uk-button-default uk-active">
                            <span uk-icon="icon:  list"></span>
                            </button>
                            </div>
                            </div>
                            <div className="uk-grid uk-child-width-1-2@s uk-child-width-1-2@m">
                            <div>


                            <a
                            href="#"
                            className="uk-card uk-card-default uk-margin-medium-bottom uk-child-width-1-2@s uk-grid-collapse uk-margin"
                            data-uk-grid
                            >


                            {this.filterTodosBySearch(todos, search).map((todo, i) =>
                            <>
                            <div>
                            <div className="uk-card-media-left uk-cover-container">
                            <img src="https://picsum.photos/600/400" alt="" data-uk-cover/>
                            <canvas width="600" height="400"></canvas>
                            </div>
                            <div className="uk-card-body">
                            <h3 className="uk-card-title">Media Left</h3>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt.

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

                            </p>
                            </div>
                            </div>
                            </>
                            )
                            }


                            </a>
                            </div>

                            </div>
                            <ul className="uk-pagination uk-flex-center uk-flex-middle" uk-margin>
                            <li>
                            <a href="#"><span uk-pagination-previous></span></a>
                            </li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">5</a></li>
                            <li><a href="#">6</a></li>
                            <li className="uk-active"><span>7</span></li>
                            <li><a href="#">8</a></li>
                            <li>
                            <a href="#"><span uk-pagination-next></span></a>
                            </li>
                            </ul>
                            </div>
                            </div>
                            </main>


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
                            </div>*/
                            )
                            }
                            }

                            export default App;

