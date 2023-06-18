import DefaultLayout from './DefaultLayout.vue';
import LoginLayout from './LoginLayout'

const LAYOUTS = {
  'login': LoginLayout,
}

export default {
  name: 'DynamicLayout',
  props: ['name'],

  created() {
    console.log('set layout: ', this.name);
    if(LAYOUTS[this.name]) {
      console.log('set layout on demands: ', this.name);
      this.$parent.$emit('update:layout', LAYOUTS[this.name]);
    } else {
      this.$parent.$emit('update:layout', DefaultLayout);
    }
  },

  render() {
    return this.$slots.default()[0];
  },

};