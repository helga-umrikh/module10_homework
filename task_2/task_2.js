const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
    let screenHeight = window.screen.height;
    let screenWidth = window.screen.width;
    
    alert(`Размер экрана ${screenHeight} x ${screenWidth}`);
});