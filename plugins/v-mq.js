import Vue from 'vue';
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: {
    md: 769,
    mmd: 880,
    lg: 1024,
    xlg: Infinity,
  },
});
