const containerOptions = [
  {
    type: 'tip',
    locales: {
      '/': {
        defaultInfo: '提示'
      },
      '/zh/': {
        defaultInfo: '提示'
      }
    }
  },
  {
    type: 'warning',
    locales: {
      '/': {
        defaultInfo: '警告'
      },
      '/zh/': {
        defaultInfo: '警告'
      }
    }
  },
  {
    type: 'danger',
    locales: {
      '/': {
        defaultInfo: '危险'
      },
      '/zh/': {
        defaultInfo: '危险'
      }
    }
  },
  {
    type: 'details',
    before: (info: any) =>
      `<details class="custom-container details">${
        info ? `<summary>${info}</summary>` : ''
      }\n`,
    after: () => '</details>\n'
  },
  {
    type: 'code-group',
    before: () => `<CodeGroup>\n`,
    after: () => '</CodeGroup>\n'
  },
  {
    type: 'code-group-item',
    before: (info: any) => `<CodeGroupItem title="${info}">\n`,
    after: () => '</CodeGroupItem>\n'
  }
]
export { containerOptions }
