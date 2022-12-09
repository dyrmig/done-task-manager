import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks(completed) {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .eq('is_complete', completed)
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    
    async addTask(title, description) {
      console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },

    async deleteTask(id){
      const { data, error } = await supabase.from("tasks").delete().match({
        id: id,
      });
    },

    async updateIsCompleted(taskId, completed){
      const { data, error } = await supabase.from("tasks").update({ is_complete: completed }).match({id: taskId});
    },

    async updateTaskTitleDescription(taskId, title, description){
      const { data, error } = await supabase.from("tasks").update({ title: title, description: description }).match({id: taskId});
    }
  }
});
