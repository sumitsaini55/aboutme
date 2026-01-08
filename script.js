window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 0);
    updateActiveNavLink();
    toggleScrollToTopButton();
});

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('fa-times');
        navbar.classList.remove('active');
    });
});

const sr = ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: true
});

sr.reveal('.home-content, .heading', { origin: 'top' });
sr.reveal('.about-img, .services-container, .project-card, .contact form, .cert-card', { origin: 'bottom' });
sr.reveal('.home-content h1, .about-img', { origin: 'left' });
sr.reveal('.home-content p, .about-content', { origin: 'right' });
sr.reveal('.skill-category', { origin: 'top', interval: 100 });

const typed = new Typed('.text-animate h3', {
    strings: ['Full Stack Developer', 'Web Developer', 'MERN Stack Developer', 'Problem Solver'],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true
});

function animateSkillBars() {
    document.querySelectorAll('.skill').forEach(skill => {
        const skillProgress = skill.querySelector('.skill-progress');
        const percent = parseInt(skill.getAttribute('data-percent'));

        const rect = skill.getBoundingClientRect();
        const isInViewport =
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);

        skillProgress.style.width = isInViewport ? percent + '%' : '0%';
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

function updateActiveNavLink() {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('.navbar a[href*=' + id + ']')?.classList.add('active');
        }
    });
}

const themeToggle = document.querySelector('.theme-toggle');
const themeButtons = document.querySelectorAll('.theme-btn');

themeToggle.addEventListener('click', () => {
    document.querySelector('.theme-switcher').classList.toggle('active');
});

themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        themeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const color = btn.getAttribute('data-color');
        document.documentElement.style.setProperty('--main-color', color);
        document.documentElement.style.setProperty('--hover-color', color);
        localStorage.setItem('portfolioThemeColor', color);
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const savedColor = localStorage.getItem('portfolioThemeColor');
    if (savedColor) {
        document.documentElement.style.setProperty('--main-color', savedColor);
        document.documentElement.style.setProperty('--hover-color', savedColor);
    }
});

const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // stay on page

    const formData = new FormData(form);

    try {
        await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        showCustomAlert(
            'Thank you for your message! I will get back to you soon.',
            'success'
        );

        form.reset(); 
    } catch (error) {
        showCustomAlert(
            'Something went wrong. Please try again later.',
            'error'
        );
    }
});



/* Custom alert */
function showCustomAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('custom-alert', type);
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => alertBox.classList.add('show'), 10);

    setTimeout(() => {
        alertBox.classList.remove('show');
        alertBox.remove();
    }, 3000);
}

const scrollToTopButton = document.querySelector('.scroll-to-top');

function toggleScrollToTopButton() {
    if (window.scrollY > 200) {
        scrollToTopButton.style.opacity = '1';
        scrollToTopButton.style.visibility = 'visible';
    } else {
        scrollToTopButton.style.opacity = '0';
        scrollToTopButton.style.visibility = 'hidden';
    }
}

window.addEventListener('load', toggleScrollToTopButton);

document.getElementById("resumeBtn").addEventListener("click", function (e) {
    e.preventDefault();
    const pdfURL = "SumitSaini-Resume-GeneralProfessional-.pdf";
    window.open(pdfURL, "_blank");
});
