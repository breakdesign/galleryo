<template>
  <div class="container">
    <div class="wrapper">
      <div class="bd-search">
        <nuxt-link to="/">
          <span
            class="mdi mdi-arrow-left"
            style="font-size: 30px;margin-right: 15px;color: black;"
          />
        </nuxt-link>
        <input
          v-model="search"
          @keyup.enter="submitSearch"
          type="text"
          class="bd-search__input"
          placeholder="Search"
        />
      </div>
      <div class="bd-c-search">
        <div class="bd-c-header">
          <h2 class="bd-c-title">
            Search Result : <b>{{ this.$nuxt.$route.params.key }}</b>
          </h2>
        </div>
        <div class="bd-c-content">
          <ul id="grid" class="bd-c-search__list grid effect-2">
            <li
              v-for="(item, index) in dataFromAPI.results"
              :key="index"
              :class="'bd-c-search__items ' + (index % 3 ? 'h196' : 'h259')"
            >
              <nuxt-link :to="`/singlepage/${item.id}`">
                <img
                  :src="item.urls.small"
                  :alt="item.alt_description"
                  :height="index % 3 ? 196 : 259"
                  class="bd-c-popular__image"
                  width="147"
                />
                <span class="mdi mdi-thumb-up">{{ item.likes }}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      search: ''
    }
  },
  computed: {
    ...mapState({
      dataFromAPI: (state) => state.unsplash.search
    })
  },
  mounted() {
    this.getSearch()
  },
  methods: {
    async getSearch() {
      await this.$store.dispatch(
        'unsplash/getDataSearch',
        this.$nuxt.$route.params.key
      )
    },
    submitSearch() {
      this.$router.push(`/search/${this.search.split(' ').join('-')}`)
    }
  }
}
</script>
<style scoped>
/* 
  font-family: 'Nunito', sans-serif;
  font-family: 'Open Sans', sans-serif;
*/
@import url('https://fonts.googleapis.com/css?family=Nunito|Open+Sans&display=swap');

.container {
  margin: 0 30px;
}

.mdi:before {
  margin-right: 5px;
}

.bd-search__input {
  width: 100%;
  background-color: #f7f7f8;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  padding: 12px 15px;
}

.bd-search {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}

.bd-c-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.bd-cta {
  color: #838289;
  text-decoration: none;
  border-bottom: 1px solid;
}

.bd-c-title {
  font-family: 'Nunito', sans-serif;
  font-weight: 400;
  color: #49484e;
  font-size: 24px;
}
.bd-c-popular__list {
  list-style: none;
  padding: 0;
  margin-left: -30px;
  width: calc(100% + 60px);
  white-space: nowrap;
  overflow-y: auto;
}

.bd-c-popular__items {
  position: relative;
  display: inline-block;
  margin-right: 20px;
}

.bd-c-popular__image {
  border-radius: 8px;
}

.bd-c-popular__items:first-child {
  margin-left: 30px;
}

.bd-c-popular__items:last-child {
  margin-right: 30px;
}

.bd-c-search__items span,
.bd-c-popular__items span {
  position: absolute;
  z-index: 99;
  color: white;
  left: calc(50% - 30px);
  right: calc(50% - 30px);
  transform: translate(calc(50% - 30px), calc(50% - 30px));
  bottom: 0;
  display: inline-block;
  text-align: center;
}

.bd-c-search__items {
  position: relative;
  display: inline-block;
  width: 151px;
  margin: 0 1rem 1rem 0;
}

.bd-c-category__list {
  list-style: none;
  padding: 0;
  white-space: nowrap;
  overflow-y: auto;
}
.bd-c-category__items {
  display: inline-block;
  margin-top: 10px;
  height: 35px;
  margin-right: 10px;
}

.bd-c-category__items a {
  text-decoration: none;
  font-size: 16px;
  color: #636369;
  background-color: #f8f8fa;
  border-radius: 8px;
  padding: 10px 15px;
}

.bd-c-search__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 2600px;
}

.bd-c-popular {
  margin-bottom: 20px;
}

.bd-c-category {
  margin-bottom: 30px;
}

textarea,
select,
input,
button {
  outline: none;
}

/* Effect 2: Move Up */
.grid.effect-2 li.animate {
  -webkit-transform: translateY(200px);
  transform: translateY(200px);
  -webkit-animation: moveUp 0.65s ease forwards;
  animation: moveUp 0.65s ease forwards;
}

@-webkit-keyframes moveUp {
  100% {
    -webkit-transform: translateY(0);
    opacity: 1;
  }
}

@keyframes moveUp {
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
