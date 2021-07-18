import Vue from 'vue';
import Vuex from 'vuex';
import HOST from '@/graphql/env.js';
import {
  getHomePage, // 首页
  getChannels, // 备考通道
  getProjects, // 项目介绍
  getLinks, // 页面通用链接
  getTeachers, // 名师风采
  getSchoolDetails, // 院校详情
  getSchools, // 院校指南
  getActives,
  getBanners,
  getSchedules
} from '@/graphql/api.js';
// import { schedules } from '@/data/mutable.js';
import sortBy from 'lodash/sortBy';
const BANNER_KEY = {
  aboutpage: '2',
  activepage: '1',
  adsdetailpage: '28',
  channelpage: '3',
  classpage: '4',
  homepage: '5',
  projectpage: '6',
  schedulepage: '29',
  schoolpage: '7',
  stylepage: '8',
  home_ads: '15',
  active_ads: '20',
  channel_ads: '21',
  college_ads: '22',
  famous_ads: '23',
  class_ads: '24',
  schedule_ads: '25',
  about_ads: '26',
  project_ads: '27'
};
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    BANNER_KEY,
    schedules: [],
    drawer: false,
    channels: [],
    projects: [],
    items: [],
    teachers: [],
    schools: [],
    homeProjects: [],
    schoolDetails: [],
    actives: [],
    banners: [],
    wxImgs: [
      {
        icon: HOST + '/uploads/wechat1_10c3dbc096.jpeg'
      },
      {
        icon: HOST + '/uploads/wechat2_c360ad0b01.jpeg'
      }
    ]
  },
  getters: {
    links: (state) => state.items,
    actives: (state) => state.actives,
    projects: (state) => state.projects,
    channels: (state) => state.channels,
    teachers: (state) => state.teachers,
    schools: (state) => state.schools,
    homeProjects: (state) => state.homeProjects,
    schoolDetails: (state) => state.schoolDetails,
    aboutPage: (state) => {
      return {
        bannerImg: state.banners.find(v => v.id === BANNER_KEY.aboutpage),
        content: state.banners.find(v => v.id === '9')
      };
    },
    activePage: (state) => {
      return {
        bannerImg: state.banners.find(v => v.id === BANNER_KEY.activepage)
      };
    },
    channelPage: (state) => {
      return {
        bannerImg: state.banners.find(v => v.id === BANNER_KEY.channelpage)
      };
    },
    classPage: (state) => {
      return {
        bannerImg: state.banners.find(v => v.id === BANNER_KEY.classpage),
        content: state.banners.find(v => v.id === '10')
      };
    },
    homePage: (state) => {
      return {
        bannerImg: state.banners.find(v => v.id === BANNER_KEY.homepage),
        content: state.banners.find(v => v.id === '9'),
        activeImg: state.actives.filter(v => v.id === '1' || v.id === '2'),
        downloadImg: state.banners.filter(v => v.id === '11' || v.id === '12'),
        answerImg: state.banners.find(v => v.id === '13'),
        teacherImg: state.banners.find(v => v.id === '8'),
        classImg: state.banners.find(v => v.id === '14')
      };
    },
    projectPage: (state) => {
      return {
        bannerImg: state.banners.find(v => v.id === BANNER_KEY.projectpage)
      };
    },
    schoolPage: (state) => {
      return {
        bannerImg: state.banners.find(v => v.id === BANNER_KEY.schoolpage)
      };
    },
    stylePage: (state) => {
      return {
        bannerImg: state.banners.find(v => v.id === BANNER_KEY.stylepage)
      };
    },
    schedulePage: (state) => {
      return {
        bannerImg: state.banners.find(v => v.id === BANNER_KEY.schedulepage),
        schedules: state.schedules
      };
    },
    adsDetailPage: (state) => {
      return {
        bannerImg: state.banners.find(v => v.id === BANNER_KEY.adsdetailpage),
        actives: state.banners.filter(v => ['16', '17', '18'].includes(v.id)),
        answerImg: state.banners.find(v => v.id === '19')
      };
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    updateChannels: (state, payload) => (state.channels = payload),
    updateProjects: (state, payload) => (state.projects = payload),
    updateHomePageProjects: (state, payload) => (state.homeProjects = payload),
    updateFooter: (state, payload) => (state.items = payload),
    updateTeachers: (state, payload) => (state.teachers = payload),
    updateSchools: (state, payload) => (state.schools = payload),
    updateSchoolDetails: (state, payload) => (state.schoolDetails = payload),
    updateActives: (state, payload) => (state.actives = payload),
    updateBanners: (state, payload) => (state.banners = payload),
    updateSchedules: (state, payload) => (state.schedules = payload)
  },
  actions: {
    fetchHomePage: ({ commit }) => {
      getHomePage().then(res => {
        if (res) {
          commit('updateHomePageProjects', res.homePageProjects);
        }
      });
    },
    fetchChannels: ({ commit }) => {
      getChannels()
        .then((res) => {
          if (res) {
            res.channels.forEach(item => {
              item.imgUrl = item.imgUrl && HOST + item.imgUrl.url;
            });
            commit('updateChannels', res.channels);
          }
        });
    },
    fetchProjects: ({ commit }) => {
      getProjects().then(res => {
        if (res) {
          res.projects.forEach(item => {
            item.backImg = item.backImg && HOST + item.backImg.url;
            item.headImg = item.headImg && HOST + item.headImg.url;
          });
          commit('updateProjects', res.projects);
        }
      });
    },
    fetchLinks: ({ commit }) => {
      getLinks().then(res => {
        if (res) {
          const links = sortBy(res.pageFooters, 'index');
          commit('updateFooter', links);
        }
      });
    },
    fetchTeachers: ({ commit }) => {
      getTeachers().then(res => {
        if (res) {
          res.teachers.forEach(item => {
            item.avator = item.avator && HOST + item.avator.url;
          });
          commit('updateTeachers', res.teachers);
        }
      });
    },
    fetchSchools: ({ commit }) => {
      getSchools().then(res => {
        if (res) {
          res.schools.forEach(item => {
            item.bgImage = item.bgImage && HOST + item.bgImage.url;
            item.icon = item.icon && HOST + item.icon.url;
          });
          commit('updateSchools', res.schools);
        }
      });
    },
    fetchSchoolDetails: ({ commit }) => {
      getSchoolDetails().then(res => {
        if (res) {
          res.schoolDetails.forEach(item => {
            item.headerImg = item.headerImg && HOST + item.headerImg.url;
            item.imgInfo = item.imgInfo && HOST + item.imgInfo.url;
            item.projects = item.projects.map(elem => {
              elem.secondImg = elem.secondImg && HOST + elem.secondImg.url;
              elem.thirdImg = elem.thirdImg && HOST + elem.thirdImg.url;
              return elem;
            });
          });
          commit('updateSchoolDetails', res.schoolDetails);
        }
      });
    },
    fetchActives: ({ commit }) => {
      getActives().then(res => {
        if (res) {
          res.actives.forEach(item => {
            item.imgUrl = item.imgUrl && HOST + item.imgUrl.url;
          });
          commit('updateActives', res.actives);
        }
      });
    },
    fetchBanners: ({ commit }) => {
      getBanners().then(res => {
        if (res) {
          res.banners.forEach(item => {
            item.imgLink = item.imgLink && HOST + item.imgLink.url;
          });
          commit('updateBanners', res.banners);
        }
      });
    },
    fetchSchedules: ({ commit }) => {
      getSchedules().then(res => {
        if (res) {
          commit('updateSchedules', res.schedules);
        }
      });
    }
  }
});
