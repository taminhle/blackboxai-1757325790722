// Date and Time Display
function updateDateTime() {
    const now = new Date();
    const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const day = days[now.getDay()];
    const date = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    const dateTimeString = `${day}, ${date}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    
    const dateTimeElement = document.getElementById('datetime');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeString;
    }
}

// Update time every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Initial call

// Carousel Functionality
let currentSlide = 0;
const slides = [
    {
        title: "Niềm vui ngày hội đến trường",
        content: "Cùng với cả nước, sáng 5/9/2025, đồng loạt các trường trên địa bàn phường Long Biên tổ chức khai giảng năm học 2025-2026.",
        date: "17:44 05/09/2025"
    },
    {
        title: "Đoàn đại biểu phường Long Biên tham dự Lễ diễu binh",
        content: "Sáng ngày 02/9/2025, tại Quảng trường Ba Đình lịch sử, đoàn đại biểu phường Long Biên đã tham dự Lễ diễu binh, diễu hành.",
        date: "10:17 03/09/2025"
    },
    {
        title: "Phường Long Biên trang trí trực quan trang hoàng",
        content: "Không khí rực rỡ - Niềm tự hào lan tỏa khắp mọi tuyến phố chào mừng 80 năm Cách mạng Tháng Tám.",
        date: "19:11 01/09/2025"
    }
];

function showSlide(index) {
    const carousel = document.querySelector('.carousel-item');
    if (carousel && slides[index]) {
        const slide = slides[index];
        carousel.querySelector('.placeholder-img span').textContent = slide.title;
        carousel.querySelector('.news-content h3').textContent = slide.title;
        carousel.querySelector('.news-content p').textContent = slide.content;
        carousel.querySelector('.news-date').textContent = slide.date;
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto-advance carousel every 5 seconds
setInterval(nextSlide, 5000);

// Add carousel navigation buttons
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.featured-news');
    if (carousel) {
        // Add navigation buttons
        const navButtons = document.createElement('div');
        navButtons.className = 'carousel-nav';
        navButtons.innerHTML = `
            <button class="carousel-prev" onclick="prevSlide()">‹</button>
            <button class="carousel-next" onclick="nextSlide()">›</button>
        `;
        carousel.appendChild(navButtons);
        
        // Add carousel indicators
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('span');
            dot.className = 'indicator-dot';
            if (i === 0) dot.classList.add('active');
            dot.onclick = () => {
                currentSlide = i;
                showSlide(i);
                updateIndicators();
            };
            indicators.appendChild(dot);
        }
        carousel.appendChild(indicators);
    }
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects to news items
    const newsItems = document.querySelectorAll('.news-item, .news-card');
    newsItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Media tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Here you would typically load different content based on the tab
            // For this demo, we'll just show a message
            const mediaContent = document.querySelector('.media-content');
            if (mediaContent) {
                const tabName = this.textContent;
                if (tabName === 'Photos') {
                    mediaContent.innerHTML = `
                        <div class="media-grid">
                            <div class="media-item">
                                <div class="media-placeholder">
                                    <span>📷 Đảng bộ các cơ quan Đảng phường Long Biên</span>
                                </div>
                                <p>23:22 21/07/2025</p>
                            </div>
                            <div class="media-item">
                                <div class="media-placeholder">
                                    <span>📷 Lễ khai giảng năm học mới</span>
                                </div>
                                <p>08:00 05/09/2025</p>
                            </div>
                        </div>
                    `;
                } else if (tabName === 'Longforms') {
                    mediaContent.innerHTML = `
                        <div class="media-grid">
                            <div class="media-item">
                                <div class="media-placeholder">
                                    <span>📄 Phường Long Biên - 80 năm xây dựng và phát triển</span>
                                </div>
                                <p>10:00 02/09/2025</p>
                            </div>
                        </div>
                    `;
                } else {
                    // Videos tab (default)
                    mediaContent.innerHTML = `
                        <div class="media-grid">
                            <div class="media-item">
                                <div class="media-placeholder">
                                    <span>📹 Công an phường Long Biên "Lá chắn bình yên giữa nhịp sống mới"</span>
                                </div>
                                <p>16:01 15/08/2025</p>
                            </div>
                            <div class="media-item">
                                <div class="media-placeholder">
                                    <span>📹 ĐẠI HỘI ĐẠI BIỂU ĐẢNG BỘ PHƯỜNG LONG BIÊN LẦN THỨ I</span>
                                </div>
                                <p>21:53 09/08/2025</p>
                            </div>
                        </div>
                    `;
                }
            }
        });
    });
    
    // Add animation to statistics
    animateStats();
});

function updateIndicators() {
    const dots = document.querySelectorAll('.indicator-dot');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Animate visitor statistics
function animateStats() {
    const stats = document.querySelector('.visitor-stats');
    if (stats) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(stats);
    }
}

function animateNumbers() {
    const numbers = [
        { element: 'online', start: 0, end: 43, duration: 1000 },
        { element: 'today', start: 0, end: 3735, duration: 1500 },
        { element: 'week', start: 0, end: 3735, duration: 1500 },
        { element: 'total', start: 400000, end: 429639, duration: 2000 }
    ];
    
    numbers.forEach(item => {
        const element = document.querySelector(`[data-stat="${item.element}"]`);
        if (element) {
            animateNumber(element, item.start, item.end, item.duration);
        }
    });
}

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Add CSS for carousel navigation
const style = document.createElement('style');
style.textContent = `
    .carousel-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        pointer-events: none;
    }
    
    .carousel-prev,
    .carousel-next {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        pointer-events: all;
        transition: background 0.3s;
    }
    
    .carousel-prev:hover,
    .carousel-next:hover {
        background: rgba(0, 0, 0, 0.7);
    }
    
    .carousel-indicators {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 10px;
    }
    
    .indicator-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        cursor: pointer;
        transition: background 0.3s;
    }
    
    .indicator-dot.active {
        background: white;
    }
    
    .featured-news {
        position: relative;
    }
`;
document.head.appendChild(style);

// Add scroll to top button
window.addEventListener('scroll', function() {
    const scrollButton = document.getElementById('scrollToTop');
    if (scrollButton) {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    }
});

// Create scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.createElement('button');
    scrollButton.id = 'scrollToTop';
    scrollButton.innerHTML = '↑';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: background 0.3s;
    `;
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollButton.addEventListener('mouseenter', function() {
        this.style.background = '#1d4ed8';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.background = '#2563eb';
    });
    
    document.body.appendChild(scrollButton);
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});
