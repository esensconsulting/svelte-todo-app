import { writable } from 'svelte/store';

function createStore() {
  const { subscribe, set, update } = writable([]);

  return {
    subscribe: subscribe,
    create: (todo) =>
      update((todos) => {
        return todos.concat(todo);
      }),
    update: (id, todo) =>
      update((todos) => {
        const todoIndex = todos.findIndex((m) => m.id === id);
        todos[todoIndex] = { ...todos[todoIndex], ...todo };
        return todos;
      }),
    delete: (id) =>
      update((todos) => {
        return todos.filter((i) => i.id !== id);
      }),
    set: (todos) => {
      set(todos);
    },
  };
}

export const todos = createStore();
