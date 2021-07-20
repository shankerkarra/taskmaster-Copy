import { ProxyState } from "../AppState.js"
import List from "../Models/List.js"
import Task from "../Models/Task.js"

class ListsService {
  addList(userinput) {
    //   console.log(" List Service - addList" + userinput)
    ProxyState.lists = [...ProxyState.lists, new List(userinput)]
  }
  delList(id) {
    console.log(id)
    ProxyState.lists = ProxyState.lists.filter(lists => lists.id != id)
    ProxyState.tasks = ProxyState.tasks.filter(tasks => tasks.listId != id)
  }
  addTask(rawTask) {
    ProxyState.tasks = [...ProxyState.tasks, new Task(rawTask)]
    //  this.countTask(rawTask)
  }
  delTask(id) {
    ProxyState.tasks = ProxyState.tasks.filter(t => t.id != id)
    //  this.countTask(rawTask)
  }

  // New method created to fetch all ListId and calculate the counts.
  refreshTaskcnt() {
    let result = ProxyState.lists.map(lId => { return { id: lId.id } });
    console.log(result[0].id)
    for (let i = 0; i < result.length; i++) {
      //     let nresult = ProxyState.lists.filter(t => t.listId == id)
      //    console.log(nresult)
      // debugger;
      let fid = result[i].id
      let totalcount = ProxyState.tasks.filter(t => t.listId == fid)
      if (totalcount.length == undefined) {
        totalcount = 0;
      }
      else {
        totalcount = totalcount.length
      }
      let chkcount = ProxyState.tasks.filter(t => t.listId == fid && t.checked === true)
      if (chkcount.length == undefined) {
        chkcount = 0;
      }
      else {
        chkcount = chkcount.length
      }
      document.getElementById(fid).innerText = chkcount + "/" + totalcount
    }
  }

  toggleCheckbox(elem, checked) {
    //debugger;
    let chngTask = ProxyState.tasks.find(t => t.id == elem)
    if (chngTask.checked === checked) {
      chngTask.checked = false;
    }
    else {
      chngTask.checked = checked;
    }
    ProxyState.tasks = ProxyState.tasks
    //  this.cntTask(chngTask.listId)
    //   this.updateCheckedCnt(chngTask.listId, checked)
  }
  // updateTotalcnt(listId) {
  //   let chngTask = ProxyState.lists.find(t => t.id == listId)
  //   if (chngTask.checkedcnt == NaN || chngTask.checkedcnt == 'Null') {
  //     chngTask.checkedcnt = 0;
  //   }
  // }

  // updateCheckedCnt(listId, Checked) {
  //   //  debugger;

  //   let chngTaskck = ProxyState.lists.find(t => t.id == listId)
  //   if (chngTaskck.checkedcnt == 'NaN' || chngTaskck.checkedcnt == 'Null') {
  //     chngTaskck.checkedcnt = 0;
  //   }
  //   if (Checked == true) {
  //     chngTaskck.checkedcnt += 1
  //   }
  //   else {
  //     if (chngTaskck.checkedcnt > 0) {
  //       chngTaskck.checkedcnt -= 1;
  //     }
  //     // else {
  //     //   chngListchk.checkedcnt = 0;
  //     // }
  //   }
  //   ProxyState.lists = ProxyState.lists
  // }



  cntTask(listId) {
    let totalcount = ProxyState.tasks.filter(t => t.listId == listId)
    if (totalcount.length == undefined) {
      totalcount = 0;
    }
    else {
      totalcount = totalcount.length
    }
    let chkcount = ProxyState.tasks.filter(t => t.listId == listId && t.checked === true)
    if (chkcount.length == undefined) {
      chkcount = 0;
    }
    else {
      chkcount = chkcount.length
    }
    document.getElementById(listId).innerText = chkcount + "/" + totalcount
  }

  // countTask({ listId }) {
  //   let totalcount = ProxyState.tasks.filter(t => t.listId == listId)
  //   if (totalcount.length == undefined) {
  //     totalcount = 0;
  //   }
  //   else {
  //     totalcount = totalcount.length
  //   }
  //      console.log("Total Count :" + totalcount.length)

  //   let chkcount = ProxyState.tasks.filter(t => t.listId == listId && t.checked == true)
  //   if (chkcount.length == undefined) {
  //     chkcount = 0;
  //   }
  //   else {
  //     chkcount = chkcount.length
  //   }
  //   document.getElementById(listId).innerText = chkcount + "/" + totalcount
  // }
  //   mycbClick(id, text) {
  //     var checkBox = document.getElementById(id);
  //     var text = document.getElementById("text");
  //     if (checkBox.checked === true) {
  //       const el = chngTask[i];
  //       const index = chngTask.findIndex(elm => el['id'] === elm['id']);
  //       text.style.display = "block";
  //     } else {
  //       text.style.display = "none";
  //     }
  //   }


}

export const listsService = new ListsService();
