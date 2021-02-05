<script>
  import Card from '@smui/card';
  import List, { Separator } from '@smui/list';
  import faker from 'faker/locale/en_US';
  import Fab, { Icon } from '@smui/fab';
  import DeviceDetector from 'device-detector-js';
  import TodoListItem from './todos/todo-list-item.svelte';
  import TodoEdit from './todos/todo-edit.svelte';
  import { todos } from './todos/todos-store';
  import TodoShow from './todos/todo-show.svelte';
  import { watchResize } from 'svelte-watch-resize';

  const deviceDetector = new DeviceDetector();
  const device = deviceDetector.parse(navigator.userAgent);
  let todo = null;
  let mode = null;
  let isSmallScreen = false;
  let isDesktop = true;
  todos.set(
    [...new Array(5)]
      .map(() => {
        return {
          id: faker.random.uuid(),
          label: faker.lorem.words(),
          date: faker.date.future(),
          tag: faker.lorem.word(),
          checked: false,
        };
      })
      .sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      })
  );
  function triggerEdit(e) {
    todo = e.detail;
    mode = 'edit';
  }
  function showTodo(e) {
    todo = e.detail;
    mode = 'show';
  }
  function deleteTodo(e) {
    todos.delete(e.detail.id);
  }
  function addTodo(e) {
    todos.create(e.detail);
  }
  function editTodo(e) {
    todos.update(e.detail.id, e.detail);
  }
  function cancelDialog() {
    todo = null;
    mode = null;
  }
  function handleResize() {
    isDesktop = device && 'desktop' === device.device.type;
    isSmallScreen = window.innerWidth < 960;
  }
</script>

