let taskForm = document.getElementById('taskForm'),
    taskInput = document.getElementById('taskInput'),
    taskList = document.getElementById('taskList');

window.addEventListener('DOMContentLoaded', () => {
  let t = JSON.parse(localStorage.getItem('tasks')) || [];
  t.forEach(x => createTaskElement(x.text, x.time));
});

function createTaskElement(a, b) {
  let l = document.createElement('li'),
      v = b || getCurrentTime();
  l.innerHTML = `
    <div class="task-main">
      <span>${a}</span>
      <small class="task-time">${v}</small>
    </div>
    <div class="actions">
      <span class="edit">Edit</span>
      <span class="delete">Delete</span>
    </div>
  `;
  l.querySelector('.delete').addEventListener('click', () => {
    l.remove();
    deleteTaskFromStorage(a);
  });
  l.querySelector('.edit').addEventListener('click', () => {
    let s = l.querySelector('span'),
        n = prompt('Yangi matn kiriting:', s.textContent);
    if (n && n.trim() !== '') {
      updateTaskInStorage(a, n.trim());
      s.textContent = n.trim();
    }
  });
  taskList.appendChild(l);
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  let tx = taskInput.value.trim(),
      tm = getCurrentTime();
  if (tx !== '') {
    createTaskElement(tx, tm);
    saveTaskToStorage(tx, tm);
    taskInput.value = '';
  }
});

function saveTaskToStorage(t, m) {
  let arr = JSON.parse(localStorage.getItem('tasks')) || [];
  arr.push({ text: t, time: m });
  localStorage.setItem('tasks', JSON.stringify(arr));
}
     
function deleteTaskFromStorage(txt) {
  let a = JSON.parse(localStorage.getItem('tasks')) || [];
  a = a.filter(i => i.text !== txt);
  localStorage.setItem('tasks', JSON.stringify(a));
}

function updateTaskInStorage(o, n) {
  let d = JSON.parse(localStorage.getItem('tasks')) || [],
      i = d.findIndex(e => e.text === o);
  if (i !== -1) {
    d[i].text = n;
    localStorage.setItem('tasks', JSON.stringify(d));
  }
}

function getCurrentTime() {
  let d = new Date(),
      t = d.toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      dt = d.toLocaleDateString('uz-UZ');
  return `${t} ${dt}`;
}
