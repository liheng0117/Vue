import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import qs from "qs";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tableData: [],
  },
  mutations: {
    FETCH_HOME_DATA(state, payload) {
      state.tableData = payload;
    },
  },
  actions: {
    //  获取用户数据
    FETCH_ACTION_DATA({ commit }) {
      axios
        .get("https://api.baxiaobu.com/index.php/home/v5/getuser")
        .then((res) => {
          commit("FETCH_HOME_DATA", res.data.users);
        });
    },
    //  调用删除接口
    FETCH_ACTION_DELETE(context, payload) {
      axios
        .post(
          "https://api.baxiaobu.com/index.php/home/v5/deleteUser",
          qs.stringify(payload)
        )
        .then((res) => {
          if (res.data.status === "200") {
            context.dispatch("FETCH_ACTION_DATA");
          }
        });
    },
    //  调用添加接口
    FETCH_ACTION_ADD(context, payload) {
      axios
        .post(
          "https://api.baxiaobu.com/index.php/home/v5/add",
          qs.stringify(payload)
        )
        .then((res) => {
          if (res.data.status === "200") {
            context.dispatch("FETCH_ACTION_DATA");
          }
        });
    },
    //  调用编辑接口
    FETCH_ACTION_UPDATE(context, payload) {
      axios
        .post(
          "https://api.baxiaobu.com/index.php/home/v5/updateUser",
          qs.stringify(payload)
        )
        .then((res) => {
          if (res.data.status === "200") {
            context.dispatch("FETCH_ACTION_DATA");
          }
        });
    },
    //  调用搜索接口
    FETCH_ACTION_SEARCH(context, payload) {
      axios
        .get(
          "https://api.baxiaobu.com/index.php/home/v5/findUser?keyword=" +
            payload
        )
        .then((res) => {
          context.commit("FETCH_HOME_DATA", res.data.users);
        });
    },
  },
  modules: {},
});
