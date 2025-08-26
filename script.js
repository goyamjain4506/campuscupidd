// CampusCupid JavaScript Functions

// Copy UPI ID to clipboard
function copyUPIID() {
    const upiId = '9870403495@ibl';
    navigator.clipboard.writeText(upiId).then(function() {
        // Show success message
        showToast('UPI ID copied to clipboard!', 'success');
    }, function(err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = upiId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('UPI ID copied to clipboard!', 'success');
    });
}

// Share success function
function shareSuccess() {
    if (navigator.share) {
        navigator.share({
            title: 'I just joined CampusCupid!',
            text: 'Just registered on CampusCupid to find my perfect campus match! 💕',
            url: window.location.origin
        }).then(() => {
            console.log('Thanks for sharing!');
        }).catch((error) => {
            console.log('Error sharing:', error);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

// Fallback share function
function fallbackShare() {
    const shareText = `Just registered on CampusCupid to find my perfect campus match! 💕 ${window.location.origin}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showToast('Share text copied to clipboard!', 'success');
        });
    } else {
        // Create a modal with share options
        showShareModal(shareText);
    }
}

// Show share modal
function showShareModal(shareText) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 class="text-lg font-semibold mb-4">Share CampusCupid</h3>
            <textarea class="w-full p-3 border rounded-lg mb-4" readonly>${shareText}</textarea>
            <div class="flex space-x-3">
                <button onclick="copyShareText('${shareText}')" class="bg-pink-500 text-white px-4 py-2 rounded">Copy Text</button>
                <button onclick="closeModal()" class="bg-gray-300 text-gray-700 px-4 py-2 rounded">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Add close modal function to window
    window.closeModal = () => {
        document.body.removeChild(modal);
    };
    
    window.copyShareText = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Text copied!', 'success');
            document.body.removeChild(modal);
        });
    };
}

// Toast notification system
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = `toast fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-semibold transform transition-all duration-300 translate-x-full`;
    
    // Set toast color based on type
    switch(type) {
        case 'success':
            toast.classList.add('bg-green-500');
            break;
        case 'error':
            toast.classList.add('bg-red-500');
            break;
        case 'warning':
            toast.classList.add('bg-yellow-500');
            break;
        default:
            toast.classList.add('bg-blue-500');
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Form validation helpers
function validateEmail(email) {
    const collegeEmailRegex = /^[^\s@]+@[^\s@]+\.(edu|ac\.in|edu\.in)$/i;
    return collegeEmailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation to buttons
function addLoadingToButton(button) {
    const originalText = button.textContent;
    button.innerHTML = '<span class="loading"></span> Loading...';
    button.disabled = true;
    
    return () => {
        button.textContent = originalText;
        button.disabled = false;
    };
}

// Track form interactions (for analytics)
function trackEvent(action, category = 'Form') {
    // Add your analytics code here (Google Analytics, etc.)
    console.log(`Event tracked: ${category} - ${action}`);
}

// Initialize page-specific functionality
function initializePage() {
    const currentPage = window.location.pathname.split('/').pop().split('.')[0];
    
    switch(currentPage) {
        case 'index':
        case '':
            initializeHomePage();
            break;
        case 'register':
            initializeRegisterPage();
            break;
        case 'payment':
            initializePaymentPage();
            break;
        case 'thankyou':
            initializeThankYouPage();
            break;
    }
}

function initializeHomePage() {
    // Add any home page specific functionality
    console.log('Home page initialized');
}

function initializeRegisterPage() {
    // Monitor form loading
    const iframe = document.querySelector('.google-form');
    if (iframe) {
        iframe.addEventListener('load', () => {
            showToast('Registration form loaded successfully!', 'success');
        });
    }
}

function initializePaymentPage() {
    // Add payment page specific functionality
    console.log('Payment page initialized');
}

function initializeThankYouPage() {
    // Add celebration animations or confetti
    setTimeout(() => {
        showToast('Welcome to the CampusCupid family! 💕', 'success');
    }, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePage);

// Handle network connectivity
window.addEventListener('online', () => {
    showToast('Connection restored!', 'success');
});

window.addEventListener('offline', () => {
    showToast('No internet connection', 'warning');
});
