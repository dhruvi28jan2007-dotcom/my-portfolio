/**
 * Dewadi Srivastava - Professional Portfolio Scripts
 * Interactions: Theme toggle, Typewriter, Project Filtering, Interactive Terminal,
 * Copy-to-Clipboard, Stats Counter, and Form handling.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Theme Toggle (Dark / Light Mode)
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or default to 'dark'
  const savedTheme = localStorage.getItem('dewadi_theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('dewadi_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} theme`);
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking on any nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('open')) {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }

  // 4. Navbar Scroll Effect & Active Section Spy
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Navbar glass blur background on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll spy for navigation links
    let currentSection = '';
    const scrollPos = window.scrollY + 180;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = sec.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // 5. Typewriter Effect in Hero Section
  const typewriterEl = document.getElementById('typewriterText');
  if (typewriterEl) {
    const roles = [
      'Full-Stack Web Development',
      'Java & Algorithmic Problem Solving',
      'Python & AI Integrations',
      'High-Performance Digital Products',
      'Summer 2026 / 2027 Internships'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeRole() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typewriterEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 1800; // Pause at end of text
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 400; // Pause before typing next
      }

      setTimeout(typeRole, typingSpeed);
    }

    typeRole();
  }

  // 6. Interactive Terminal Replay
  const terminalResetBtn = document.getElementById('terminalResetBtn');
  const terminalOutput = document.getElementById('terminalOutput');

  if (terminalResetBtn && terminalOutput) {
    const initialTerminalHTML = terminalOutput.innerHTML;

    terminalResetBtn.addEventListener('click', () => {
      terminalOutput.innerHTML = `
        <div class="terminal-line"><span class="t-prompt">$</span> <span class="t-cmd">clear && run profile-check.sh</span></div>
        <div class="terminal-line" style="color: #38bdf8;">[1/3] Fetching B.Tech CSE (AI) records... OK</div>
        <div class="terminal-line" style="color: #38bdf8;">[2/3] Checking DSA &amp; Java foundation... 100% OK</div>
        <div class="terminal-line" style="color: #38bdf8;">[3/3] Scanning Full-Stack readiness... Active</div>
      `;

      setTimeout(() => {
        terminalOutput.innerHTML = initialTerminalHTML;
        showToast('Terminal session refreshed!');
      }, 1200);
    });
  }

  // 7. Animated Number Counters
  const statNumbers = document.querySelectorAll('.stat-number');
  let counted = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !counted) {
        counted = true;
        statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-target'), 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              stat.textContent = target;
              clearInterval(interval);
            } else {
              stat.textContent = current;
            }
          }, 35);
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStatsEl = document.querySelector('.hero-stats');
  if (heroStatsEl) {
    countObserver.observe(heroStatsEl);
  }

  // 8. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 9. Quick Copy Email Buttons
  const copyEmailBtns = [
    document.getElementById('copyEmailQuickBtn'),
    document.getElementById('copyEmailBtn')
  ];

  copyEmailBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = 'dewadi.cse@example.com';
        navigator.clipboard.writeText(email)
          .then(() => {
            showToast('Email address copied to clipboard!');
          })
          .catch(() => {
            showToast('Email: dewadi.cse@example.com');
          });
      });
    }
  });

  // 10. Contact Form Submission Handling
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        formFeedback.className = 'form-feedback error';
        formFeedback.textContent = 'Please fill out all required fields.';
        return;
      }

      // Prepare mailto link as fallback to send real email
      const mailtoUrl = `mailto:dewadi.cse@example.com?subject=${encodeURIComponent(`[Portfolio] ${subject} from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

      formFeedback.className = 'form-feedback success';
      formFeedback.textContent = 'Thank you, Dewadi! Opening your email client to send message...';
      showToast('Opening default email application...');

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);
    });
  }

  // 11. Toast Notification Helper
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideToastOut 0.3s ease forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3200);
  }
});
