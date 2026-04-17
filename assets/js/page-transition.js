// Page Transition Handler
// Smooth page transitions with fade in/out effects

class PageTransition {
  constructor() {
    this.isTransitioning = false;
    this.transitionDuration = 400;
    this.setupPageLinks();
  }

  setupPageLinks() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      
      // Skip if:
      // - No href or href starts with #
      // - Target is _blank or _self
      // - External link
      // - Already transitioning
      if (!link || 
          !link.href || 
          link.href.startsWith('#') ||
          link.target === '_blank' ||
          link.target === '_self' ||
          !link.href.includes('.html') ||
          this.isTransitioning) {
        return;
      }

      // Check if it's a local HTML file (not external)
      const currentHost = window.location.host;
      const linkHost = new URL(link.href, window.location.origin).host;
      
      if (currentHost !== linkHost) {
        return;
      }

      e.preventDefault();
      this.transitionToPage(link.href);
    });
  }

  transitionToPage(pagePath) {
    this.isTransitioning = true;
    const body = document.body;
    
    // Add fade-out effect
    body.style.opacity = '0';
    body.style.transition = `opacity ${this.transitionDuration}ms ease-out`;

    setTimeout(() => {
      window.location.href = pagePath;
    }, this.transitionDuration);
  }

  fadeInPage() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'none';
    
    setTimeout(() => {
      body.style.transition = `opacity ${this.transitionDuration}ms ease-in`;
      body.style.opacity = '1';
    }, 10);
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const transition = new PageTransition();
    transition.fadeInPage();
  });
} else {
  const transition = new PageTransition();
  transition.fadeInPage();
}
