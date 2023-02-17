/*
 * @Author: fzf404
 * @Date: 2022-05-26 19:48:32
 * @LastEditors: fzf404 me@fzf404.art
 * @LastEditTime: 2022-10-16 21:44:39
 * @Description: window 管理
 */

import { BrowserWindow } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

import { pluginList } from '#/config'
import { cget } from '~/storage'
import { initWinEvent } from './utils'

// 窗口网格大小
const BasicMesh = 100

// 创建窗口
export const createWindow = (name) => {
  // 判断插件存在
  const plugin = pluginList.find((item) => item.name === name)
  if (!plugin) {
    return
  }

  // 判断窗口启动
  const isOpen = BrowserWindow.getAllWindows().find((item) => item.title === name)

  if (isOpen) {
    return isOpen.show()
  }

  // 窗口大小
  const size = plugin.size

  // 窗口位置
  const x = cget(name, 'x', undefined)
  const y = cget(name, 'y', undefined)
  const top = cget(name, 'top', false)

  // 创建窗口
  const win = new BrowserWindow({
    x: x, // 窗口位置
    y: y,
    title: name, // 窗口名
    width: size[0] * BasicMesh, // 窗口大小
    height: size[1] * BasicMesh,
    alwaysOnTop: top, // 置顶

    frame: false, // 隐藏边框
    resizable: false, // 不可改变大小
    hasShadow: false, // 隐藏阴影
    transparent: true, // 窗口透明
    skipTaskbar: true, // 隐藏任务栏图标
    fullscreenable: false, // 禁止全屏
    roundedCorners: false, // 阻止圆角

    // vibrancy: 'dark', // 毛玻璃效果
    visualEffectState: 'active', // 保持窗口激活

    webPreferences: {
      nodeIntegration: true, // 开启 Node 集成
      contextIsolation: false, // 关闭上下文隔离
      webSecurity: false, // 关闭跨域安全限制
    },
  })

  // 根据模式启动应用
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // 加载应用
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '#/' + name)
    // 默认不开启调试器
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    // 生产模式
    createProtocol('monit') // 创建协议
    win.loadURL('monit://./index.html#/' + name) // 加载应用
  }

  // 监听事件
  initWinEvent(win, name)
}

// 开机自启窗口
export const initWindow = () => {
  const openPlugins = cget('config', 'open', [])
  // 是否存在自启插件
  if (openPlugins.length) {
    openPlugins.forEach((item) => {
      createWindow(item)
    })
  } else {
    createWindow('welcome')
  }
}
