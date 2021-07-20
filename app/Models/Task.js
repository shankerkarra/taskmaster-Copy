import { generateId } from "../Utils/GenerateId.js"

export default class Task {
  constructor({ name, listId, checked, id = generateId() }) {
    this.id = id
    this.listId = listId
    this.name = name
    this.checked = checked || false
  }


  get Template() {
    return `
        <div class="custom-control custom-checkbox" style="width:15rem;" >
          <input type="checkbox" class="custom-control-input"
          id=${this.id} value=""${this.checked ? 'checked' : ""} onchange="app.listsController.handleChange(event)">
          <label class="custom-control-label col-10" for=${this.id}>${this.name}</label>
          <i class="fa fa-trash action text-danger" title="delete list" onclick="app.listsController.delTask('${this.id}')"></i>
  </div>
`
  }
}