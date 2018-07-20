//event listeners

window.onload = function(){
    const todosContainer = document.getElementById('todos-container');
    
    
    //
    fetch('/get-todos')
    .then(response => response.json())
    .then(response => {
        console.log(response);

        response.forEach(todo => {
            let container = this.document.createElement('div');
            container.id = todo.id;
            container.classList.add('todo'); 

            let checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.id = "checkbox-" + todo.id;
            checkbox.checked = todo.done;
            checkbox.onchange = function (e){
                console.log('check box' + todo.id + ' click');
                console.log(checkbox.checked);
                //after checked update and delete from the list
                fetch('/todo-update', {
                    method: 'POST',
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        id: todo.id,
                        done: checkbox.checked
                    })
                })
                .then (response => response.json())
                .then (response  => {
                    console.log(response);
                })
                .catch(error => console.error(error))
            }



            let text = document.createElement('div');
            text.innerHTML = todo.text;

            let btn = document.createElement('button');
            btn.id = "btn-" + todo.id;
            btn.innerHTML = 'X';
            btn.onclick = function() {
                fetch('/delete-todo', {
                    method: 'DELETE',
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        id: todo.id,
                    })
                })
                .then (response => response.json())
                .then (response  => {
                    console.log(response);
                    if (response.affectedRows){
                        container.remove();
                    }                   
                    
                })
                .catch(error => console.error(error));
            }

            container.appendChild(checkbox);
            container.appendChild(text);
            container.appendChild(btn);

            todosContainer.appendChild(container);
            
        });

        function createTodo(){
            console.log('add todo');
            if (newTodoInput.value)
        }


    });

    
}

