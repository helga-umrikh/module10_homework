const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
    btn.classList.toggle('hide');
    btn.classList.toggle('display');
});