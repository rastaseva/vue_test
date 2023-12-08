<template>
  <v-card v-if='userCardInfo?.loaded' :loading='isLoading' width='95vw'>
    <div v-if='showCommon' class='d-flex flex-column'>
      <v-card class='common_info d-flex flex-column justify-space-around mt-5 mb-5' title='Имя, Никнейм и т.д.'>
        <div>
          <p class="ml-5 mr-5">Имя пользователя</p>
          <v-text-field class="ml-5 mr-5" variant='outlined' placeholder='Имя пользователя'
            v-model='userCardInfo.data.name' :disabled='true'></v-text-field>
        </div>
        <div>
          <p class="ml-5 mr-5">Никнейм</p>
          <v-text-field class='input_text ml-5 mr-5' placeholder='Никнейм' v-model='userCardInfo.data.username'
            variant='outlined' :disabled='true'></v-text-field>
        </div>
        <div>
          <p class="ml-5 mr-5">Email</p>
          <v-text-field class="ml-5 mr-5" variant='outlined' placeholder='Email' v-model='userCardInfo.data.email'
            :disabled='true'>
          </v-text-field>
        </div>
        <div>
          <p class="ml-5 mr-5">Адрес</p>
          <v-text-field class='input_text ml-5 mr-5' placeholder='Адрес' v-model='fullAddress' variant='outlined'
            :disabled='true'></v-text-field>
        </div>
        <div>
          <p class="ml-5 mr-5">Телефон</p>
          <v-text-field class='input_text ml-5 mr-5' placeholder='Телефон' v-model='userCardInfo.data.phone'
            variant='outlined' :disabled='true'></v-text-field>
        </div>
        <div>
          <p class="ml-5 mr-5">Вэбсайт</p>
          <v-text-field class='input_text ml-5 mr-5' placeholder='Вэбсайт' v-model='userCardInfo.data.website'
            variant='outlined' :disabled='true'></v-text-field>
        </div>
        <div>
          <p class="ml-5 mr-5">Компания</p>
          <v-text-field class='input_text ml-5 mr-5' placeholder='Компания' v-model='companyName' variant='outlined'
            :disabled='true'></v-text-field>
        </div>
      </v-card>
      <v-card title='Альбомы'>
        <div class='d-flex flex-row flex-wrap mt-5 mb-5 ml-5 mr-5' >
          <div class="w-50 " v-for="slide in albumsData.length" :key="albumsData[slide - 1]?.userId">
            <carousel :items-to-show="1">
              <slide class="d-flex flex-column align-center" v-for="photo in albumsData[slide - 1].album?.length"
                :key="albumsData[slide - 1].album[photo - 1].id">
                photo#{{ photo }}
                {{ albumsData[slide - 1].album?.length }}
                <div class="ml-5 mr-5">
                  <img :src="albumsData[slide - 1].album[photo - 1]?.url" alt="" width="100" height="100">
                </div>
              </slide>

              <template #addons>
                <navigation />
                <pagination />
              </template>
            </carousel>
          </div>
        </div>
      </v-card>
      <v-card style="visibility: hidden;">
        <carousel :items-to-show="1">
          <slide v-for="slide in photosData.length" :key="photosData[slide - 1]?.userId">
            <div class="d-flex  flex-column justify-space-evenly ml-5 mr-5">
              {{ photosData[slide - 1] }}
            </div>
          </slide>

          <template>
            <navigation />
            <pagination />
          </template>
        </carousel>
      </v-card>
      <v-card class='d-flex flex-column w-100' title='Посты'>
        <div class='common_info d-flex flex-column justify-space-evenly mt-5 mb-5'>
          <div class='d-flex flex-column mt-5 mb-5'>
            <carousel ref="postsData" :items-to-show="1">
              <slide v-for="slide in postsData.length" :key="postsData[slide - 1]?.userId">
                <div class="d-flex  flex-column justify-space-evenly ml-5 mr-5">
                  <b>Post's title</b>
                  {{ postsData[slide - 1]?.title }}
                  <br>
                  <br>
                  <b>Post's body</b>
                  {{ postsData[slide - 1]?.body }}
                </div>
              </slide>

              <template #addons>
                <navigation />
                <pagination />
              </template>
            </carousel>
          </div>
        </div>
      </v-card>
    </div>
    <div>
      <router-view :property='userCardInfo + postsData'></router-view>
    </div>
  </v-card>