<div class="list-todo" use:watchResize={handleResize}>
  <a href="https://esensconsulting.com" title="ESENS Consulting" class="list-todo__logo mb:3@xs">
    <img
      src="data:image/svg+xml;base64,PHN2ZyBpZD0iYjFiODI2MTAtZGEzOC00ZWRmLTlkYmQtOTcwZTI2M2UxZmY5IiBkYXRhLW5hbWU9IkNhbHF1ZSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxODUuODUgMjkuMyI+PGRlZnM+PHN0eWxlPi5cMzIgYTgzMDQ3Yy1jZDcwLTQ1NGYtYjM3YS1jZmEzZWIzMjc2YzR7ZmlsbDojZmZmO30uZGQwMGMzYjEtZGNmZC00ZGM2LWEyNzUtNzM3NmM4OGRmZjhme2ZpbGw6I2YyOGY1ZDt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPmxvZ288L3RpdGxlPjxwYXRoIGNsYXNzPSIyYTgzMDQ3Yy1jZDcwLTQ1NGYtYjM3YS1jZmEzZWIzMjc2YzQiIGQ9Ik03NC45NSwxOC42djAuMTNBMi45NCwyLjk0LDAsMCwxLDcyLDIxLjY3SDU5LjEzYTIuOTQsMi45NCwwLDAsMS0yLjk0LTIuOTRWMTYuMTFINzcuOVYxMC41YTUuNzksNS43OSwwLDAsMC01Ljc5LTUuNzloLTEzYTUuNzksNS43OSwwLDAsMC01Ljc5LDUuNzl2OC4yNGE1Ljc5LDUuNzksMCwwLDAsNS43OSw1Ljc5aDEzYTUuNzksNS43OSwwLDAsMCw1Ljc5LTUuNzlWMTguNmgtM1ptLTE4Ljc2LTguMkEyLjc4LDIuNzgsMCwwLDEsNTksNy42M2gxMy4yYTIuNzgsMi43OCwwLDAsMSwyLjc4LDIuNzh2Mi43OEg1Ni4xOVYxMC40MVoiLz48cGF0aCBjbGFzcz0iMmE4MzA0N2MtY2Q3MC00NTRmLWIzN2EtY2ZhM2ViMzI3NmM0IiBkPSJNMTI5LjU4LDE4LjZ2MC4xM2EyLjk0LDIuOTQsMCwwLDEtMi45NCwyLjk0SDExMy43NmEyLjk0LDIuOTQsMCwwLDEtMi45NC0yLjk0VjE2LjExaDIxLjcxVjEwLjVhNS43OSw1Ljc5LDAsMCwwLTUuNzktNS43OWgtMTNhNS43OSw1Ljc5LDAsMCwwLTUuNzksNS43OXY4LjI0YTUuNzksNS43OSwwLDAsMCw1Ljc5LDUuNzloMTNhNS43OSw1Ljc5LDAsMCwwLDUuNzktNS43OVYxOC42aC0zWm0tMTguNzYtOC4yYTIuNzgsMi43OCwwLDAsMSwyLjc4LTIuNzhoMTMuMmEyLjc4LDIuNzgsMCwwLDEsMi43OCwyLjc4djIuNzhIMTEwLjgyVjEwLjQxWiIvPjxwYXRoIGNsYXNzPSIyYTgzMDQ3Yy1jZDcwLTQ1NGYtYjM3YS1jZmEzZWIzMjc2YzQiIGQ9Ik0xNTIsNC43MkgxNDEuMzFhNS43OSw1Ljc5LDAsMCwwLTUuNzksNS43OXYxNGgyLjkxVjEwLjQxYTIuNzgsMi43OCwwLDAsMSwyLjc4LTIuNzhIMTUyYTIuNzgsMi43OCwwLDAsMSwyLjc4LDIuNzhWMjQuNTNoM3YtMTRBNS43OSw1Ljc5LDAsMCwwLDE1Miw0LjcyWiIvPjxyZWN0IGNsYXNzPSIyYTgzMDQ3Yy1jZDcwLTQ1NGYtYjM3YS1jZmEzZWIzMjc2YzQiIHg9IjE2MS4zMSIgeT0iOS40MyIgd2lkdGg9IjIuODciIGhlaWdodD0iMi44NyIvPjxwYXRoIGNsYXNzPSIyYTgzMDQ3Yy1jZDcwLTQ1NGYtYjM3YS1jZmEzZWIzMjc2YzQiIGQ9Ik05OS42NSwxMy4yNEg4NS43YTIuNzgsMi43OCwwLDAsMS0yLjc3LTIuNzh2MGEyLjc3LDIuNzcsMCwwLDEsLjIzLTEuMTFsMC4wOS0uMThoMGEyLjc5LDIuNzksMCwwLDEsLjIxLTAuMzNoMGEyLjgsMi44LDAsMCwxLC4yNS0wLjI5aDBsMC4xNC0uMTNoMEw4NCw4LjIzaDBsMC4xNS0uMTFoMEw4NC4zMyw4bDAsMCwwLjE2LS4wOWgwbDAuMTYtLjA3aDBsMC4xNy0uMDZoMGwwLjE3LDBoMGwwLjE4LDBoMGwwLjE4LDBIOTguOTFhMi43OCwyLjc4LDAsMCwxLDIuNzgsMi43OHYwLjMyaDNWMTAuMzlBNS43LDUuNywwLDAsMCw5OSw0LjY5SDg1Ljc0YTUuNyw1LjcsMCwwLDAsMCwxMS40SDk5YTIuNzgsMi43OCwwLDAsMSwyLjc4LDIuNzh2MEEyLjc4LDIuNzgsMCwwLDEsOTksMjEuN0g4NS43OEEyLjc4LDIuNzgsMCwwLDEsODMsMTguOTJWMTguNkg4MHYwLjMxYTUuNyw1LjcsMCwwLDAsNS43LDUuN0g5OUE1LjcsNS43LDAsMCwwLDk5LjY1LDEzLjI0WiIvPjxwYXRoIGNsYXNzPSIyYTgzMDQ3Yy1jZDcwLTQ1NGYtYjM3YS1jZmEzZWIzMjc2YzQiIGQ9Ik0xODAuODEsMTMuMjRIMTY2Ljg2YTIuNzgsMi43OCwwLDAsMS0yLjc3LTIuNzh2MGEyLjc3LDIuNzcsMCwwLDEsLjIzLTEuMTFsMC4wOS0uMThoMGEyLjc4LDIuNzgsMCwwLDEsLjIxLTAuMzNoMGEyLjgsMi44LDAsMCwxLC4yNS0wLjI5aDBMMTY1LDguMzVoMGwwLjE0LS4xMmgwbDAuMTUtLjExaDBMMTY1LjQ4LDhsMCwwLDAuMTYtLjA5aDBsMC4xNi0uMDdoMEwxNjYsNy43NmgwbDAuMTcsMGgwbDAuMTgsMGgwbDAuMTgsMGgxMy40M2EyLjc4LDIuNzgsMCwwLDEsMi43OCwyLjc4djAuMzJoM1YxMC4zOWE1LjcsNS43LDAsMCwwLTUuNy01LjdIMTY2Ljg5YTUuNyw1LjcsMCwwLDAsMCwxMS40aDEzLjI0YTIuNzgsMi43OCwwLDAsMSwyLjc4LDIuNzh2MGEyLjc4LDIuNzgsMCwwLDEtMi43OCwyLjc4aC0xMy4yYTIuNzgsMi43OCwwLDAsMS0yLjc4LTIuNzhWMTguNmgtM3YwLjMxYTUuNyw1LjcsMCwwLDAsNS43LDUuN2gxMy4yNEE1LjcsNS43LDAsMCwwLDE4MC44MSwxMy4yNFoiLz48cGF0aCBjbGFzcz0iZGQwMGMzYjEtZGNmZC00ZGM2LWEyNzUtNzM3NmM4OGRmZjhmIiBkPSJNMzEuMzksMTMuMDhsLTUuOCw0LjMxLDIuMTgsMi45NCwxMy05LjYzLDIuMDgsMi44YTMuNDksMy40OSwwLDAsMS0uNzIsNC44OGwtNS43Myw0LjI2LDIuMTgsMi45Myw1LjY0LTQuMTlhNy4yNiw3LjI2LDAsMCwwLDEuNS0xMC4xNkw0MS40OCw1LjU5bC0xMC4wOSw3LjVoMFoiLz48cGF0aCBjbGFzcz0iZGQwMGMzYjEtZGNmZC00ZGM2LWEyNzUtNzM3NmM4OGRmZjhmIiBkPSJNMjEuNDMsMTEuNzlsMTAtNy40M2EzLjY5LDMuNjksMCwwLDEsNSwuNkwzOS40LDIuNzhhNy4yNiw3LjI2LDAsMCwwLTEwLTEuMzVMMTkuMjksOC45MVoiLz48cGF0aCBjbGFzcz0iMmE4MzA0N2MtY2Q3MC00NTRmLWIzN2EtY2ZhM2ViMzI3NmM0IiBkPSJNMTUuNzEsMTYuMjFsNS44LTQuMzFMMTkuMzMsOWwtMTMsOS42My0yLjA4LTIuOEEzLjQ5LDMuNDksMCwwLDEsNSwxMC45MWw3LTUuMjJMOS44NiwyLjc2LDIuOTMsNy45MWE3LjI2LDcuMjYsMCwwLDAtMS41LDEwLjE2bDQuMTksNS42NCwxMC4wOS03LjVoMFoiLz48cGF0aCBjbGFzcz0iMmE4MzA0N2MtY2Q3MC00NTRmLWIzN2EtY2ZhM2ViMzI3NmM0IiBkPSJNMjUuNjgsMTcuNTFsLTEwLDcuNDNhMy42OSwzLjY5LDAsMCwxLTUtLjZMNy43MSwyNi41MWE3LjI2LDcuMjYsMCwwLDAsMTAsMS4zNWwxMC4wNi03LjQ3WiIvPjxwYXRoIGNsYXNzPSIyYTgzMDQ3Yy1jZDcwLTQ1NGYtYjM3YS1jZmEzZWIzMjc2YzQiIGQ9Ik03LDkuNDZsNi40NS00Ljc5YTMuNjksMy42OSwwLDAsMSw1LC42bDIuOTQtMi4xOGE3LjI2LDcuMjYsMCwwLDAtMTAtMS4zNUw0LjgzLDYuNThaIi8+PHBhdGggY2xhc3M9ImRkMDBjM2IxLWRjZmQtNGRjNi1hMjc1LTczNzZjODhkZmY4ZiIgZD0iTTQwLjE4LDE5LjgzbC02LjQ1LDQuNzlhMy42OSwzLjY5LDAsMCwxLTUtLjZMMjUuNzYsMjYuMmE3LjI2LDcuMjYsMCwwLDAsMTAsMS4zNWw2LjUyLTQuODRaIi8+PC9zdmc+"
      alt="ESENS Consulting"
    />
  </a>
  <div style="display: flex; flex-direction: row; justify-content: center; align-items: center">
    <Card class="list-todo__card">
      <div class="mdc-typography--headline3 mb:3@xs">Todo list</div>
      <List class="list-todo__list" twoLine nonInteractive>
        {#each $todos as todo, i (todo.id)}
          <TodoListItem
            {todo}
            on:todoshow={showTodo}
            on:todoedit={triggerEdit}
            on:tododelete={deleteTodo}
            displayMenu={isSmallScreen || !isDesktop}
          />
          {#if i < todos.length - 1}
            <Separator />
          {/if}
        {/each}
      </List>
      <Fab class="list-todo__btn list-todo__btn--add" on:click={triggerEdit} title="Add a TODO">
        <Icon class="material-icons">add</Icon>
      </Fab>
    </Card>
  </div>
</div>

{#if 'edit' === mode}
  <TodoEdit id={todo ? todo.id : null} on:add={addTodo} on:edit={editTodo} on:MDCDialog:closed={cancelDialog} />
{:else if 'show' === mode}
  <TodoShow id={todo.id} on:MDCDialog:closed={cancelDialog} />
{/if}
