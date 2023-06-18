import { Form as VeeForm, Field as VeeField } from "vee-validate";

// import default rules from @vee-validate/rules
import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';
// and register them as global
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});

export default {
  install(app) {
    app.component("VeeForm", VeeForm);
    app.component("VeeField", VeeField);
  },
};