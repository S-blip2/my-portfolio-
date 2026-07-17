document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Live Interlocking Auto-Typing Effect for Subtitles
    const words = [
        "Computer Science Student", 
        "Aspiring Full-Stack Developer", 
        "MERN Stack Enthusiast"
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById("typing-text");

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000; // Stay static for 2 full seconds when fully typed
            isDeleting = true;
        } 
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; 
            typingSpeed = 500; 
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingElement) {
        typeEffect();
    }

    // 2. Active Scroll Navigation Anchor Link Highlight Logic
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", () => {
        let currentSection = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight * 0.3) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.style.color = "var(--bg-main)";
            link.style.opacity = "0.85";
            if (link.getAttribute("href").includes(currentSection)) {
                link.style.color = "var(--white-pure)";
                link.style.opacity = "1";
            }
        });
    });

    // 3. Formspree Asynchronous Request Handler (Page reload fixed)
    const form = document.getElementById("my-form");
    if (form) {
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); 
            const button = document.getElementById("form-btn");
            const originalButtonHTML = button.innerHTML;
            button.innerText = "Sending...";
            button.disabled = true;
            
            const data = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    alert("Thank you! Your message has been safely delivered to Sajal's Inbox.");
                    form.reset();
                } else {
                    alert("Oops! Formspree encountered an error. Please verify your Form ID.");
                }
            } catch (error) {
                alert("Network error. Please try again later.");
            } finally {
                button.innerHTML = originalButtonHTML;
                button.disabled = false;
            }
        });
    }
});