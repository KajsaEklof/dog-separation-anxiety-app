<template>
  <v-container>
    <h1>Notes</h1>
    <div class="masonry-layout container container_1">
      <div v-for="( item, index) in items" :key="index" class="item">
        <div>{{ item.title }}</div>
        <div>{{ item.content }}</div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import MiniMasonry from 'minimasonry';
import { onMounted } from 'vue';

onMounted(() => {
const masonry1 = new MiniMasonry({
  container: '.container_1',
  baseWidth: 150
});

})


const items = [{
  title: "Note 1",
  content: "This is a note",
  date: "2021-10-10",
},
{
  title: "Note 2",
  content: "This is another note",
  date: "2021-10-11",
},
{
  title: "Note 3",
  content: "This is yet another note",
  date: "2021-10-12",
},
{
  title: "Note 4",
  content: "This is yet another note",
  date: "2021-10-13",
},
{
  title: "Note 5",
  content: "This is yet another note",
  date: "2021-10-14",
},
{
  title: "Note 6",
  content: "This is yet another note",
  date: "2021-10-15",
},
{
  title: "Note 7",
  content: "This is yet another note",
  date: "2021-10-16",
},
{
  title: "Note 8",
  content: "This is yet another note",
  date: "2021-10-17",
},
{
  title: "Note 9",
  content: ", This is yet another note, This is yet another note, This is yet another note, This is yet another note, This is yet another note, This is yet another note",
  date: "2021-10-18",
},
{
  title: "Note 10",
  content: "This is yet another note",
  date: "2021-10-19",
},
{
  title: "Note 11",
  content: "This is yet another note",
  date: "2021-10-20",
},
{
  title: "Note 12",
  content: "This is yet another note",
  date: "2021-10-21",
},
{
  title: "Note 13",
  content: "This is yet another note",
  date: "2021-10-22",
},
{
  title: "Note 14",
  content: "This is yet another note",
  date: "2021-10-23",
},
{
  title: "Note 15",
  content: "This is yet another note",
  date: "2021-10-24",
},
{
  title: "Note 16",
  content: "This is yet another note",
  date: "2021-10-25",
}]
</script>