<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
export default {
  props: {
    iconClass: {
      type: String,
    },
    className: {
      type: String,
    },
  },
  data() {
    return {
      msg: "模块化",
    };
  },
  methods: {},
  computed() {
    console.log(this.iconClass);
  },
  computed: {
    iconName: function () {
      return `#icon-${this.iconClass}`;
    },
    svgClass: function () {
      if (this.className) {
        return `svg-icon ${this.className}`;
      } else {
        return `svg-icon`;
      }
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -5px;
  font-size: 20px;
  fill: currentColor;
  overflow: hidden;
  margin-right: 5px;
}
</style>
