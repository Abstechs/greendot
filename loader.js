// loader.js
(function () {
  // Function to inject the loader UI into the page
  function loader(message = 'Loading...', onCloseRedirect = null) {
    // Prevent multiple loader injections
    if (document.querySelector('.loader-container')) return;

    // Create loader container
    const loaderContainer = document.createElement('div');
    loaderContainer.className = 'loader-container';
    loaderContainer.style.position = 'fixed';
    loaderContainer.style.top = '0';
    loaderContainer.style.left = '0';
    loaderContainer.style.width = '100%';
    loaderContainer.style.height = '100%';
    loaderContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    loaderContainer.style.display = 'flex';
    loaderContainer.style.flexDirection = 'column';
    loaderContainer.style.justifyContent = 'center';
    loaderContainer.style.alignItems = 'center';
    loaderContainer.style.gap = '10px';
    loaderContainer.style.zIndex = '9999';

    // Create inner content wrapper
    const innerDiv = document.createElement('div');
    innerDiv.style.backgroundColor = '#fff';
    innerDiv.style.padding = '20px';
    innerDiv.style.borderRadius = '10px';
    innerDiv.style.position = 'relative';
    innerDiv.style.display = 'flex';
    innerDiv.style.flexDirection = 'column';
    innerDiv.style.alignItems = 'center';
    innerDiv.style.gap = '10px';

    // Loader dots
    const loaderDots = document.createElement('div');
    loaderDots.className = 'loader-dots';
    loaderDots.style.display = 'flex';
    loaderDots.style.gap = '8px';
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      dot.style.width = '12px';
      dot.style.height = '12px';
      dot.style.backgroundColor = '#39cd33de';
      dot.style.borderRadius = '50%';
      dot.style.animation = 'blink 1.2s infinite';
      if (i > 0) {
        dot.style.animationDelay = `${i * 0.2}s`;
      }
      loaderDots.appendChild(dot);
    }
    innerDiv.appendChild(loaderDots);

    // Loader text
    const loaderText = document.createElement('div');
    loaderText.className = 'loader-text';
    loaderText.textContent = message;
    loaderText.style.fontSize = '16px';
    loaderText.style.color = '#333';
    innerDiv.appendChild(loaderText);

    // Handle onCloseRedirect: if 'default', set to dashboard.html
    let redirectUrl = null;
    if (onCloseRedirect) {
      redirectUrl = onCloseRedirect === 'default' ? './dashboard.html' : onCloseRedirect;

      // Add close button only if onCloseRedirect is provided
      const closeButton = document.createElement('button');
      closeButton.textContent = 'x';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '5px';
      closeButton.style.right = '5px';
      closeButton.style.backgroundColor = '#39cd33de';
      closeButton.style.color = '#fff';
      closeButton.style.border = 'none';
      closeButton.style.borderRadius = '5px';
      closeButton.style.padding = '5px 10px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.fontSize = '14px';
      closeButton.addEventListener('click', () => {
        loaderContainer.remove();
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
      });
      innerDiv.appendChild(closeButton);
    }

    // Add styles for the animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0%, 80%, 100% {
          opacity: 0.3;
        }
        40% {
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(style);

    // Append the loader to the body
    loaderContainer.appendChild(innerDiv);
    document.body.appendChild(loaderContainer);

    // Set flag to indicate loader was called
    window.loaderCalled = true;
  }

  // Expose the loader function globally
  window.loader = loader;

  // Modified goTo function to use loader with optional redirect
  window.goTo = function (id, url, onCloseRedirect = null) {
    const t = document.getElementById(id);
    t.addEventListener('click', () => {
      window.loaderCalled = true;
      loader('Navigating...', onCloseRedirect);
      setTimeout(() => {
        window.location.href = `./${url}.html`;
      }, 500); // Small delay to ensure loader is visible
    });
  };
})();
