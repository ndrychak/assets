import { AssetsModule } from '../modules/assets.js'
import { HeaderModule } from '../modules/header.js'

export const renderDynamic = () => {
  HeaderModule().render()
  AssetsModule().render()

  const html = document.getElementById('html')
  const content = document.getElementById('content')
  html.classList.remove(['overscroll-none'])
  content.classList.remove(...['blur-[1px]', 'brightness-50'])
}