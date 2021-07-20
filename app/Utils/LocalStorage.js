import { ProxyState } from "../AppState.js";
import List from "../Models/List.js";
import Task from "../Models/Task.js";

export function saveState() {
  localStorage.setItem('Skliststasks1', JSON.stringify({
    lists: ProxyState.lists,
    tasks: ProxyState.tasks
  }))

}

export function loadState() {
  let data = JSON.parse(localStorage.getItem('Skliststasks1'))
  if (data != null) {
    ProxyState.lists = data.lists.map(l => new List(l)),
      ProxyState.tasks = data.tasks.map(t => new Task(t))
  }

}