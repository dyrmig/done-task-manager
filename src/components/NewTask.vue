<template>
    <!-- <div class="new-task"> -->
        <div class="task-container">
            <div v-if="showErrorMessage">
                <p class="error-text">{{ errorMessage }}</p>
            </div>
            <textarea class="active-title-task-input" type="text" v-model="name" placeholder="Add a Task Title"></textarea>
        
            <textarea class="active-description-task-input" type="text" v-model="description" cols="30" rows="5" placeholder="Add a Task Description"></textarea>


            
            <div class="buttons-task-item">
                <div @click="addTask" class="task-btn done"><img src="../assets/images/guardar.png" alt="Done Task Logo"></div>
                <div @click="$emit('cancelNewTask')" class="task-btn delete"><img src="../assets/images/cerca.png" alt="Done Task Logo"></div>

            </div>
        </div>
    <!-- </div> -->
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

const taskStore = useTaskStore();

const emit = defineEmits(["reloadTasks", "cancelNewTask"]);

// variables para los valors de los inputs
const name = ref('');
const description = ref('');

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty
const showErrorMessage = ref(false);

// const constant to save a variable that holds the value of the error message
const errorMessage = ref(null);

// Arrow function para crear tareas.
const addTask = () => {
if(name.value.length === 0 || description.value.length === 0){
    // Primero comprobamos que ningún campo del input esté vacío y lanzamos el error con un timeout para informar al user.

    showErrorMessage.value = true;
    errorMessage.value = 'The task title or description is empty';
    setTimeout(() => {
    showErrorMessage.value = false;
    }, 5000);

} else {
    // Aquí mandamos los valores a la store para crear la nueva Task. Esta parte de la función tenéis que refactorizarla para que funcione con emit y el addTask del store se llame desde Home.vue.

    const addNewtask = async() => {
    await taskStore.addTask(name.value, description.value);
    emit('cancelNewTask');
    emit('reloadTasks');
    };

    addNewtask();
    
    name.value = '';
    description.value = '';
}
};

</script>

<style></style>
  