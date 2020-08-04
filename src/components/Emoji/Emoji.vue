<template>
  <span
    class="emoji-item-common"
    :class="['emoji-'+text,isInput?'emoji-size-small':'emoji-size-large']"
    @click="emojiClick"
  ></span>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: ["text", "isInput"],
  methods: {
    emojiClick() {
      this.$emit("onClick", this.text);
    },
  },
};
</script>
<style scoped lang='less'>
.comment {
  .emoji-item-common {
    background: url("~@/assets/img/emoji_sprite.png") no-repeat;
    transform: scale(0.5, 0.5);
    display: inline-block;
    margin: -18px -14px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
