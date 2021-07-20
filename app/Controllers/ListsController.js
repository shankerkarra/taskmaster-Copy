import { ProxyState } from "../AppState.js";
import { listsService } from "../Services/ListsService.js";
import { loadState, saveState } from "../Utils/LocalStorage.js"


function _draw() {
  let lists = ProxyState.lists;
  let template = ''
  lists.forEach(l => template += l.Template)
  document.getElementById("Lists").innerHTML = template
}

export default class ListsController {
  constructor() {
    //  console.log(" List Controller - Constructor")
    ProxyState.on("lists", _draw)
    ProxyState.on('tasks', _draw)
    ProxyState.on('lists', saveState)
    ProxyState.on('tasks', saveState)

    loadState()
    // Call function to Refresh the 
    // listsService.refreshTaskcnt()
  }
  addList() {
    event.preventDefault();
    let form = event.target
    let userinput = {
      name: form.listname.value,
      color: form.colorselected.value
    }
    listsService.addList(userinput)
    form.reset()
  }

  handleChange(e) {
    // console.log("TEsting")
    const { checked } = e.target;
    // console.log(checked);
    // console.log(e.target.id);
    // console.log(e);
    listsService.toggleCheckbox(e.target.id, checked);
  }

  delList(id) {
    var result = confirm("Press a button!");
    if (result == true) {
      listsService.delList(id)
    }
  }

  // mycbClick(elem) {
  //     event.preventDefault()
  //   var checkBox = elem;
  //   var p = document.getElementsByTagName('p')[1];
  //   if (checkBox.checked == true) {
  //     listsService.toggleCheckbox(elem.id, elem.checked);
  //     //form.reset()
  //   }
  // }

  addTask(listId) {
    event.preventDefault()
    let form = event.target
    let listTask = {
      listId,
      name: form.task.value,
      checked: false,
      totalcount: 1,
      checkedcnt: 0
    }
    listsService.addTask(listTask)
    //update the list Totalcount
    form.reset()
  }

  delTask(id) {
    var result = confirm("Press a button!");
    if (result == true) {
      listsService.delTask(id)
    }
  }

  //call method to update Totalcount Based on ID


}