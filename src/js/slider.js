let slideIndex = 1
const buttonNext = document.querySelector('.slider-buttons-next')
const buttonPrev = document.querySelector('.slider-buttons-prev')
const pagination = document.querySelector('.slider-pagination')
let slides = document.querySelectorAll(".slider-slide");
const showSlides = (n) => {
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    clearActiveClass(pagination.childNodes)
    clearActiveClass(slides)
    if(pagination.childNodes.length) pagination.childNodes[slideIndex - 1].classList.add('active')
    slides[slideIndex - 1].classList.add('active'); 
}
const clearActiveClass = (arr) => {
    arr.forEach((slide) => {
        slide.classList.remove('active')
    }) 
}
showSlides(slideIndex);
const nextSlide = () => {
    showSlides(slideIndex += 1);
}
const previousSlide = () => {
    showSlides(slideIndex -= 1);  
}
buttonNext.addEventListener('click', () => {
    nextSlide()
})
buttonPrev.addEventListener('click', () => {
    previousSlide()
})
slides.forEach((slide, index)=>{
    const paginationBullet = document.createElement('div')
    paginationBullet.classList.add('pagination-bullet')
    if(slide.classList.contains('active')) paginationBullet.classList.add('active')
    pagination.append(paginationBullet)
    paginationBullet.addEventListener('click', () => {
        clearActiveClass(document.querySelectorAll('.pagination-bullet'))
        clearActiveClass(slides)
        slideIndex = index + 1
        paginationBullet.classList.add('active')
        slide.classList.add('active')
    })
})