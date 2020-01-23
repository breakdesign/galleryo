<template>
  <div class="container">
    <div class="bd-single">
      <div class="bd-single__header">
        <img :src="img.src" :alt="img.alt" />
        <div class="bd-search">
          <nuxt-link to="/">
            <span
              class="mdi mdi-arrow-left"
              style="font-size: 30px;margin-right: 15px;color: white;"
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
        <div class="bd-action">
          <div class="bd-action__left">
            <a
              :href="img.download + '?force=true'"
              download="photo-1560801122-1976baf07f5f.jpeg"
            >
              Download
            </a>
          </div>
          <div class="bd-action__right">
            <span class="mdi mdi-thumb-up-outline">
              {{ changeNumber(img.total.likes, 0) }}
            </span>
            <span class="mdi mdi-eye-outline">
              {{ changeNumber(img.total.views, 2) }}
            </span>
            <span class="mdi mdi-download">
              {{ changeNumber(img.total.downloads, 2) }}
            </span>
          </div>
        </div>
      </div>
      <div class="bd-single__content">
        <h3>{{ img.creator.name }}</h3>
        <span>@{{ img.creator.username }}</span>
        <div class="bd-c-category">
          <div class="bd-c-content">
            <ul class="bd-c-category__list">
              <li
                v-for="(item, index) in img.category"
                :key="index"
                class="bd-c-category__items"
              >
                <nuxt-link :to="`/category/${item.title}`">
                  {{ item.title.replace(/\b\w/, (v) => v.toUpperCase()) }}
                </nuxt-link>
              </li>
            </ul>
          </div>
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
      search: '',
      img: {
        src: '',
        alt: '',
        download: '',
        location: '',
        total: {
          likes: 0,
          views: 0,
          downloads: 0
        },
        creator: {
          name: '',
          username: ''
        },
        category: []
      }
    }
  },
  computed: {
    ...mapState({
      dataFromAPI: (state) => state.unsplash.single
    })
  },
  mounted() {
    this.getSingle()
  },
  methods: {
    async getSingle() {
      const getSingle = await this.$store.dispatch(
        'unsplash/getDataSingle',
        this.$nuxt.$route.params.id
      )
      if (getSingle !== undefined) {
        await this.$store.dispatch('unsplash/setDataSingle', getSingle)
        this.img.src = this.dataFromAPI.urls.small
        this.img.alt = this.dataFromAPI.alt_description
        this.img.download = this.dataFromAPI.links.download
        this.img.location = this.dataFromAPI.links.download_location
        this.img.total.likes = this.dataFromAPI.likes
        this.img.total.views = this.dataFromAPI.views
        this.img.total.downloads = this.dataFromAPI.downloads
        this.img.creator.name = this.dataFromAPI.user.name
        this.img.creator.username = this.dataFromAPI.user.username
        this.img.category = this.dataFromAPI.tags
      }
    },
    submitSearch() {
      this.$router.push(`/search/${this.search.split(' ').join('-')}`)
    },
    changeNumber(number, decPlaces) {
      // 2 decimal places => 100, 3 => 1000, etc
      decPlaces = 10 ** decPlaces

      // Enumerate number abbreviations
      const abbrev = [' K', ' M', ' B', ' T']

      // Go through the array backwards, so we do the largest first
      for (let i = abbrev.length - 1; i >= 0; i--) {
        // Convert array index to "1000", "1000000", etc
        const size = 10 ** (i + 1) * 3

        // If the number is bigger or equal do the abbreviation
        if (size <= number) {
          // Here, we multiply by decPlaces, round, and then divide by decPlaces.
          // This gives us nice rounding to a particular decimal place.
          number = Math.round((number * decPlaces) / size) / decPlaces

          // Handle special case where we round up to the next abbreviation
          if (number === 1000 && i < abbrev.length - 1) {
            number = 1
            i++
          }

          // Add the letter for the abbreviation
          number += abbrev[i]

          // We are done... stop
          break
        }
      }

      return number
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
  margin: 30px;
  display: flex;
  align-items: center;
  width: calc(100% - 60px);
  position: absolute;
  z-index: 2;
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

.bd-c-random__items span,
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

.bd-c-random__items {
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

.bd-c-random__list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 2600px !important;
}

.bd-c-popular {
  margin-bottom: 20px;
}

.bd-c-category {
  margin-top: 20px;
}

textarea,
select,
input,
button {
  outline: none;
}

.bd-single__header img {
  position: absolute;
  top: 0px;
  width: 100vw;
  z-index: 1;
}

.bd-single__header {
  position: relative;
  margin-left: -30px;
  width: calc(100% + 60px);
  height: 57vh;
  overflow: hidden;
}

/* Effect 2: Move Up */
.grid.effect-2 li.animate {
  -webkit-transform: translateY(200px);
  transform: translateY(200px);
  -webkit-animation: moveUp 0.65s ease forwards;
  animation: moveUp 0.65s ease forwards;
}

.bd-action {
  position: absolute;
  width: calc(100% - 60px);
  height: 40px;
  bottom: 15px;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 30px;
}

.bd-action__right span {
  margin-right: 15px;
  font-size: 16px;
  color: white;
}

.bd-action__left a {
  padding: 10px 15px;
  background: white;
  border-radius: 8px;
  text-decoration: none;
  color: #49484e;
}

.bd-action__right span:last-child {
  margin-right: 0;
}

.bd-single__header {
  margin-bottom: 25px;
}

.bd-single__header::after {
  content: '';
  background: rgba(255, 255, 255, 1);
  background: -moz-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  background: -webkit-gradient(
    left top,
    left bottom,
    color-stop(0%, rgba(255, 255, 255, 1)),
    color-stop(100%, rgba(0, 0, 0, 1))
  );
  background: -webkit-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  background: -o-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  background: -ms-linear-gradient(
    top,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#000000', GradientType=0 );
  z-index: 1;
  display: block;
  height: 100%;
  position: absolute;
  width: 100%;
  opacity: 0.4;
}

.bd-single__content {
  text-align: center;
}

.bd-single__content h3 {
  font-size: 24px;
  color: #49484e;
  font-family: 'Nunito', sans-serif;
}

.bd-single__content h3::after {
  content: '';
  display: block;
  height: 2px;
  background-color: #ececf0;
  width: 30px;
  margin: 15px auto;
}

.bd-single__content span {
  color: #9897a0;
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
