import React, { Component } from 'react';
import TaskService from '../api/TaskService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from 'react-router-dom';

class TaskListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            editId: 0
        }
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onStatusChangeHandler = this.onStatusChangeHandler.bind(this);
        this.onEditHandler = this.onEditHandler.bind(this);
    }

    render() {
        if (this.state.editId > 0) {
            return <Redirect to={`/form/${this.state.editId}`} />
        }
        return (
            <>
                <table className="table table-striped">
                    <TableHeader />
                    {this.state.tasks.length <= 0 ? 
                        <EmptyTableBody />
                    :
                        <TableBody tasks={this.state.tasks} onDelete={this.onDeleteHandler} onEdit={this.onEditHandler} onStatusChange={this.onStatusChangeHandler}/>}
                </table>
                <ToastContainer autoClose={1500} />
            </>    
        );
    }

    componentDidMount() {
        this.listTasks();
    }

    listTasks() {
        const tasks = TaskService.list();
        this.setState({ tasks: tasks });
    }

    onDeleteHandler(id) {
        if (window.confirm("Deseja excluir está tarefa?")) {
            TaskService.delete(id);
            this.listTasks();
            toast.success("Tarefa excluída!", { position: toast.POSITION.BOTTOM_LEFT });
        }
    }

    onStatusChangeHandler(task) {
        task.done = !task.done;
        TaskService.save(task);
        this.listTasks();
    }

    onEditHandler(id) {
        this.setState({editId: id});
    }
}

const TableHeader = () => {
    return (
        <thead className="thead-dark">
            <tr>
                <th scope="col">Status</th>
                <th scope="col">Descrição</th>
                <th scope="col">Data</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
    )
}

const TableBody = (props) => {
    return (
        <tbody>
            {props.tasks.map(task => 
                <tr key={task.id}>
                    <td><input type="checkbox" checked={task.done} onChange={() => props.onStatusChange(task)}/></td>
                    <td>{task.done ? <s>{task.description}</s> : task.description }</td>
                    <td>{task.done ? <s>{task.whenToDo}</s> : task.whenToDo }</td>
                    <td>
                        <input type="button" className="btn btn-warning" value="Editar" onClick={() => props.onEdit(task.id)}/>
                        &nbsp;
                        <input type="button" className="btn btn-danger" value="Excluir" onClick={() => props.onDelete(task.id)}/>
                    </td>
                </tr>    
            )}
        </tbody>
    )
}

const EmptyTableBody = (prop) => {
    return  (<tbody>
                <tr>
                    <td colSpan="4">Sem tarefas cadastradas no momento!</td>
                </tr>
            </tbody>);
}

export default TaskListTable;
