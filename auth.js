// auth.js
(function () {
  // Hardcoded credentials (for demo purposes; in production, use a secure backend)
  const VALID_USERNAME = 'Kristin';
  //'Precious3310';
  const VALID_PASSWORD = 'Precious';
  //'Isabella1234';

  // Utility to set a cookie
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  }

  // Utility to get a cookie
  function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Utility to delete a cookie
  function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
  }

  // Login function
  window.login = function (username, password, callback) {
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      // Set session storage (clears on tab close)
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('username', username);
      // Set cookie (persistent for 7 days)
      setCookie('isLoggedIn', 'true', 7);
      setCookie('username', username, 7);
      callback(true);
    } else {
      callback(false);
    }
  };

  // Logout function
  window.logout = function (callback) {
    // Clear session storage
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    // Clear cookies
    deleteCookie('isLoggedIn');
    deleteCookie('username');
    callback();
  };

  // Check if user is logged in
  window.isLoggedIn = function () {
    const sessionLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const cookieLoggedIn = getCookie('isLoggedIn') === 'true';
    return sessionLoggedIn || cookieLoggedIn;
  };

  // Protect routes: Redirect to login if not authenticated
  window.protectRoute = function (redirectTo = 'login.html') {
    if (!isLoggedIn()) {
      window.location.href = redirectTo;
    }
  };

  // On page load, sync session storage with cookies
  if (getCookie('isLoggedIn') === 'true' && !sessionStorage.getItem('isLoggedIn')) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', getCookie('username'));
  }
})();
