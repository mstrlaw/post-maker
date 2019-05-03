<template>
  <div class="addImage">
    <div
      v-if="sourceType.length === 0"
      class="select-src"
    >
      <a
        href="#"
        class="action"
        @click.prevent="setSource('url')"
      >
        <Link />&nbsp;URL
      </a>
      <a
        href="#"
        class="action"
        @click.prevent="setSource('file')"
      >
        <FolderMultipleImage />&nbsp;File
      </a>
    </div>
    <div
      v-else
      class="select-img"
    >
      <input
        v-if="sourceType === 'url'"
        type="text"
        v-model="imgSrc"
        placeholder="Paste image URL"
        class="input is-small is-fullwidth"
      >
      <input
        v-if="sourceType === 'file'"
        id="the-file-input"
        type="file"
        class="input is-small"
        accept="video/*"
        capture="camcorder"
        @change="processImage"
      >
      <a
        href="#"
        class="action no-hover"
        @click.prevent="addImage"
      ><PlusCircleOutline /></a>
      <a
        href="#"
        class="action inverted"
        @click.prevent="closeExtraToolbar"
      ><Close /></a>
    </div>
    <!--img
      ref="renderPreview"
      :src="imgSrc"
      class="img-render"
    />
    <canvas
      ref="canvasRotator"
      class="canvas-rotator"
    /-->
  </div>
</template>

<script>
import PlusCircleOutline from 'vue-material-design-icons/PlusCircleOutline.vue'
import Link from 'vue-material-design-icons/Link.vue'
import FolderMultipleImage from 'vue-material-design-icons/FolderMultipleImage.vue'
import Close from 'vue-material-design-icons/Close.vue'

export default {
  name: 'SelectImage',
  components: {
    PlusCircleOutline,
    Link,
    FolderMultipleImage,
    Close
  },
  data () {
    return {
      imgSrc: '',
      sourceType: '',
      imgPreview: ''
    }
  },
  methods: {
    setSource (source) {
      this.sourceType = source
    },
    processImage (e) {
      // const bufferReader = new FileReader()
      const reader = new FileReader()

      // bufferReader.onload = event => {
      //   this.loaded = true
      //   this.pngSource = event.target.result

      //   this.getOrientation((orientation) => {
      //     if (orientation > 0) {
      //       alert('rotate ' + orientation)
      //       this.rotateImage(orientation)
      //     } else {
      //       alert('don\'t rotate')
      //     }
      //   })
      // }

      reader.onload = event => {
        this.loaded = true
        this.imgSrc = event.target.result
      }
      // bufferReader.readAsArrayBuffer(e.target.files[0])
      reader.readAsDataURL(e.target.files[0])
    },
    addImage () {
      this.$emit('addImage', { src: this.imgSrc, type: this.sourceType })
    },
    closeExtraToolbar () {
      this.$emit('closeExtraToolbar')
    }
    // getOrientation (callback) {
    //   let view = new DataView(this.pngSource)

    //   if (view.getUint16(0, false) != 0xFFD8) {
    //     return callback(-2);
    //   }

    //   let length = view.byteLength, offset = 2

    //   while (offset < length) {
    //     if (view.getUint16(offset+2, false) <= 8) {
    //       return callback(-1)
    //     }

    //     var marker = view.getUint16(offset, false)
    //     offset += 2
    //     if (marker == 0xFFE1) {
    //       if (view.getUint32(offset += 2, false) != 0x45786966) {
    //         return callback(-1)
    //       }

    //       var little = view.getUint16(offset += 6, false) == 0x4949
    //       offset += view.getUint32(offset + 4, little)
    //       var tags = view.getUint16(offset, little)
    //       offset += 2
    //       for (var i = 0; i < tags; i++) {
    //         if (view.getUint16(offset + (i * 12), little) == 0x0112) {
    //           return callback(view.getUint16(offset + (i * 12) + 8, little))
    //         }
    //       }
    //     } else if ((marker & 0xFF00) != 0xFF00) {
    //       break
    //     } else {
    //       offset += view.getUint16(offset, false)
    //     }
    //   }
    //   return callback(-1)
    // },
    // async rotateImage (orientation) {

    //   // console.log('rotateImage ' + orientation)

    //   let img = this.$refs.renderPreview
    //   let canvas = this.$refs.canvasRotator

    //   alert(canvas)

    //   // Set variables
    //   let ctx = canvas.getContext('2d')
    //   let width = img.width
    //   let height = img.height


    //   // set proper canvas dimensions before transform & export
    //   if ([5, 6, 7, 8].indexOf(orientation) > -1) {
    //     alert('Invert sizes')
    //     canvas.width = height
    //     canvas.height = width
    //   } else {
    //     canvas.width = width
    //     canvas.height = height
    //   }

    //   // transform context before drawing image
    //   switch (orientation) {
    //     case 2:
    //       ctx.transform(-1, 0, 0, 1, width, 0)
    //       break
    //     case 3:
    //       ctx.transform(-1, 0, 0, -1, width, height)
    //       break
    //     case 4:
    //       ctx.transform(1, 0, 0, -1, 0, height)
    //       break
    //     case 5:
    //       ctx.transform(0, 1, 1, 0, 0, 0)
    //       break
    //     case 6:
    //       ctx.transform(0, 1, -1, 0, height, 0)
    //       break
    //     case 7:
    //       ctx.transform(0, -1, -1, 0, height, width)
    //       break
    //     case 8:
    //       ctx.transform(0, -1, 1, 0, 0, width)
    //       break
    //     default:
    //       ctx.transform(1, 0, 0, 1, 0, 0)
    //   }

    //   // Draw img into canvas
    //   ctx.drawImage(img, 0, 0, width, height)

    //   let url = canvas.toDataURL('image/png')
    //   // this.imgPreview = url
    //   this.imgSrc = url
    // },
  }
}
</script>

<style lang="scss">
  .select-src{
    display: flex;
    width: 100%;
    .action{
      width: 50%!important;
      line-height: 2.2em;
      text-decoration: none;
    }
  }

  .select-img{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  .canvas-rotator{
    position: absolute;
    top: -500px;
    z-index: 100;
  }
</style>
