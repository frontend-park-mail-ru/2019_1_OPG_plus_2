/**
 * Extend element el with templates
 * @param {Element} el Element to extend with templates
 * @param {Array.<string>} templates Templates inserted into el with "beforeend" attribute
 */
export const genericBeforeEnd = (el, ...templates) => el.insertAdjacentHTML('beforeend', templates.join('\n'));