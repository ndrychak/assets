import { storage } from './helpers/storage.js'
import { renderDynamic } from './helpers/render.js'
import { LoginModule } from './modules/login.js'
import { FooterModule } from './modules/footer.js'

const renderAll = () => {
  renderDynamic()
  FooterModule().render()
}

addEventListener('DOMContentLoaded', () => {
  storage.assets.get() ? renderAll() : LoginModule(renderAll).render()
});
