import axios from "axios";
import { API_ENDPOINT } from "../constants";
import AuthService from "./AuthService";

class TaskService {

    constructor() {
        this.tasks = [
            { id: 1, description: "Tarefa 1", whenToDo: "2030-04-01", done: false },
            { id: 2, description: "Tarefa 2", whenToDo: "2030-04-01", done: true },
            { id: 3, description: "Tarefa 3", whenToDo: "2030-04-01", done: false }
        ]
    }

    list(onFetch, onError) {
        axios.get(`${API_ENDPOINT}/tasks?sort=whenToDo,asc`, this._buildAuthHeader())
             .then(response => { onFetch(response.data._embedded.tasks)})
             .catch(e => onError(e));
    }

    delete(id, onDelete, onError) {
        axios.delete(`${API_ENDPOINT}/tasks/${id}`, this._buildAuthHeader())
             .then(() => onDelete())
             .catch(e => onError(e));
    }

    save(task, onSave, onError) {
        if(task.id === 0) {
            axios.post(`${API_ENDPOINT}/tasks`, task, this._buildAuthHeader())
                 .then(() => onSave())
                 .catch(e => onError(e));
        } else {
            axios.put(`${API_ENDPOINT}/tasks/${task.id}`, task, this._buildAuthHeader())
                 .then(() => onSave())
                 .catch(e => onError(e));
        }
    }

    load(id, onLoad, onError) {
        axios.get(`${API_ENDPOINT}/tasks/${id}`, this._buildAuthHeader())
             .then(response => onLoad(response.data))
             .catch(e => onError(e));
    }

    _buildAuthHeader() {
        return {
            headers: {
                'Authorization': `Bearer ${AuthService.getJWTToken()}`
            }
        }
    }
}

export default new TaskService();
