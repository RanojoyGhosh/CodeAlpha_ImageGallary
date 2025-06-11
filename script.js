document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.querySelector('.gallery');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const lightboxCaption = document.querySelector('.lightbox-caption');

    let currentImageIndex = 0;
    let filteredImages = [];

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            const images = document.querySelectorAll('.image-card');

            images.forEach(image => {
                if (filter === 'all' || image.getAttribute('data-category') === filter) {
                    image.style.display = 'block';
                } else {
                    image.style.display = 'none';
                }
            });
        });
    });

    // Open lightbox
    gallery.addEventListener('click', (e) => {
        const clickedCard = e.target.closest('.image-card');
        if (!clickedCard) return;

        // Get all visible images
        filteredImages = Array.from(document.querySelectorAll('.image-card')).filter(
            card => card.style.display !== 'none'
        );

        currentImageIndex = filteredImages.indexOf(clickedCard);
        updateLightboxImage();
        lightbox.classList.add('active');
    });

    // Close lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Navigation
    prevBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
        updateLightboxImage();
    });

    nextBtn.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
        updateLightboxImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
            updateLightboxImage();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
            updateLightboxImage();
        }
    });

    function updateLightboxImage() {
        const currentCard = filteredImages[currentImageIndex];
        const img = currentCard.querySelector('img');
        const caption = currentCard.querySelector('.overlay');

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.innerHTML = caption.innerHTML;
    }
});