"use client"

const ThemeTracker = () => {
    const htmlElement = document.documentElement;
    const themeValue = htmlElement.getAttribute('data-bs-theme');
    return themeValue;
};

export default ThemeTracker;