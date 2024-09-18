import View from '../views/View.js'

// import icons from '../../img/icons.svg' //Parcel 1
import icons from 'url:../../img/icons.svg' //Parcel 2

class PaginationView extends View{
  _parentElement = document.querySelector('.pagination')

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('button')
      
      if(!btn) return

      const gotoPage = Number(btn.dataset.goto)
      handler(gotoPage)
    })
  }

  _generateMarkup() {
    const curPage = this._data.page
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)

    const prevBtn = `
      <button data-goto=${curPage - 1} class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
    `
    const nextBtn = `
      <button data-goto=${curPage + 1} class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `

    // Page 1 and there are other pages
    if(curPage === 1 && numPages > 1) {
      return nextBtn
    }
    
    // Last page
    if(curPage === numPages && numPages > 1) {
      return prevBtn
    }
      
      // Other page
      if(curPage < numPages) {
        return prevBtn + nextBtn
      }
        

      // Page 1 and there are NO other pages
      return ''
    }
  }

export default new PaginationView()