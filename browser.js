const isIE = function() {
  return !isNaN(Number(document.DOCUMENT_NODE))
}

const isEdge = function() {
  return navigator.userAgent.indexOf('Edge') > -1
}

const isFirefox = function() {
  return !!window.navigator.userAgent.match(/firefox/i)
}
