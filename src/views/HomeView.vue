<template>
  <div class="container">
    <h1>Todos</h1>
    <div class="input-container">
      <input type="text" v-model="newActivity" placeholder="Aktivitas Baru" />
      <button @click="addActivity" class="button-add">Tambah</button>
    </div>

    <ul>
      <li v-for="(activity, index) in filteredActivities" :key="index" class="activity-item">
        <span v-if="index !== editingIndex" :class="{ completed: activity.completed }">{{ activity.name }}</span>
        <input v-else type="text" v-model="editedActivityName" @keyup.enter="saveEdit" @keyup.esc="cancelEdit" />
        <div class="button-group">
          <button @click="editActivity(index)" class="button-edit">
            {{ index === editingIndex ? 'Simpan' : 'Ubah' }}
          </button>
          <button @click="removeActivity(index)" class="button-remove">Hapus</button>
        </div>
      </li>
    </ul>

    <div class="filter-container">
      <label for="showOnlyPending" class="filter-label">
        <input type="checkbox" id="showOnlyPending" v-model="showOnlyPending" />
        Tampilkan yang Belum Selesai
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const newActivity = ref('')
const editedActivityName = ref('')
const editingIndex = ref(-1)
const activities = ref([])
const showOnlyPending = ref(false)

const addActivity = () => {
  if (newActivity.value.trim() !== '') {
    activities.value.push({ name: newActivity.value, completed: false })
    newActivity.value = ''
  }
}

const removeActivity = (index) => {
  activities.value.splice(index, 1)
}

const toggleCompletion = (index) => {
  activities.value[index].completed = !activities.value[index].completed
}

const editActivity = (index) => {
  editedActivityName.value = activities.value[index].name
  editingIndex.value = index
}

const saveEdit = () => {
  if (editedActivityName.value.trim() !== '') {
    activities.value[editingIndex.value].name = editedActivityName.value
    cancelEdit()
  }
}

const cancelEdit = () => {
  editedActivityName.value = ''
  editingIndex.value = -1
}

const filteredActivities = computed(() => {
  if (showOnlyPending.value) {
    return activities.value.filter(activity => !activity.completed)
  }
  return activities.value
})
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #6a1b9a;
  color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.container h1 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.input-container, .filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.input-container input {
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-container .button-add {
  padding: 10px 20px;
  cursor: pointer;
  background-color: #8e24aa;
  color: white;
  border: none;
  border-radius: 4px;
}

.input-container .button-add:hover {
  background-color: #7b1fa2;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  color: #000;
}

.activity-item input[type="text"] {
  flex-grow: 1;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.completed {
  text-decoration: line-through;
  color: #757575;
}

.button-group {
  display: flex;
  gap: 5px;
}

.button-check, .button-edit, .button-remove {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-edit {
  background-color: #8e24aa;
  color: white;
}

.button-edit:hover {
  background-color: #7b1fa2;
}

.button-remove {
  background-color: #8e24aa;
  color: white;
}

.button-remove:hover {
  background-color: #7b1fa2;
}

.filter-container {
  justify-content: center;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
