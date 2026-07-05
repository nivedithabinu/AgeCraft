export function themeToggle() {
    const theme = document.getElementById('theme');

    if (!theme) {
        return;
    }

    const save = localStorage.getItem('agecraft-theme') || 'dark';

    document.documentElement.setAttribute('data-theme', save);
    theme.value = save;

    theme.addEventListener('change', (e) => {
        const changeTheme = e.target.value;
        document.documentElement.setAttribute('data-theme', changeTheme);
        localStorage.setItem('agecraft-theme', changeTheme);
    });
}