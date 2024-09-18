import View from '../views/View.js'


class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was successfully uploaded :)';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super()
    this._addHandlerShowWindow()
    this._addHandlerHideWindow()
  }

  // toggleWindow() {
  //   this._window.classList.toggle('hidden')
  //   this._overlay.classList.toggle('hidden')
  // }

  showWindow() {
    this._window.classList.remove('hidden')
    this._overlay.classList.remove('hidden')
  }

  hideWindow() {
    this._window.classList.add('hidden')
    this._overlay.classList.add('hidden')
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.showWindow.bind(this))
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.hideWindow.bind(this))
    this._overlay.addEventListener('click', this.hideWindow.bind(this))
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function(e) {
      e.preventDefault()
      const dataArr = [...new FormData(this)]
      const data = Object.fromEntries(dataArr)
      handler(data)

    })
  }
}

export default new AddRecipeView()