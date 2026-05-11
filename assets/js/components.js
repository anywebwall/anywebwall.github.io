// =========================================================
// AnyWebWall - Dynamic Components (Header & Footer)
// =========================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Inject Header
    const headerElement = document.querySelector("header");
    if (headerElement) {
        headerElement.innerHTML = `
            <nav class="navbar">
                <a href="https://anywebwall.github.io/" class="logo">
                    <img src="/logo.jpg" alt="Logo" onerror="this.src='https://via.placeholder.com/35/181b21/00d26a?text=BSR'">
                    Any<span>WebWall</span>
                </a>
                <div class="nav-links">
                    <a href="https://anywebwall.github.io/wallpapers/">Gallery</a>
                    <a href="https://anywebwall.github.io/info/about/">About</a>
                    <a href="https://anywebwall.github.io/#download-section" class="btn-nav">Get Engine</a>
                </div>
            </nav>
        `;
    }

    // 2. Inject Footer
    const footerElement = document.querySelector("footer");
    if (footerElement) {
        footerElement.innerHTML = `
            <div class="footer-nav">
                <a href="https://anywebwall.github.io/info/about/">About Us</a>
                <a href="https://anywebwall.github.io/info/contact/">Contact Us</a>
                <a href="https://anywebwall.github.io/info/privacy/">Privacy Policy</a>
                <a href="https://anywebwall.github.io/info/terms/">Terms & Conditions</a>
                <a href="https://anywebwall.github.io/info/disclaimer/">Disclaimer</a>
                <a href="https://anywebwall.github.io/info/dmca/">DMCA Policy</a>
            </div>
            <p class="footer-text">© 2026 BSR Studios. All rights reserved. Designed for ultra-smooth aesthetics.</p>
        `;
    }
});