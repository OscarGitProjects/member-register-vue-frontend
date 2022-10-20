import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import MemberList from "./components/member/MemberList.vue";
import NotFound from "./components/navigation/NotFound.vue";
import MemberDetail from "./components/member/MemberDetail.vue";
import MemberCreate from "./components/member/MemberCreate.vue";
import MemberEdit from "./components/member/MemberEdit.vue";

const router = createRouter({
  // Use the built in support in the browser
  history: createWebHistory(),

  routes: [
    { path: "/", redirect: "/members" },
    {
      name: "memberWithId",
      path: "/member/:memberId",
      component: MemberDetail,
    },
    { name: "members", path: "/members", component: MemberList },
    { name: "memberCreate", path: "/membercreate", component: MemberCreate },
    {
      name: "memberEditWithId",
      path: "/memberedit/:memberId",
      component: MemberEdit,
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

const app = createApp(App);

// Change the address to your webapi
app.config.globalProperties.$hostName =
  "https://localhost:7084/api/MemberRegister";

app.use(router);

app.mount("#app");
