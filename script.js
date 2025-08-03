document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  loadTasks();

  // Function to load tasks from localStorage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // don't re-save while loading
  }

  // Function to save tasks to localStorage
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
      const textNode = li.firstChild;
      if (textNode && textNode.nodeType === Node.TEXT_NODE) {
        tasks.push(textNode.textContent.trim());
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to add a new task
  function addTask(taskText, save = true) {
    if (!taskText || taskText.trim() === "") {
      alert("Please enter a task.");
      return;
    }

    // Create a new list item
    const listItem = document.createElement('li');

    // Add task text
    listItem.appendChild(document.createTextNode(taskText.trim()));

    // Create the remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.className = 'remove-btn';

    // Set up remove function on click
    removeButton.onclick = function () {
      taskList.removeChild(listItem);
      saveTasks(); // update localStorage after removal
    };

    // Append the remove button and list item
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    // Clear input field if task was typed
    if (save) {
      saveTasks(); // save updated task list
    }
    taskInput.value = "";
  }

  // Add task on button click
  addButton.addEventListener('click', function () {
    addTask(taskInput.value);
  });

  // Add task on Enter key press
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });
});
