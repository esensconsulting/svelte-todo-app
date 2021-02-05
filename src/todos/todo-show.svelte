<script>
  import { onDestroy, onMount } from 'svelte';
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import { todos } from './todos-store';
  import moment from 'moment';
  import List, { Item } from '@smui/list';
  import Chip, { Text } from '@smui/chips';

  export let id = null;
  let todo;
  let dialog;

  const unsubscribe = todos.subscribe((items) => {
    todo = items.find((i) => i.id === id);
  });

  onMount(() => {
    dialog.open();
  });

  onDestroy(() => {
    unsubscribe();
  });
</script>

<Dialog
  bind:this={dialog}
  aria-labelledby="dialog-title"
  aria-describedby="dialog-content"
  class="show-todo"
  on:MDCDialog:closed
>
  <Title id="dialog-title">{todo.label.toUpperCase()}</Title>
  <Content id="dialog-content" style="display: flex; flex-direction: column">
    <List nonInteractive>
      <Item>
        <strong>Tag :</strong>
        <Chip class="show-todo__chip ml:2@xs">
          <Text>{todo.tag.toLowerCase()}</Text>
        </Chip>
      </Item>
      <Item>
        <p>
          <strong>Date :</strong>
          {moment(todo.date).format('MMMM Do, yyyy')}
        </p>
      </Item>
    </List>
  </Content>
  <Actions>
    <Button>
      <Label>Ok</Label>
    </Button>
  </Actions>
</Dialog>
