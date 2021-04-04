const button = document.querySelector('.nav .nav__item--mobile');
const list = document.querySelector('.nav .nav__list');

button?.addEventListener('click', function() {
    console.log('click');
    if (list?.classList.contains('show')) {
        list?.classList.remove('show');
    } else {
        list?.classList.add('show');
    }
});
