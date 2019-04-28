<template>
  <div>
    <img
      :src="pngSource"
      id="mirror"
      class="canvas-mirror"
    />
    <div class="cta">
      <div v-if="isMobile">
        Use the <em>save image</em> option
      </div>
      <div
        v-else
        class="btn-wrapper">
        <a
          id="download"
          download="image.png"
          :href="pngSource"
          class="button"
        >Donwload</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Download',
    data () {
      return {
        isMobile: false
      }
    },
    mounted () {
      if (window.innerWidth < 680) {
        this.isMobile = true
      }
    },
    computed: {
      pngSource () {
        return this.$store.getters.pngSrc
      }
    }
  }
</script>


<style lang="scss">
  .canvas-mirror{
    width: 100%;
    height: 100%;
  }

  .cta{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .button{
    background: $dark;
    color: $green;
    padding: .5em 1em;
    text-decoration: none;
    text-transform: uppercase;
  }
</style>
