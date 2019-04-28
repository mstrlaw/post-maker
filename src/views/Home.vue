<template>
  <div class="workspace">
    <div class="canvas-wrapper">
      <canvas
        ref="canvas"
        id="canvasEl"
        class="canvas"
        :width="width"
        :height="height"
      />
    </div>
    <div class="toolbar-wrapper">
      <Toolbar
        @addImage="addImage"
        @download="generate"
      />
    </div>
    <img
      ref="renderPreview"
      :src="pngSource"
      class="img-render"
    />
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import { fabric } from 'fabric-browseronly'
export default {
  name: 'home',
  components: {
    Toolbar
  },
  data () {
    return {
      canvas: false,
      width: 400,
      height: 400,
      pngSource: '',
      generated: false
    }
  },
  mounted () {
    this.width = this.height = window.innerWidth
    // // create a rectangle object
    // var rect = new fabric.Rect({
    //   left: 0,
    //   top: 0,
    //   fill: 'red',
    //   width: 20,
    //   height: 20
    // })

    this.initCanvas()

    // this.canvas.on({
    //   'touch:longpress': function() {
    //     var text = document.createTextNode(' Longpress ')
    //     alert(text)
    //   }
    // })

    // "add" rectangle onto canvas
    // this.canvas.add(rect)
  },
  methods: {
    async initCanvas () {
      setTimeout(() => {
        this.canvas = new fabric.Canvas('canvasEl')
      }, 500)
    },
    addImage ({ src, type }) {
      if (type === 'url') {
        fabric.Image.fromURL(src, oImg => {
          this.canvas.add(oImg)
        })
      } else {
        this.pngSource = src

        let imgElement = this.$refs.renderPreview

        // console.log(imgElement)


        setTimeout(() => {
          // let w = imgElement.clientWidth
          // let h = imgElement.clientHeight

          var imgInstance = new fabric.Image(imgElement, {
            left: 10,
            top: 10
          })

          imgInstance.scaleToHeight(this.width)
          imgInstance.scaleToWidth(this.width)

          this.canvas.add(imgInstance)
        }, 500)
        // this.setOrientation(imgElement).then(() => {
        // })

        // this.pngSource = ''
      }
    },
    generate () {
      let dataURL = this.$refs.canvas.toDataURL('image/png')
      this.$store.commit('saveResult', dataURL)
      this.$router.push({ name: 'download' })
    }
  }
}
</script>

<style lang="scss">

  .workspace{
    display: flex;
  }

  .toolbar-wrapper{
    position: absolute;
    bottom: 0;
    z-index: 10;
    width: 100%;
  }

  .canvas-wrapper{
    width: 100%;
    height: 100%;
    border: 1px solid #DDD;
    display: block;
    .canvas-container{
      margin: 0 auto;
    }
  }

  .img-render{
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

</style>
