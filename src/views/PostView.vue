<template>
  <div class="posts-container">
    <h2>Postingan</h2>
    <select v-model="selectedUser" @change="fetchPosts" class="user-select">
      <option v-for="user in users" :value="user.id" :key="user.id">{{ user.name }}</option>
    </select>
    <table class="posts-table">
      <thead>
        <tr>
          <th>Judul</th>
          <th>Isi</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(post, index) in posts" :key="index" class="post-item">
          <td class="post-title">{{ post.title }}</td>
          <td class="post-body">{{ post.body }}</td>
          <td class="action-buttons">
            <button @click="editPost(post.id)" class="button-edit">Edit</button>
            <button @click="deletePost(post.id)" class="button-delete">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PostsComponent',
  data() {
    return {
      users: [],
      posts: [],
      selectedUser: null
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
        });
    },
    fetchPosts() {
      if (this.selectedUser) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
          .then(response => response.json())
          .then(posts => {
            this.posts = posts;
          });
      }
    },
    editPost(postId) {
      const post = this.posts.find(post => post.id === postId);
      const newTitle = prompt('Edit Judul', post.title);
      const newBody = prompt('Edit Isi', post.body);

      if (newTitle && newBody) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: newTitle, body: newBody, userId: this.selectedUser })
        })
          .then(response => response.json())
          .then(updatedPost => {
            post.title = updatedPost.title;
            post.body = updatedPost.body;
          });
      }
    },
    deletePost(postId) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE'
      }).then(() => {
        this.posts = this.posts.filter(post => post.id !== postId);
      });
    }
  }
};
</script>

<style scoped>
.posts-container {
  width: 80%;
  background-color: #6a1b9a;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 30px !important;
  margin-bottom: 20px !important;
  margin: 0 auto;
  color: #f0f0f0;
}

h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}

.user-select {
  margin-bottom: 20px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #000;
}

.posts-table {
  width: 100%;
  border-collapse: collapse;
}

.posts-table th,
.posts-table td {
  padding: 12px 15px;
  text-align: center;
  border: 1px solid #ddd;
}

.posts-table th {
  background-color: #7b1fa2;
  color: #fff;
}

.posts-table tr:nth-child(even) {
  background-color: #f3e5f5;
}

.posts-table tr:nth-child(odd) {
  background-color: #ede7f6;
}

.posts-table .post-title {
  font-weight: bold;
  color: #333;
}

.posts-table .post-body {
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.button-edit,
.button-delete {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button-edit {
  background-color: #8e24aa;
  color: #fff;
}

.button-edit:hover {
  background-color: #7b1fa2;
}

.button-delete {
  background-color: #d32f2f;
  color: #fff;
}

.button-delete:hover {
  background-color: #c62828;
}
</style>
