import { defineComponent, nextTick, ref } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'Icon',
  setup() {
    const state = ref({
      status: false
    })
    const click = () => {
      state.value.status = false
      setTimeout(() => {
        state.value.status = true
      }, 20)
    }
    return {
      state,
      click
    }
  },
  render() {
    return (
      <div
        onClick={this.click}
        class={['ani-icon', { active: this.state.status }]}
      >
        <div class="ani-icon-base">{this.$slots?.default?.()}</div>
        <div class="ani-icon-border">{this.$slots?.default?.()}</div>
        <div class="ani-icon-fill">
          {this.$slots?.fill ? this.$slots?.fill?.() : this.$slots?.default?.()}
        </div>
      </div>
    )
  }
})
