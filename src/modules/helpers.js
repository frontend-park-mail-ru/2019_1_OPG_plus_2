export const genericBeforeEnd = (el, ...templates) => el.insertAdjacentHTML('beforeend', templates.join('\n'));