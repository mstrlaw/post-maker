<template>
  <div class="toolbar">
    <div
      :class="[actionType, { 'visible': visibleExtra }]"
      class="extra-actions"
    >
      <SelectImage
        v-if="actionType === 'add-image'"
        @addImage="addImage"
        @closeExtraToolbar="closeExtraToolbar"
      />
    </div>
    <div class="actions">
      <a
        href="#"
        class="action"
      ><FormatTitle /></a>
      <a
        href="#"
        class="action"
        @click.prevent="toggleToolbar('add-image')"
      ><ImageMultiple /></a>
      <a
        href="#"
        class="action ml-auto"
        @click.prevent="download"
      ><Download /></a>
    </div>
    <!--a
      href="#"
      class="action"
      @click.prevent="changeLayout('post')"
    >Post</a>
    <a
      href="#"
      class="action"
      @click.prevent="changeLayout('story')"
    >Story</a-->
  </div>
</template>

<script>
import FormatTitle from 'vue-material-design-icons/FormatTitle.vue'
import ImageMultiple from 'vue-material-design-icons/ImageMultiple.vue'
import Download from 'vue-material-design-icons/Download.vue'
import SelectImage from '@/components/extraActions/SelectImage'

export default {
  name: 'Toolbar',
  components: {
    FormatTitle,
    ImageMultiple,
    Download,
    SelectImage
  },
  data () {
    return {
      visibleExtra: false,
      actionType: ''
    }
  },
  methods: {
    toggleToolbar (type) {
      if (this.visibleExtra) {
        this.visibleExtra = false
        this.actionType = ''
      } else {
        this.visibleExtra = true
        this.actionType = type
      }
    },
    addImage ({ src, type }) {
      this.$emit('addImage', { src: src, type: type })
    },
    download () {
      this.$emit('download')
    },
    closeExtraToolbar () {
      this.visibleExtra = false
      this.actionType = ''
    }
  }
}
</script>

<style lang="scss">
  .toolbar{
    display: flex;
    flex-direction: column;
    width: 100%;

    .extra-actions{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 50px;
      transform: translateY(50px);
      transition: transform .2s;
      background: $dark;
      z-index: 10;

      &.visible{
        transform: translateY(0);
        transition: transform .2s;
      }

      &.add-image{
        .addImage{
          display: flex;

        }
      }

      .addImage{
        display: none;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
      }

      .left-actions{
        margin-right: auto;
      }
      .right-actions{
        display: flex;
        justify-content: flex-end;
      }

    }

    .actions{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      background: $dark;
      border-top: 2px solid $light;
      z-index: 15
    }

    .action{
      display: flex;
      align-items: flex-start;
      justify-content: center;
      height: 45px;
      width: 50px;
      font-size: 1.5em;
      background: $dark;
      color: $purple;
      padding-bottom: 5px;

      &.inverted{
        background: $purple;
        color: $dark;
        &:hover{
          background: $light;
          color: $purple;
        }
      }

      &.no-hover{
        &:hover{
          background: $dark;
          color: $light;
        }
      }

      &:hover{
        background: $purple;
        color: $dark;
      }
    }

    .ml-auto{
      margin-left: auto;
    }
  }
</style>
