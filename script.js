/*function toggleMode() {
    document.body.classList.toggle("dark-mode");
}*/

const toggleBtn = document.querySelector('.toggle-btn');
const body = document.body;

toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

