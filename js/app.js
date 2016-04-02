//Problem: User interaction doesn't provide desired results
//Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById('new-task') //newtask
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById('incomplete-tasks'); //#incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks') //#completed-tasks

//New task list item
var createNewTaskElement = function(taskString){
  //Create list item
  var listItem = document.createElement('li');

  //Input (checkbox)
  var checkBox = document.createElement('input'); //checkbox
  //Label
  var label = document.createElement('label');
  //Input (text)
  var editInput = document.createElement('input'); //text
  //Button.edit
  var editButton = document.createElement('button');
  //Button.delete
  var deleteButton = document.createElement('button');

  //Each element needs modifying
  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  label.innerText = taskString;


  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}


//Add a new task
var addTask = function() {
  console.log("add task");
    //Create a new list item with the text from the new task
    var listItem = createNewTaskElement(taskInput.value)

    //append li to incompleteTasksHolder
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

}

//Edit an existing task
var editTask = function() {
  console.log("edit task");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label     = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    //If the class of the parent (li) is in edit modified
      //Switch back from .editmode
      //Make the label's text become input value
      label.innerText = editInput.value;
    } else {
    //Else
      //Switch to .editmode
      //Input value becomes the label's text
      editInput.value = label.innerText;
    }
  //Toggle's the li editmode
  listItem.classList.toggle("editMode");
}

//Delete an existing task
var deleteTask = function() {
  console.log("delete task");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //Remove the parent (li) from the ul
  ul.removeChild(listItem);
}

//Mark a task as complete
var taskCompleted = function() {
  console.log("complete task");
    //Append the taks (li) to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskIncomplete);
}

//Mark a task as incomplete
var taskIncomplete = function() {
  console.log("incomplete task");
    //Append the tasks (li) to the #uncomplete-tasks
    var listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Binding list item events");
  //for each list item
    //Select taskklistitem's children
var checkBox = taskListItem.querySelector("input[type=checkbox]");
var editButton = taskListItem.querySelector("button.edit");
var deleteButton = taskListItem.querySelector("button.delete");
    //Bind editTask to edit button
    editButton.onclick = editTask;
    //Bind deleteTask to delete button
    deleteButton.onclick = deleteTask;
    //Bind checkBoxEventHandler to checkbox
    checkBox.onchange = checkBoxEventHandler;
}

//Set the click handler to the addTask function

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

//cycle over the incompleteTasksHolder UL items
for (var i = 0; i < incompleteTasksHolder.children.length; i ++) {
    //Bind events to list items children (taskCompleted)
    bindTaskEvents(incompleteTasksHolder.children[i],taskCompleted)
}

for (var i = 0; i < completedTasksHolder.children.length; i ++) {
   //Bind events to list items children (taskIncomplete)
   bindTaskEvents(completedTasksHolder.children[i],taskIncomplete)
}
