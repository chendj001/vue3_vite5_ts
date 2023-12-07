function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
const createScript = (id: string) => {
  let md = `<script>
  export default {
    data() {
      return {
        __cls: ''
      }
    },
    mounted() {
      const meta = this.$route.meta
      if(meta){
        this.__cls = meta.cls||''
      }
    }
  }
</script>`
  return {
    content: md,
    tagOpen: '<script>',
    type: 'script',
    contentStripped: `export default ${md}`,
    tagClose: '</script>'
  }
}

export default {
  md: (id: string) => createScript(id)
}
