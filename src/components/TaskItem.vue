<template>
<div class="task-container" :class="{ 'done-task' : task.is_complete }">
    <textarea class="inactive-title-task-input" v-if="!editMode" type="text" v-model="taskTitle"></textarea>
        <textarea class="active-title-task-input" v-else type="text" v-model="taskTitle"></textarea>
    <textarea class="inactive-description-task-input" v-if="!editMode" type="text" v-model="taskDescription" cols="30" rows="5"></textarea>
        <textarea class="active-description-task-input" v-else type="text" v-model="taskDescription" cols="30" rows="5"></textarea>


    
    <div class="buttons-task-item">
        <div @click="$emit('toggleCompleted', task.id, task.is_complete)" class="task-btn done"><img src="../assets/images/cheque.png" alt="Done Task Logo"></div>
        <div v-if="!editMode" @click="editTask" class="task-btn edit"><img src="../assets/images/rebautizar.png" alt="Done Task Logo"></div>
        <div v-else @click="saveTask" class="task-btn done"><img src="../assets/images/disquete.png" alt="Done Task Logo"></div>
        <div @click="deleteTask" class="task-btn delete"><img src="../assets/images/eliminar.png" alt="Done Task Logo"></div>

        <!-- <p @click="$emit('toggleCompleted', task.id, task.is_complete)">Completed:{{task.is_complete}}</p>
        <button v-if="!editMode" @click="editTask">Edit</button>
        <button v-else @click="saveTask">Save</button>
        <button @click="deleteTask">Delete</button> -->
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../stores/task';
import { supabase } from '../supabase';

const isDone = ref(true);

const emit = defineEmits(["reloadTasks","toggleCompleted", "updateTask"]);

const taskStore = useTaskStore();

const props = defineProps({
    task: Object,
});

let editMode = ref(false);

let taskTitle = ref(props.task.title);
let taskDescription = ref(props.task.description);

const editTask = () => {
    editMode.value = !editMode.value;
}

const saveTask = () => {
    emit('updateTask', props.task.id, taskTitle.value, taskDescription.value)
    editMode.value = !editMode.value;
}
// Función para borrar la tarea a través de la store. El problema que tendremos aquí (y en NewTask.vue) es que cuando modifiquemos la base de datos los cambios no se verán reflejados en el v-for de Home.vue porque no estamos modificando la variable tasks guardada en Home. Usad el emit para cambiar esto y evitar ningún page refresh.
const deleteTask = async() => {
    await taskStore.deleteTask(props.task.id);
    emit('reloadTasks');
};

</script>

<style></style>

<!--
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or
like an object, up to you.

2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error,
a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit
the new task detail or details[this is in reference of the task title and the task description].

3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the
status[completed, not complted] of the taskItem.

4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean
empty variable.

5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the
inputField will be used here to save the value as a prop on this function.

6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.

7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional
that first checks if the value of the task [either title and description or just title] is empty which if true it runs the
function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2
back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2;
a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data
property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value
from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field
to an empty string to clear it from the ui.

8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be
send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
