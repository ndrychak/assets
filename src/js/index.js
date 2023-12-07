import { storage } from './helpers/storage.js'
import { LoginModule } from './modules/login.js'
import { AssetsModule } from './modules/assets.js'
import { HeaderModule } from './modules/header.js'
import { FooterModule } from './modules/footer.js'

const renderDynamicData = () => {
  HeaderModule().render()
  AssetsModule().render()
}

const renderAll = () => {
  renderDynamicData()
  FooterModule(renderDynamicData).render()
}

addEventListener('DOMContentLoaded', () => {
  storage.assets.get() ? renderAll() : LoginModule(renderAll).render()
});
