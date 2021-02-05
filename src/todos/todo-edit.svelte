<script>
  import Dialog, { Title, Content, Actions, InitialFocus } from '@smui/dialog';
  import Button, { Label } from '@smui/button';
  import Textfield from '@smui/textfield';
  import { v4 as uuidv4 } from 'uuid';
  import { createEventDispatcher } from 'svelte';
  import { todos } from './todos-store';
  import moment from 'moment';
  import { onMount } from 'svelte';
  import validate from 'validate.js';
  import HelperText from '@smui/textfield/helper-text/index';

  export let id = null;
  let dialog;
  let label = '';
  let date = '';
  let tag = '';

  let labelInvalid;
  let dateInvalid;
  let tagInvalid;
  let formValid;

  $: labelInvalid = validate.isEmpty(label);
  $: dateInvalid = validate.isEmpty(date);
  $: tagInvalid = validate.isEmpty(tag);
  $: formValid = !labelInvalid && !dateInvalid && !tagInvalid;

  let checked = false;
  const dispatch = createEventDispatcher();

  if (id) {
    const unsubscribe = todos.subscribe((items) => {
      const todo = items.find((i) => i.id === id);
      label = todo.label;
      date = moment(todo.date).format('YYYY-MM-DD');
      tag = todo.tag;
      checked = todo.checked;
    });
    unsubscribe();
  }

  onMount(() => {
    dialog.open();
  });

  function submit() {
    if (id) {
      dispatch('edit', { id, label, date, tag, checked });
    } else {
      dispatch('add', { id: uuidv4(), label, date, tag, checked });
    }
  }
</script>

<Dialog bind:this={dialog} aria-labelledby="dialog-title" aria-describedby="dialog-content" on:MDCDialog:closed>
  <Title id="dialog-title">{id ? 'Edit' : 'Add'} a TODO</Title>
  <Content id="dialog-content" style="display: flex; flex-direction: column">
    <div class="mt:3@xs">
      <Textfield
        variant="outlined"
        bind:value={label}
        invalid={labelInvalid}
        label="Label"
        type="text"
        style="min-width: 100%"
        use={[InitialFocus]}
      />
      <HelperText validationMsg>Label is required</HelperText>
    </div>
    <div class="mt:3@xs">
      <Textfield
        variant="outlined"
        bind:value={date}
        invalid={dateInvalid}
        label="Date"
        type="date"
        style="min-width: 100%"
      />
      <HelperText validationMsg>Date is required</HelperText>
    </div>
    <div class="mt:3@xs">
      <Textfield
        variant="outlined"
        bind:value={tag}
        invalid={tagInvalid}
        label="Tag"
        type="text"
        style="min-width: 100%"
      />
      <HelperText validationMsg>Tag is required</HelperText>
    </div>
  </Content>
  <Actions>
    <Button>
      <Label>Cancel</Label>
    </Button>
    <Button on:click={submit} disabled={!formValid}>
      <Label>{id ? 'Edit' : 'Add'}</Label>
    </Button>
  </Actions>
</Dialog>
