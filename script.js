function loadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const loadImage = (image) => {
        const src = image.getAttribute('data-src');
        if (!src) return;

        image.src = src;
        image.onload = () => image.classList.add('loaded'); 
        observer.unobserve(image); 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);
            }
        });
    }, observerOptions);

    images.forEach(img => observer.observe(img));
}

document.getElementById('load-images').addEventListener('click', loadImages);