</template>
<script>
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'


export default {
  name: 'users-view',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  setup() {
    const r = useRoute()
    const router = useRouter()
    const id = computed(() => r.params.id)
    const showCommon = ref(true)
    const tab = ref()
    const store = useStore()
    const postsArray = ref();
    const postsLoaded = ref(false);
    const selectedAlbum = ref({})
    const fullAddress = ref('');
    const companyName = ref('');

    let userCardInfo = computed(() => {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      store.dispatch('users/GET_USER', id.value).then(() => {
        companyConverter()
        addressConverter()
      })
      return store.getters['users/getUserById'](id.value)
    })

    const albumsData = computed(() => {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      store.dispatch(`dictionaries/albums/GET_LIST`, id.value).then(() => {
        selectedAlbum.value = albumsData.value.find(el => el.id === userCardInfo.value.data.id)
      })
      return store.getters[`dictionaries/albums/list`]
    })


    const photosData = computed(() => {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      store.dispatch(`dictionaries/photos/GET_LIST`, id.value).then(() => {
        albumsData.value.forEach(e => {
          e.album = []
          photosData.value.forEach(photo => {
            if (e.id === photo.albumId) {
              while (e.album.length < 5) {
                console.log(e, e.album, photo);
                e.album.push(photo);
              }
            }
          })
        });
      })

      return store.getters[`dictionaries/photos/list`]
    })

    const postsData = computed(() => {
      // eslint-disable-next-line vue/no-async-in-computed-properties
      store.dispatch(`dictionaries/posts/GET_LIST`, id.value).then(() => {
        postsArray.value = postsData.value.find(el => userCardInfo.value.data.id === el.userId)
      })
      console.log(postsData.value);
      return store.getters[`dictionaries/posts/list`]
    })

    // const selectedOrg = computed(() => {
    //   return selectedTerritory.value?.children.find(el => userCardInfo.value.data.organization === el.name)
    // })


    function addressConverter() {
      fullAddress.value = userCardInfo.value.data?.address?.city ? `${userCardInfo.value.data?.address?.city},` : 'г. N, '
      fullAddress.value += userCardInfo.value.data?.address?.street ? ` ${userCardInfo.value.data?.address?.street},` : 'у. N, '
      fullAddress.value += userCardInfo.value.data?.address?.suite ? ` ${userCardInfo.value.data?.address?.suite},` : 'д. N, '
      fullAddress.value += userCardInfo.value.data?.address?.zipcode ? ` ${userCardInfo.value.data?.address?.zipcode}` : '000-000-000'
      return fullAddress
    }

    function companyConverter() {
      companyName.value = userCardInfo.value.data?.company?.name ? `${userCardInfo.value.data?.company?.name},` : 'к. N, '
      companyName.value += userCardInfo.value.data?.company?.catchPhrase ? ` ${userCardInfo.value.data?.company?.catchPhrase},` : 'бла-бла, '
      companyName.value += userCardInfo.value.data?.company?.bs ? ` ${userCardInfo.value.data?.company?.bs},` : '----, '
      return companyName
    }


    return {
      id,
      isLoading: false,
      link: (path) => {
        if (path !== '') {
          showCommon.value = false
          router.push(path)
        } else {
          showCommon.value = true
          router.replace('./')
        }
      },
      tab,
      companyName,
      fullAddress,
      postsData,
      postsArray,
      postsLoaded,
      selectedAlbum,
      showCommon,
      userCardInfo,
      albumsData,
      photosData,
      log: () => {
        console.log(postsData.value);
      }
    }
  }
}
</script>

<style lang='scss'>
input {
  border: 1px solid #B3AEB1;
  border-radius: 5px
}

.select {
  width: 200px;
}
</style>
