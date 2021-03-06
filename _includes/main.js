window.makeSearchable = makeSearchable
window.lazyLoad = lazyLoad
window.makeExternalLinksTargetBlank = makeExternalLinksTargetBlank

main()

function main () {
  [...document.querySelectorAll('.searchable')].forEach(makeSearchable)

  try { makeExternalLinksTargetBlank() } catch (err) { console.error(err.message) }

  try { lazyLoad('[lazy]') } catch (err) { console.error(err.message) }
}

function makeSearchable ($searchable) {
  const $search = document.createElement('input')
  $search.setAttribute('class', 'searchable-input')
  $search.setAttribute('type', 'test')
  $search.setAttribute('placeholder', 'Search posts...')
  $search.onkeyup = handleSearchKeyUp
  $searchable.parentNode.insertBefore($search, $searchable)
  $search.focus()

  function handleSearchKeyUp (e) {
    const searchTerm = e.target.value
    const searchRegExp = new RegExp(searchTerm.replace(' ', '.*'), 'i')
    const $searchableItems = [...($searchable.querySelectorAll('a,li,div') || [])]
    if ($searchableItems.length > 200) $searchableItems.length = 200
    const postTitles = $searchableItems.map($el => $el.innerText)
    const noMatch = postTitles.filter(t => searchRegExp.test(t)).length === 0

    $searchableItems.forEach(function ($postLi) {
      const show = noMatch || !searchTerm || searchRegExp.test($postLi.innerText)
      if (!show) {
        $postLi.style.display = 'none'
      } else {
        $postLi.style.display = 'block'
      }
    })
  }
}

function lazyLoad (selector = '[lazy]') {
  console.log('lazyLoad', selector)

  let $lazy = typeof selector === 'string' ? [...document.querySelectorAll(selector)] : [...selector]
  console.log('$lazy.length', $lazy.length)

  $lazy = $lazy.filter(el => !(isScrolledIntoView(el) && applyLazy(el)))
  console.log(' - $lazy.length', $lazy.length)

  let lastCheck
  window.onscroll = function (e) {
    if (lastCheck && ($lazy.length === 0 || lastCheck > Date.now() - 50)) return
    lastCheck = Date.now()
    $lazy = $lazy.filter(el => !(isScrolledIntoView(el) && applyLazy(el)))
  }

  function applyLazy (el) {
    const imageUrl = el.getAttribute('lazy')
    if (el instanceof window.HTMLImageElement) {
      el.setAttribute('src', imageUrl)
    } else {
      el.style.backgroundImage = `url(${imageUrl})`
    }
    return true
  }

  function isScrolledIntoView (el) {
    var rect = el.getBoundingClientRect()
    var isVisible = (rect.top >= 0) && (rect.bottom <= (window.innerHeight + rect.height))
    return isVisible
  }
}

function makeExternalLinksTargetBlank () {
  const externalLinks = [...document.querySelectorAll(`body a:not([href~='${window.location.hostname}']):not([href^='/'])`)]
  console.log('external links', externalLinks.length, externalLinks.map(el => el.getAttribute('href')).filter(Boolean))
  externalLinks.forEach(el => el.setAttribute('target', '_blank'))
}
