import fs from 'fs'
import path from 'path'

let options: any = {}
const { resolve, join, extname } = path
const { existsSync, readdirSync, statSync, unlinkSync, rmdirSync } = fs

/**
 * 递归清理文件夹
 * @param {string} dirPath - 文件夹路径
 */
function cleanFiles(dirPath: any) {
  if (existsSync(dirPath)) {
    let files = readdirSync(dirPath)
    files.forEach((file) => {
      let filePath = join(dirPath, file)
      if (statSync(filePath).isDirectory()) {
        cleanFiles(filePath)
        rmdirSync(filePath)
      } else {
        unlinkSync(filePath)
      }
    })
  }
}

/**
 * Vite 清理插件
 * @param {any} _opt - 插件配置选项
 * @param {string|string[]} _opt.targetFiles - 目标文件/文件夹路径，支持单个路径或路径数组，默认为 ['dist','dist.zip]
 * @returns {object} - Vite 插件对象
 */
const cleanPlugin = (_opt: any) => {
  options = Object.assign(
    {
      targetFiles: /^z-studio-web|\.zip$|dist/
    },
    _opt
  )
  return {
    name: 'vite-plugin-clean',
    enforce: 'pre',
    apply: 'build',
    buildStart: (config: any) => {
      const { targetFiles } = options
      const rootDirectory = process.cwd()
      const files = readdirSync(rootDirectory)
      files.forEach((file) => {
        if (targetFiles.test(file)) {
          const filePath = resolve(rootDirectory, file)
          if (statSync(filePath).isDirectory()) {
            cleanFiles(filePath)
            rmdirSync(filePath)
          } else {
            unlinkSync(filePath)
          }
        }
      })
    }
  }
}

export default cleanPlugin
