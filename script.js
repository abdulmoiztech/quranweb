// Configuration object for editable content
const defaultConfig = {
    teacher_name: "Certified Quran Teacher",
    teacher_title: "a certified Quran teacher",
    email_address: "learnquran@gmail.com",
    phone_number: "+1 (234) 567-8900",
    whatsapp_number: "+1234567890"
};

// Page navigation functionality
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Close mobile menu if open
    document.getElementById('mobile-menu').classList.add('hidden');
}

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show success message
    document.getElementById('successMessage').classList.remove('hidden');
    
    // Reset form
    this.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        document.getElementById('successMessage').classList.add('hidden');
    }, 5000);
});

// Render function to update UI based on config
async function render(config) {
    // Update teacher name
    const teacherNameElements = document.querySelectorAll('#teacher-name');
    teacherNameElements.forEach(el => {
        el.textContent = config.teacher_name || defaultConfig.teacher_name;
    });

    // Update teacher title
    const teacherTitleElements = document.querySelectorAll('#teacher-title');
    teacherTitleElements.forEach(el => {
        el.textContent = config.teacher_title || defaultConfig.teacher_title;
    });

    // Update email links
    const emailLinks = document.querySelectorAll('#email-link');
    emailLinks.forEach(el => {
        const email = config.email_address || defaultConfig.email_address;
        el.href = `mailto:${email}`;
        el.textContent = email;
    });

    // Update phone links
    const phoneLinks = document.querySelectorAll('#phone-link');
    phoneLinks.forEach(el => {
        const phone = config.phone_number || defaultConfig.phone_number;
        el.href = `tel:${phone.replace(/\s/g, '')}`;
        el.textContent = phone;
    });

    // Update WhatsApp links
    const whatsappLinks = document.querySelectorAll('#whatsapp-link');
    whatsappLinks.forEach(el => {
        const whatsapp = config.whatsapp_number || defaultConfig.whatsapp_number;
        el.href = `https://wa.me/${whatsapp.replace(/\D/g, '')}`;
    });
}

// Element SDK initialization (Agar aap isko use nahi kar rahe toh yeh block hata sakte hain)
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig: defaultConfig,
        render: render,
        mapToCapabilities: (config) => ({
            recolorables: [
                {
                    get: () => config.primary_color || "#22c55e",
                    set: (value) => {
                        config.primary_color = value;
                        window.elementSdk.setConfig({ primary_color: value });
                    }
                }
            ],
            borderables: [],
            fontEditable: {
                get: () => config.font_family || "Inter",
                set: (value) => {
                    config.font_family = value;
                    window.elementSdk.setConfig({ font_family: value });
                }
            },
            fontSizeable: {
                get: () => config.font_size || 16,
                set: (value) => {
                    config.font_size = value;
                    window.elementSdk.setConfig({ font_size: value });
                }
            }
        }),
        mapToEditPanelValues: (config) => new Map([
            ["teacher_name", config.teacher_name || defaultConfig.teacher_name],
            ["teacher_title", config.teacher_title || defaultConfig.teacher_title],
            ["email_address", config.email_address || defaultConfig.email_address],
            ["phone_number", config.phone_number || defaultConfig.phone_number],
            ["whatsapp_number", config.whatsapp_number || defaultConfig.whatsapp_number]
        ])
    });
}

// Initial render
render(defaultConfig);