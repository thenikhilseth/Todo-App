(function(){
	let tasks = [];
	const taskList = document.getElementById('list');
	const addTaskInput = document.getElementById('add');
	const tasksCounter = document.getElementById('tasks-counter');

	console.log('Working');
	var a=10
	console.log(a);

	// function fetchTodos(){

	// 	//GET
	// 	fetch('https://jsonplaceholder.typicode.com/todos').then((response)=>{
	// 		console.log(response); //data is in json format
	// 		return response.json();

	// 	}).then((realData)=>{
	// 		console.log(realData); //if you check in console- real data is an array of objects, therefore we are using slice below
	// 		tasks= realData.slice(0,10) // we only need first 10 objects of array real data.
	// 		renderList();

	// 	}). catch((reason)=>{
	// 		console.log(`The error is ${reason}`)
	// 	})
	// }

	/*Explanation of fetchTodos()-
	a) If you check in console- real data is an array of objects and each object contains id, title and completed.
	b) You can copy the link and check it on google
	c) Because realData is an array, therefore we are using slice to get only the first 10 task objects to store in tasks array
	*/



	//NOW LET'S WRITE THE ABOVE FUNCTION fetchTodos() in a more simpler way using async/ await.


	async function fetchTodos(){
		//GET DATA
		try{
			const response= await fetch('https://jsonplaceholder.typicode.com/todos'); //fetch is returning a Promise
			const realData= await response.json(); //response.json() is also returning a Promise
			tasks= realData.slice(0,10);
			renderList();
		}
		catch(reason){
			console.log(`The error in this function is ${reason}`)
		}

	}






	function addTaskToDOM(task){
		const li= document.createElement('li');

		li.innerHTML= 
		`<input type="checkbox" id="${task.id}"  ${task.completed ? 'checked':''} class="custom-checkbox">
	    <label for="${task.id}"> "${task.title}" </label>
	    <img src="bin.png" class="delete" data-id="${task.id}" />`

	    taskList.append(li);
	}



	function renderList () {
		taskList.innerHTML ='';
		for(let i=0; i<tasks.length; i++){
			addTaskToDOM(tasks[i]);
		}

		tasksCounter.innerHTML= tasks.length;
	}






	function markTaskStatus (taskId) {

		const task_index= tasks.findIndex(function(task){
			return task.id== taskId;
		})

		if (tasks[task_index].completed){
			tasks[task_index].completed= false;
			showNotification('Task has been marked as uncompleted')
			renderList();
			return
		}
		else{
			tasks[task_index].completed= true;
			showNotification('Task has been marked as Completed')
			renderList();
			return
		}
		showNotification('task toogling unsuccessful ')
	}


	// Another way- By Professor

	// function markTaskStatus (taskId) {
	// 	const task= tasks.filter(function(task){
	// 		return task.id== taskId;
	// 	})
	// 	if (task.length>0){
	// 		const currentTask= task[0];
	// 		currentTask.completed=! currentTask.completed;
	// 		renderList()
	// 		showNotification('Task toogled successfully')
	// 		return
	// 	}
	// 	showNotification('Task toogle unsuccessful')
	// }






	function deleteTask (taskId) {
		const new_tasks= tasks.filter(deleteFunc);
		function deleteFunc(task, index,array) {
			return task.id!= taskId;
		}
		tasks= new_tasks;
		showNotification('Task has been deleted');
		renderList();
	}



	function addTask (task) {
	    if (task) {
	        tasks.push(task);
	        renderList();
	        showNotification('Task is added')
	        return;
	    }
	    showNotification('Task cannot be added');


	}

	function showNotification(title) {
	    alert(title);
	}

	function handleInputKeyPress(e) {
	    if (e.key=='Enter'){
	        const title= e.target.value;
	        console.log('title:', title);
	        
	        if (title==null){
	        showNotification('Task cannot be empty');
	        return;
	        } 

	        const task= {
	            title:title,
	            id: Date.now().toString(),
	            completed: false
	        }
	        e.target.value=' ';
	        addTask(task);
	    }
	}


	function handleClickListener(event){
		const target= event.target;
		if (target.className== 'custom-checkbox'){
			const taskId= target.id; //event.target.value(here-id) always return the value in the form of string
			markTaskStatus(taskId);
			return;
		}
		else if (target.className=='delete') {
			deleteTask(target.dataset.id);
			return;
		}
	}



	function initializeApp() {
		addTaskInput.addEventListener('keyup', handleInputKeyPress);
		document.addEventListener('click', handleClickListener);
		fetchTodos();

	}

	initializeApp();

})();





