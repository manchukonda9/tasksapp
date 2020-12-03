import React, { Component } from 'react';
import axios from 'axios';
class DashBoard extends Component {
    constructor() {
        super();
        this.state = {
            todosItem: [],
            text: "",
            edit: null,
            editIndex: ""
        }
    }
    componentDidMount() {
        this.getData()
    }
    getData = () => {
        axios.get("http://localhost:9000/Todos")
            .then((response) => {
               
                this.setState({ todosItem: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    onAdd = (event) => {
        event.preventDefault();
        if (this.state.text === "") {
            return
        }
        else if (this.state.editIndex !== "") {
            const editData = { id: this.state.editIndex, item: this.state.text }
            axios.put("http://localhost:9000/Todos/Edit/"+this.state.editIndex, editData)
                .then((res) => {
                    this.getData();
                })
        }
        else {
            const items = this.state.todosItem;
            const itemlength = items.length
            axios.post("http://localhost:9000/Todos/Add", {
                id: itemlength+3,
                item: this.state.text
            })
                .then(res => {
                    this.getData()
                })
        }
        this.setState({ text: "", edit: null, editIndex: '' })
    }
    whenChange = (event) => {
        this.setState({ text: event.target.value })
    }
    onEdit = (id) => {
        const todo = this.state.todosItem.find(v => {
            return id === v.id
        })
        const someText = todo.item;
        this.setState({ text: someText, editIndex: id, edit: true })
    }
    onDone = (id) => {
        const selectedItem = this.state.todosItem.find((item) => {
            return item.id === id;
        })
        if(selectedItem.item === this.state.text){
            this.setState({text: '', editIndex: "", edit: null})
        }
            axios.delete("http://localhost:9000/Todos/Done/"+id)
                .then((res) => {
                    this.getData();
                })
    }
    render() {
        return (
            <div>
                <div className="row">
                    <form onSubmit={this.onAdd}>
                        <div className="col s6 l6">
                        <input onChange={this.whenChange} placeholder="Enter New Item" value={this.state.text} />
                        </div>
                        <div className="col s6 l6">
                        <button className="btn">{this.state.edit ? ("Edit") : ("Add")}</button>
                        </div>
                    </form>
                </div>
                <table>
                    <tbody>
                    {this.state.todosItem.length > 0 ? (
                        this.state.todosItem.map((v, i) =>
                            <tr key={i} className="collection-item">
                            <td>{i+1}</td>
                            <td>{v.item}</td>
                            <td><button className="btn" onClick={() => this.onEdit(v.id)}>Edit</button></td>
                            <td><button className="btn" onClick={() => this.onDone(v.id)}>Done</button></td>
                            </tr>)
                    ) : (<tr><td>No Todos</td></tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default DashBoard;