<template>
  <div
    id="detail"
    flex
    column
  >
    <background-img>
      <div class="normalHeader">
        <banner
          v-if="banner.imgLink"
          :src="banner.imgLink"
          :query="BANNER_KEY && BANNER_KEY.college_ads"
        />
        <!-- <div class="nhCover" /> -->
      </div>
    </background-img>
    <v-flex
      style="padding: 0 18%;"
    >
      <v-img
        v-if="details.headerImg"
        height="100%"
        width="100%"
        contain
        :src="details.headerImg"
        :aspect-ratio="aspectRatio"
      />
      <v-card-text class="title_blod font18">
        {{ details.title }}
      </v-card-text>
      <v-card-text v-html="details.desc" />
      <template v-if="details.imgInfo">
        <v-img
          height="100%"
          width="100%"
          :src="details.imgInfo"
        />
      </template>
      <template v-else>
        <v-card
          v-for="(ele, k) in details.projects"
          :key="k"
          tile
          style="margin-bottom: 20px; padding: 8px 16px;"
        >
          <v-card-text class="title_blod font16">
            {{ ele.secondTitle }}
          </v-card-text>
          <v-img
            v-if="ele.secondImg"
            :src="ele.secondImg"
          />
          <v-flex
            v-for="(data, j) in ele.secondDesc"
            :key="j"
          >
            <v-card-text
              v-if="data.title"
              class="title_blod"
            >
              {{ data.title }}
            </v-card-text>
            <v-card-text>{{ data.desc }}</v-card-text>
          </v-flex>
          <v-img
            v-if="ele.thirdImg"
            :src="ele.thirdImg"
          />
        </v-card>
      </template>
    </v-flex>
  </div>
</template>
<script>
  import { mapGetters, mapActions, mapState } from 'vuex';
  import { onResize } from '../mixin/mixin';
  export default {
    name: 'SchoolDetail',
    components: {
      Banner: () => import('@/components/base/Banner'),
      BackgroundImg: () => import('@/components/base/BackgroundImg')
    },
    mixins: [onResize],
    data () {
      return {
        details: []
      };
    },
    computed: {
      ...mapState(['BANNER_KEY']),
      ...mapGetters(['schoolDetails', 'schoolPage']),
      banner () {
        return this.schoolPage && this.schoolPage.bannerImg;
      }
    },
    watch: {
      schoolDetails (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.details = newVal[+this.$route.params.id];
        }
      }
    },
    mounted: function () {
      this.fetchSchoolDetails();
      this.aspectRatio = this.$data.aspectRatio;
    },
    methods: {
      ...mapActions(['fetchSchoolDetails'])
    }
  };
</script>
<style lang="less">
.title_blod {
  font-weight: bold;
}
.font18 {
  font-size: 18px;
}
.font16 {
  font-size: 16px;
}
</style>
