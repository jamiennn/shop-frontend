<script setup lang="ts">
import { watch, reactive, computed } from 'vue';
import { useQueryStringStore } from '@/stores/queryString'
const queryStringStore = useQueryStringStore()

const pagination = reactive({})

// 引入並監聽 query string 狀態
watch(queryStringStore, async () => {
  const data = await queryStringStore.handleHomePage()
  const newPagination = data?.pagination
  for (let p in pagination) delete pagination[p]
  Object.assign(pagination, newPagination)
}, { immediate: true })


function getClass(i) {
  return {
    'no-border-right': i === pagination.pages.length,
    'no-border-left': i === 1,
    'page-item': true,
    'text-center': true,
    'd-flex': true,
    'flex-column': true,
    'active': i === pagination.currentPage,
  }
}
</script>

<template>
  <div class="pagination-container">
    <div id="page-list-wrapper">
      <ul class="page-list d-flex">
        <li v-for="i in pagination.pages" :key="i" :class="getClass(i)">
          <a :key="i" :class="i === pagination.currentPage ? 'active-page-link' : 'page-link'"
            @click="queryStringStore.handleClickPage">{{ i }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>



<style lang="scss">
.pagination-container {
  text-align: center;
}

#page-list-wrapper {
  display: inline-block;
  margin: 20px;

  .page-list {
    border: 3px solid var(--dark-info);
    background-color: var(--info);
    padding: 0 5px;
    border-radius: 10px;

    .page-item {
      flex-wrap: wrap;
      justify-content: center;

      width: 30px;
      height: 30px;

      border-right: 3px solid var(--dark-info);
      border-left: 3px solid var(--dark-info);

      .page-link {
        cursor: pointer;
        font-weight: 500;
        color: var(--blue);
      }
    }

    .active {
      background-color: var(--dark-blue);
      border-right: none;
      border-left: none;
      border-radius: 5px;

      .active-page-link {
        cursor: pointer;
        font-weight: 500;
        color: var(--info);
      }
    }

    .no-border-right {
      border-right: none
    }

    .no-border-left {
      border-left: none
    }
  }
}
</style>