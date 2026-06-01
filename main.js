import './style.css'
import profileImg from './assets/photo.jpeg'

document.querySelector('#app').innerHTML = `
<nav>
  <div class="menu-toggle">☰</div>

  <ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#qualifications">Qualifications</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>

<section class="hero" id="home">
  <div class="hero-container">

    <div class="hero-left">
      <h1>Happyness C. Mwaikuju</h1>
      <h2>Data Science Student</h2>

      <h3 class="typing-text">
        <span id="typed"></span>
      </h3>

      <p>
        Passionate about Data Science, Statistics, Machine Learning, and Web Development.
      </p>

      <p>
       Focusing on turning data into insights and ideas into digital solutions.
      </p>
    </div>

    <div class="hero-right">
      <img src="${profileImg}"
       alt="Profile Photo"
        class="profile-img" />
    </div>

  </div>
</section>

<section id="about">
  <h2>About Me</h2>
  <p>
    I am currently pursuing a Bachelor Degree in Data Science
    at the Eastern Africa Statistical Training Centre (EASTC).
    I like using data to solve real-world problems and support
    decision making.
  </p>
</section>

<section id="skills">
  <h2>Skills</h2>

  <div class="skills-container">
    <div class="skill-card">Python</div>
    <div class="skill-card">SQL</div>
    <div class="skill-card">HTML & CSS</div>
    <div class="skill-card">JavaScript</div>
    <div class="skill-card">Excel</div>
    <div class="skill-card">Data Analysis</div>
    <div class="skill-card">Statistics</div>
  </div>
</section>

<section id="qualifications">
  <h2>Qualifications</h2>

  <div class="qualification-card">
    <h3>Bachelor of Data Science</h3>
    <p>Eastern Africa Statistical Training Centre (EASTC)</p>
    <p>Expected Graduation: 2026</p>
  </div>

  <div class="qualification-card">
    <h3>Relevant Coursework</h3>
    <p>Statistics, Data Analysis, Database Systems, Web Development</p>
  </div>
</section>

<section id="projects">
  <h2>Projects</h2>

  <div class="project-cards">
    <div class="project-card">
      <h3>Portfolio Website</h3>
      <p>Personal website developed using Vite and JavaScript.</p>
    </div>

    <div class="project-card">
      <h3>Restaurant Order System</h3>
      <p>System for managing restaurant orders and inventory.</p>
    </div>

    <div class="project-card">
      <h3>Data Analysis Project</h3>
      <p>Data visualization and statistical analysis project.</p>
    </div>
  </div>
</section>

<section id="contact">
  <h2>Contact Me</h2>

 <form class="contact-form" id="contactForm">
    <input type="text" id="name" placeholder="Your Name" required>
    <input type="email" id="email" placeholder="Your Email" required>
    <textarea id="message" placeholder="Your Message" rows="5" required></textarea>
    <button type="submit">Send Message</button>
  </form>

  <p>Email: happiecharlie111@gmail.com</p>
  <p>Phone: +255683241446</p>
</section>

<footer class="footer">
  <p>Copyright © 2026  All rights reserved.</p>

  <div class="social-buttons">
    <a class="btn github" href="https://github.com/happiecharlie" target="_blank">
      GitHub
    </a>

    <a class="btn linkedin" href="https://linkedin.com/in/Happiness Charles" target="_blank">
      LinkedIn
    </a>
  </div>
</footer>
`
const typedElement = document.getElementById("typed");

const roles = [
  "Data Scientist",
  "Web Developer",
  "Data Analyst",
  "Cloud developer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    typedElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typedElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.2
});

sections.forEach(section => {
  observer.observe(section);
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  const response = await fetch("http://localhost:5000/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      message
    })
  });

  const data = await response.json();

  alert(data.message);

  contactForm.reset();
});