class Task {
    static instances= []
    constructor(title){
        this.title = title
        this.is_complete = false
        this.created_date = new Date()
        Task.instances.push(this)

    }
    static get_all_instances(){
        return Task.instances
    }
    static create() {
        let input = document.getElementById('form1').value
        new Task(input)
        document.getElementById('form1').value = " "
        tasks_view()
    }
    static delete(task){
        let tasks = Task.instances
        tasks.splice(task,1)
        tasks_view()
    }
    static finished(task){
        let tasks = Task.instances
        tasks[task].is_complete = true
        tasks_view()
    }
    static edit(task){
        const taskCell = document.getElementById(`task-title-${task}`);
        taskCell.innerHTML = `<input id="second-title-${task}" value="${Task.instances[task].title}">`;

        const buttonCell = document.getElementById(`edit-button-${task}`);
        buttonCell.outerHTML = `
            <td>
                <button type="submit" class="btn btn-warning ms-1"
                onclick="Task.ok_edit(${task})">Ok!</button>
            </td>`;
    }
    static ok_edit(task){
        let new_title = document.getElementById(`second-title-${task}`).value
        let tasks = Task.instances
        tasks[task].title = new_title
        tasks_view()
    }
}


let tasks_view =() =>{
    let tasks = Task.get_all_instances()
    const container = document.getElementById('container')
    container.innerHTML= `<thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Todo item</th>
                                        <th scope="col">Status</th>
                                        <th scope="col"></th>
                                        <th scope="col">    actions</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>    `
    
    for (task in tasks){
        container.insertAdjacentHTML("beforeend", `<tbody>
                                    <tr>

                                        <th scope="row">${Number(task)+1}</th>
                                        <td id="task-title-${task}">${tasks[task].title}</td>
                                    
                                        <td>${tasks[task].is_complete}</td>
                                        
                                        
                                        <td>
                                            <button  type="submit" class="btn btn-danger" onclick="Task.delete(${task})"> delete </button>
                                        </td>
                                        <td>
                                            <button type="submit" class="btn btn-success ms-1" onclick="Task.finished(${task})">Finished</button>
                                        </td>
                                        <td>
                                            <button type="submit" class="btn btn-warning ms-1" id ="edit-button-${task}"onclick="Task.edit(${task})">Edit</button>
                                        </td>
                                        
                                    </tr>

                        
                                    
                                </tbody>`);
    }
}