document.addEventListener('DOMContentLoaded', () => {
  
  // Hamburger toggle with debounce
  const menuToggle = document.querySelector('header nav button');
  const navMenu = document.querySelector('header nav ul');

  function debounce(func, delay=300) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout (() => func.apply(this, args), delay);
    };
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', debounce(() => {
      navMenu.classList.toggle('show');
    }, 250));
  }

  // Layout State Handling + Content Loader
  const main = document.querySelector('main');

  // Pages that should display in full-width mode
  const fullWidthPages = ['book', 'contact'];

  async function loadPage(page) {
    const isFullWidth = fullWidthPages.includes(page);
    main.classList.toggle('full-width', isFullWidth)

    try {
      const isMarkdown = !['contact', 'book'].includes(page);
      const extension = isMarkdown ? 'md' : 'html';
      const response = await fetch(`content/${page}.${extension}`);
      if (!response.ok) throw new Error('Page not found');
      
      const content = await response.text();
      main.innerHTML = isMarkdown ? marked.parse(content) : content;
    
      if (page === 'contact') setupContactForm();

    } catch (error) {
      const fallback = await fetch('content/404.md').then(res => res.text());
      main.classList.remove('full-width');
      main.innerHTML = marked.parse(fallback);
    }
  }

  // Nav Link Handlers
  document.querySelectorAll('nav a[data-page]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      loadPage(page);

      // Toggle active class for nav links
      document.querySelectorAll('nav a[data-page]').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Load default page
  loadPage('home');

  // Copyright Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent= new Date().getFullYear();
  }

  // Contact Form
  function setupContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    if (!form || !status) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(form);
      try {
        const res = await fetch(form.action, { method: 'POST', body: formData });
        if (res.ok) {
          form.reset();
          status.textContent = "Thanks for reaching out!";
          status.className = "status-message success";
        } else throw new Error();
      } catch {
        status.textContent = "Something went wrong.";
        status.className = "status-message error";
      }
      status.style.display = "block";
    });
  }

});