class TaskService {

    constructor() {
        this.tasks = [
            { id: 1, description: "Tarefa 1", whenToDo: "2030-04-01", done: false },
            { id: 2, description: "Tarefa 2", whenToDo: "2030-04-01", done: true },
            { id: 3, description: "Tarefa 3", whenToDo: "2030-04-01", done: false }
        ]
    }

    list() {
        return this.tasks;
    }

    delete(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    save(task) {
        if(task.id !== 0) {
            this.tasks = this.tasks.map(t => task.id !== t.id ? t : task);
        } else {
            const taskId = Math.max(...this.tasks.map(t => t.id)) + 1;
            task.id = taskId;
            this.tasks.push(task);
        }
    }

    load(id) {
        return this.tasks.filter(t => t.id === id)[0];
    }
}

export default new TaskService();
