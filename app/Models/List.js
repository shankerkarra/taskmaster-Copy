import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/GenerateId.js"

export default class List {
  constructor({ name, color, id = generateId(), totalcount, checkedcnt }) {
    //  console.log(" Constructor in List.js" + name + " " + color)
    this.name = name
    this.color = color
    this.id = id
    this.totalcount += totalcount
    this.checkedcnt += checkedcnt
  }
  get Template() {
    return /*html*/`
      <div class="card">
            <div class="card border-black mb-3">
                <div class="card-header text-center ${this.color}" id="listtasktitle">
                ${this.name}
                  <p class="card-text card-wrap" id=${this.id}> 2/4 </p>
                            <i class="fa fa-trash action text-danger" title="delete list" onclick="app.listsController.delList('${this.id}')"></i>
                </div>
                  <div class = "card p-3">
                     ${this.MyTask}
                  </div>
                  <form onsubmit="app.listsController.addTask('${this.id}')">
                  <input type="text" minlength="3" and maxlength="50" name="task" placeholder="Add Task..." required>
                  <button type="submit" class="btn btn-outline-success">+</button>
                  </form>
                </div>
              </div>
        `
  }

  get MyTask() {
    let template = ''
    let tasksTotal = 0
    let tasks = ProxyState.tasks.filter(tasks => tasks.listId === this.id)
    tasks.forEach(t => {
      template += t.Template
      tasksTotal += 1
    })
    return template
  }
}
