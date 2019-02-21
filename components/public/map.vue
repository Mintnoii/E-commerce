<template>
  <div
    :id="id"
    :style="{width:width+'px',height:height+'px',margin:'34px auto', borderRadius: '15px', position: position, top: top, bottom: bottom}"
    class="m-map"/>
</template>

<script>
export default {
  props: {
    width: {
      type:Number,
      default:280
    },
    height: {
      type:Number,
      default:280
    },
    position: {
      type: String,
      default: 'absolute'
    },
    // 默认北京经纬度
    point: {
      type:Array,
      default(){
        return [116.46,39.92]
      }
    },
    top: {
      type: String,
      default: 'auto'
    },
    bottom: {
      type: String,
      default: 'auto'
    }
  },
  data() {
    return {
      id: `map`,
      key: '高德地图应用key值'
    }
  },
  watch: {
    point: function (val, old) {
      this.map.setCenter(val)
      this.marker.setPosition(val)
    }
  },
  mounted() {
    let self = this
    // 挂载时将地图控件id改为动态的
    self.id = `map${Math.random().toString().slice(4, 6)}`
    // mounted之后才能拿到window对象，然后执行自定义的回调
    window.onmaploaded = () => {
      
      // 声明地图控件类并实例化对象
      let map = new window.AMap.Map(self.id, {
        resizeEnable: true,
        zoom: 11,
        center: self.point
      })
      self.map = map

      // 添加一些插件
      window.AMap.plugin('AMap.ToolBar', () => {
        let toolbar = new window.AMap.ToolBar()
        map.addControl(toolbar)
        let marker = new window.AMap.Marker({
          icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
          position: self.point
        })
        self.marker = marker
        marker.setMap(map)
      })
    }

    // 注意自定义的回调函数名字 onmaploaded
    const url = `https://webapi.amap.com/maps?v=1.4.12&key=${self.key}&callback=onmaploaded`
    let jsapi = document.createElement('script')
    jsapi.charset = 'utf-8'
    jsapi.src = url
    document.head.appendChild(jsapi)
  }
}
</script>
