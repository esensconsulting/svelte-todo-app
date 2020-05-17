<script>
  import Menu from '@smui/menu';
  import { Anchor } from '@smui/menu-surface';
  import IconButton from '@smui/icon-button';
  import moment from 'moment';
  import List, { Item, Text, PrimaryText, SecondaryText, Meta } from '@smui/list';
  import Checkbox from '@smui/checkbox';
  import { createEventDispatcher } from 'svelte';
  import FormField from '@smui/form-field';

  let menu;
  let anchor;
  const dispatch = createEventDispatcher();

  export let todo;
  export let displayMenu = false;

  function showTodo(e) {
    e.stopPropagation();
    dispatch('todoshow', todo);
  }

  function editTodo(e) {
    e.stopPropagation();
    dispatch('todoedit', todo);
  }

  function deleteTodo(e) {
    e.stopPropagation();
    dispatch('tododelete', todo);
  }

  function formatDate(date) {
    return moment(date).format('MMMM Do, yyyy');
  }

  function toggleMenu(e) {
    e.stopPropagation();
    menu.setOpen(true);
  }
</script>

{#if todo}
  <Item class="list-todo__list-item {todo.checked ? 'mdc-list-item--disabled' : ''}">
    <FormField>
      <Checkbox class="mr:3@xs" bind:checked={todo.checked} disable={false} />
    </FormField>
    <Text class="list-todo__list-item-label {todo.checked ? 'list-todo__list-item-label--checked' : ''}">
      <PrimaryText>{todo.label}</PrimaryText>
      <SecondaryText>{formatDate(todo.date)}</SecondaryText>
    </Text>
    <Meta>
      <div class="list-todo__list-item-actions" use:Anchor bind:this={anchor}>
        {#if !displayMenu}
          <IconButton class="material-icons list-todo__btn list-todo__btn--show" on:click={showTodo} title="Show more">
            remove_red_eye
          </IconButton>
          <IconButton class="material-icons list-todo__btn list-todo__btn--edit" on:click={editTodo} title="Edit">
            edit
          </IconButton>
          <IconButton class="material-icons list-todo__btn list-todo__btn--delete" on:click={deleteTodo} title="Delete">
            delete
          </IconButton>
        {:else}
          <IconButton class="material-icons list-todo__btn list-todo__btn--show" on:click={toggleMenu}>
            more_vert
          </IconButton>
          <Menu bind:this={menu} anchor={false} bind:anchorElement={anchor} fixed>
            <List class="list-todo__menu">
              <Item on:SMUI:action={showTodo}>
                <Text>Show more</Text>
              </Item>
              <Item on:SMUI:action={editTodo}>
                <Text>Edit</Text>
              </Item>
              <Item on:SMUI:action={deleteTodo}>
                <Text>Delete</Text>
              </Item>
            </List>
          </Menu>
        {/if}
      </div>
    </Meta>
  </Item>
{/if}
