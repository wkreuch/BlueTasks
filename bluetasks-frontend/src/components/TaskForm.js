import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../hooks/useAuth';
import { useTask } from '../hooks/useTask';
import Alert from './Alert';

export const TaskForm = (props) => {
    const auth = useContext(AuthContext);
    const [task, setTask ] = useState({ id: 0, description: "", whenToDo: "" });
    const tasks = useTask();
    const [redirect, setRedirect ] = useState(false);

    useEffect(() =>{
        const editId = props.match.params.id;
        if (editId && auth.credentials.username !== null) {
            tasks.load(~~editId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[auth.credentials]);

    useEffect(() => {
        if (tasks.taskLoaded) {
            setTask(tasks.taskLoaded);
            tasks.clearTaskLoaded();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tasks.taskLoaded]);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        tasks.save(task);
    };

    const onInputChangeHandler = (event) => {
        const field = event.target.name;
        const value = event.target.value;
        setTask({...task, [field]: value});
    };

    if(!auth.isAuthenticated()) {
        return <Redirect to="/login" />
    }

    if (redirect || tasks.taskUpdated ) {
        return <Redirect to='/' />
    }

    return (
        <div>
            <h1>Cadastrar Tarefa</h1>
            { tasks.error != null ? <Alert message={ tasks.error } /> : "" }
            <form onSubmit={onSubmitHandler}>
                <div className='form-group'>
                    <label htmlFor='description'>Descrição</label>
                    <input className='form-control' type='text' value={task.description} name='description' placeholder='Digite a descrição' onChange={onInputChangeHandler} />
                </div>
                <div className='form-group'>
                    <label htmlFor='whenToDo'>Data</label>
                    <input className='form-control' type='date' value={task.whenToDo} name='whenToDo' placeholder='Informe a data' onChange={onInputChangeHandler} />
                </div>
                <button type='submit' className='btn btn-primary' disabled={tasks.processing}>
                    { tasks.processing ? <span className="spinner-border text-border-sm" role="status" aria-hidden="true"></span> 
                    : task.id === 0 ? "Gravar" : "Alterar" }
                </button>
                &nbsp;&nbsp;
                <button type='button' className='btn btn-primary' onClick={() => setRedirect(true) }>Cancelar</button>
            </form>
        </div>
    );
};
