const md = `{
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
}`

const createScript = (str: string) => {
  return {
    content: `<script>
      export default ${str}
    </script>`,
    tagOpen: '<script>',
    type: 'script',
    contentStripped: `export default ${str}`,
    tagClose: '</script>'
  }
}

export default {
  md: createScript(md)
}
