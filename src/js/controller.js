import * as model from './model.js'
import { MODAL_CLOSE_SEC } from './config.js'

import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultsView.js'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'


import 'core-js/stable' // For old browser
import 'regenerator-runtime/runtime' // For old browser (async)

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

// if(module.hot) {
//   module.hot.accept()
// }

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1)

    if(!id) return

    recipeView.renderSpinner()

    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)

    // Loading recipe
    await model.loadRecipe(id)
    // const recipe = model.state.recipe

    // Rendering recipe
    recipeView.render(model.state.recipe)
  } catch(error) {
    console.error(error)
    recipeView.renderError()
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner()

    // 1) Get search query
    const query = searchView.getQuery()

    if(!query) return

    // 2) Load search results
    await model.loadSearchResults(query)

    // 3) Render results
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage())

    // 4) Render pagination button
    paginationView.render(model.state.search)
  } catch(err) {
    resultsView.renderError()
    console.log(err)
  } 
}

const controlPagination = function(gotoPage){
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(gotoPage))

  // 2) Render NEW pagination button
  paginationView.render(model.state.search)
}

const controlServings = function(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings)
  
  // Update the recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function() {
  // Add/delete bookmark
  if(model.state.recipe.bookmarked) {
    model.deleteBookmark(model.state.recipe)
  } else {
    model.addBookmark(model.state.recipe)
  }

  // Update recipe view
  recipeView.update(model.state.recipe)
  
  // Render bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner()

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe)

    // Render recipe
    recipeView.render(model.state.recipe)
    
    // Succes message
    addRecipeView.renderMessage()
    
    // Change ID in URL
    // window.location.hash = `#${model.state.recipe.id}` //Reload page
    window.history.pushState(null, '', `#${model.state.recipe.id}`) // Not reload page
    
    // Render bookmark view
    bookmarksView.render(model.state.bookmarks)

    // Close form window
    setTimeout(function() {
      addRecipeView.hideWindow()
    }, MODAL_CLOSE_SEC * 1000)
  } catch(err) {
    addRecipeView.renderError(err)
    console.error(err)
  }
}

const init = async function() {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}

init()



