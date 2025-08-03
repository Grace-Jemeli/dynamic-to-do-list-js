// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task
  function addTask() {
    // Get the trimmed task text
    const taskText = taskInput.value.trim();

    // Check if the input is not empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new list item
    const listItem = document.createElement('li');

    // Add task text as a text node (instead of textContent)
    listItem.appendChild(document.createTextNode(taskText));

    // Create the remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.className = 'remove-btn';

    // Set up remove function on click
    removeButton.onclick = function () {
      taskList.removeChild(listItem);
    };

    // Append the remove button to the list item
    listItem.appendChild(removeButton);

    // Append the list item to the task list
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = "";
  }

  // Add task on button click
  addButton.addEventListener('click', addTask);

  // Add task on Enter key press
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
