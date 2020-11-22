import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthService from '../api/AuthService';
import TaskService from '../api/TaskService';
import Alert from './Alert';
import Spinner from './Spinner';

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
            btnName: 'Cadastrar',
            alert: null,
            loading: false,
            saving: false
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }

    componentDidMount() {
        const editId = this.props.match.params.id;
        if (editId) {
            this.setState({ loading: true});
            TaskService.load(~~editId, 
                task => this.setState({ task: task, loading: false }),
                error => {
                    if (error.response){
                        if (error.response.status === 404) {
                            this.setErroState( "Tarefa não encontrada");
                        } else {
                            this.setErroState(`Erro ao carregar dados: ${error.messsage}`);
                        }
                    } else {
                        this.setErroState(`Erro na requisição: ${error.messsage}`);
                    }
                });

            this.setState({ btnName: 'Alterar' });
        }
    }

    setErroState(erro) {
        this.setState({ alert: erro, loading: false, saving: false });
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
        this.setState({ saving: true , alert: null });
        TaskService.save(this.state.task,
            () => this.setState({ redirect: true, saving: false }),
            error => {
                if (error.response) {
                    console.log(error.response);
                    this.setErroState(`Erro: ${error.response.data.error}`);
                } else {
                    this.setErroState(`Erro na requisição: ${error.messsage}`);
                }
            });

    }

    onInputChangeHandler(event) {
        const field = event.target.name;
        const value = event.target.value;

        this.setState(prevState => ({ task: { ...prevState.task, [field]: value } }));
    }

    render() {

        if(!AuthService.isAuthenticated()) {
            return <Redirect to="/login" />
        }

        if (this.state.redirect) {
            return <Redirect to='/' />
        }

        if(this.state.loading) {
            return <Spinner />
        }

        return (
            <div>
                <h1>Cadastrar Tarefa</h1>
                { this.state.alert != null ? <Alert message={ this.state.alert } /> : "" }
                <form onSubmit={this.onSubmitHandler}>
                    <div className='form-group'>
                        <label htmlFor='description'>Descrição</label>
                        <input className='form-control' type='text' value={this.state.task.description} name='description' placeholder='Digite a descrição' onChange={this.onInputChangeHandler} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='whenToDo'>Data</label>
                        <input className='form-control' type='date' value={this.state.task.whenToDo} name='whenToDo' placeholder='Informe a data' onChange={this.onInputChangeHandler} />
                    </div>
                    <button type='submit' className='btn btn-primary' disabled={this.state.saving}>
                        { this.state.saving ? <span className="spinner-border text-border-sm" role="status" aria-hidden="true"></span> 
                        : this.state.btnName }
                    </button>
                    &nbsp;&nbsp;
                    <button type='button' className='btn btn-primary' onClick={() => this.setState({ redirect: true })}>Cancelar</button>
                </form>
            </div>
        );
    }
}

export default TaskForm;
