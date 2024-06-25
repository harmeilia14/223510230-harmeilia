<template>
  <div class="albums">
    <div class="album-table">
      <div v-for="album in albums" :key="album.id" class="album-row">
        <router-link :to="'/albums/' + album.id">{{ album.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { useAlbumsStore } from '../stores/album';

export default defineComponent({
  setup() {
    const albums = ref([]);
    const albumsStore = useAlbumsStore();

    onMounted(async () => {
      await albumsStore.fetchAlbums();
      albums.value = albumsStore.albums;
    });

    return {
      albums,
    };
  },
});
</script>

<style scoped>
.albums {
  max-width: 75%;
  margin: 0 auto;
  margin-top: 30px !important;
  margin-bottom: 20px !important;
  padding: 10px;
  text-align: center;
  color: #f0f0f0;
  font-size: 20px;
  background-color: #673ab7;
}

.album-table {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.album-row {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border: 1px solid #512da8; 
  border-top: none;
  transition: background-color 0.3s, transform 0.3s;
  background-color: rgba(103, 58, 183, 0.7);
  min-height: 50px;
}

.album-row a {
  text-decoration: none;
  color: #f0f0f0; 
  font-size: 1.1rem;
}

.album-row:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  border-color: #f0f0f0; 
}
</style>
