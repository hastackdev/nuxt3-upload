<template>
  <div>
    <div v-for="(_file, i) in form.files" :key="i">
      <label>Upload File</label>
      <br />
      <input type="file" @change="(event) => onChangeFile(event, i)" />
      <br />
      <br />
    </div>
    <button @click="() => form.files.push({ file: null })">Add File</button>
    <br />
    <br />

    <label>Number</label>
    <br />
    <input v-model="form.number" type="number" placeholder="Enter number" />
    <br />
    <br />

    <label>Other Input</label>
    <br />
    <input v-model="form.other" type="text" placeholder="Enter text" />

    <br />
    <br />
    <button @click="onSubmit">Submit</button>
  </div>
</template>

<script setup lang="ts">
import { serialize } from 'object-to-formdata';

const form = reactive({
  files: [{ file: null }] as { file: File | null }[],
  other: '',
  number: 0
});

const onChangeFile = (event: Event, index: number) => {
  const [_file] = (event.target as HTMLInputElement).files as FileList;

  form.files[index].file = _file;
};

const onSubmit = async () => {
  try {
    await $fetch('/api/upload', {
      method: 'post',
      body: serialize(form, { indices: true, dotsForObjectNotation: true })
    });

    alert('Uploaded');
  } catch (err) {
    console.log(err);
    alert('Error');
  }
};
</script>
