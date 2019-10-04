const {log} = console,
      addList = document.querySelector('.add-todo'),
      toDoBlock = document.querySelector('.todo-block');

let toDoList = [];

if(localStorage.getItem('todo')) {
	toDoList = JSON.parse(localStorage.getItem('todo'));
	renderToDo();
}

addList.addEventListener('click', function() {
	let title = prompt('Введите название дела: ', '');
	if(title === '' || title === null) {
		return false;
	}

	let todo = {
		title: title,
		id: `${Date.now()}${Math.random() * 999}`,
		completed: false,
		checkId: `${Math.random() * 9999999999}`
	}
	toDoList.push(todo);
	renderToDo();
	localStorage.setItem('todo', JSON.stringify(toDoList));
});

function renderToDo() {
	let renderStr = '';
    if (toDoList.length === 0) {
		toDoBlock.innerHTML = '';
	}
	toDoList.forEach(item => {
		renderStr += ` 
		    <div class="todo__element">
		        <h3 class="${item.completed ? 'active-h3' : ''}">${item.title}</h3>
		        <div class="todo__right">
		            <input type="checkbox" class="todo__check ${item.completed ? 'active-check' : ''}" id="${item.checkId}"/>
		            <div class="close" id="${item.id}"></div>
		        </div>
		    </div>
		`;
		toDoBlock.innerHTML = renderStr;
	});
}

toDoBlock.addEventListener('click', function(e){
	toDoList.forEach((item, i) => {
		if(e.target.classList.contains('close')) {
			if(+e.target.id == +item.id) {
				toDoList.splice(i, 1);
				renderToDo();
				localStorage.setItem('todo', JSON.stringify(toDoList));
			}
		}
		if(e.target.classList.contains('todo__check')) {
			if(+e.target.id === +item.checkId) {
				item.completed = !item.completed;
				renderToDo();
				localStorage.setItem('todo', JSON.stringify(toDoList));
			}
		}
	});
});