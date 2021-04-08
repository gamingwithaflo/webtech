/*
 * mobile utils
 */

const button = document.querySelector('.nav .nav__item--mobile');
const list = document.querySelector('.nav .nav__list');

/*
 * add or remove show classname when mobile menu button is clicked
 */
button?.addEventListener('click', () => {
    if (list?.classList.contains('show')) {
        list?.classList.remove('show');
    } else {
        list?.classList.add('show');
    }
});
