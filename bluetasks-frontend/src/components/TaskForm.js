import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TaskService from '../api/TaskService';

class TaskForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            task: {
                id: 0,
                description: '',
                whenToDo: ''
            },
            redirect: false,
            btnName: 'Cadastrar'
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }

    componentDidMount() {
        const editId = this.props.match.params.id;
        if (editId) {
            const task = TaskService.load(~~editId);
            this.setState({ task: task, btnName: 'Alterar' });
        }
    }

    componentDidUpdate() {
        const editId = this.props.match.params.id;
        if (!editId && this.state.btnName !== 'Cadastrar') {
            const task = {
                id: 0,
                description: '',
                whenToDo: ''
            }
            this.setState({ task: task, btnName: 'Cadastrar' });
        }
    }

    onSubmitHandler(event) {
        event.preventDefault();
        TaskService.save(this.state.task);
        this.setState({ redirect: true });
    }

    onInputChangeHandler(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.setState(prevState => ({ task: { ...prevState.task, [field]: value } }));
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h1>Cadastrar Tarefa</h1>
                <form onSubmit={this.onSubmitHandler}>
                    <div className='form-group'>
                        <label htmlFor='description'>Descrição</label>
                        <input className='form-control' type='text' value={this.state.task.description} name='description' placeholder='Digite a descrição' onChange={this.onInputChangeHandler} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='whenToDo'>Data</label>
                        <input className='form-control' type='date' value={this.state.task.whenToDo} name='whenToDo' placeholder='Informe a data' onChange={this.onInputChangeHandler} />
                    </div>
                    <button type='submit' className='btn btn-primary'>{this.state.btnName}</button>
                    &nbsp;&nbsp;
                    <button type='button' className='btn btn-primary' onClick={() => this.setState({ redirect: true })}>Cancelar</button>
                </form>
            </div>
        );
    }
}

export default TaskForm;
