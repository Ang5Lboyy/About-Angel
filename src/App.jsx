import { useEffect, useState } from 'react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasPointer, setHasPointer] = useState(true);

  useEffect(() => {
    // Check if device has a fine pointer (mouse)
    setHasPointer(window.matchMedia('(pointer: fine)').matches);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const revealOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealOnScroll.observe(el));

    setTimeout(() => {
      const hero = document.querySelector('.hero.reveal');
      if (hero) hero.classList.add('active');
    }, 100);
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const scrollTo = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {hasPointer && (
        <div 
          className="cursor-glow" 
          style={{ 
            left: `${cursorPos.x}px`, 
            top: `${cursorPos.y}px`,
            width: isHovering ? '500px' : '350px',
            height: isHovering ? '500px' : '350px',
            background: isHovering 
              ? 'radial-gradient(circle, rgba(0, 240, 255, 0.4) 0%, rgba(112, 0, 255, 0) 70%)'
              : 'radial-gradient(circle, rgba(112, 0, 255, 0.3) 0%, rgba(0, 240, 255, 0) 70%)'
          }}
        ></div>
      )}
      <div className="bg-animation"></div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">Angel<span>.</span></div>
        <div className="hamburger" onClick={toggleMobileMenu}>
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <li><a href="#about" onClick={(e) => scrollTo(e, 'about')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>About Me</a></li>
          <li><a href="#skills" onClick={(e) => scrollTo(e, 'skills')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Skills</a></li>
          <li><a href="#mindset" onClick={(e) => scrollTo(e, 'mindset')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Mindset</a></li>
          <li><a href="#contact" onClick={(e) => scrollTo(e, 'contact')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Contact</a></li>
        </ul>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="hero reveal" id="hero">
          <div className="hero-content">
            <div className="hero-badge">Junior Frontend Developer</div>
            <h1 className="hero-title">Crafting <span className="gradient-text">Digital</span> Experiences</h1>
            <p className="hero-subtitle">With 4 years of training and practice, I build interactive, responsive, and clean web applications.</p>
            <div className="hero-actions">
              <a href="#contact" onClick={(e) => scrollTo(e, 'contact')} className="btn btn-primary" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Hire Me</a>
              <a href="#about" onClick={(e) => scrollTo(e, 'about')} className="btn btn-secondary" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Read My Story</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="glass-card tech-stack-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <i className="fab fa-react react-icon"></i>
              <i className="fab fa-js js-icon"></i>
              <i className="fab fa-node-js node-icon"></i>
              <i className="fab fa-html5 html-icon"></i>
              <i className="fab fa-css3-alt css-icon"></i>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about reveal">
          <h2 className="section-title">My <span className="gradient-text">Journey</span></h2>
          <div className="about-grid">
            <div className="about-text glass-panel">
              <p>I am a junior frontend programmer with almost <strong>4 years of training and practice experience</strong> in the field of web programming. I am fluent in HTML, CSS, and JavaScript technologies, as well as working with modern libraries and tools such as <strong>React.js</strong> and <strong>Node.js</strong>.</p>
              <p>I have experience creating interactive and responsive (adaptive) websites using Flexbox, CSS Grid, and modern user interface approaches. I am creating dynamic interfaces with component structure using React.js and Node.js to understand the basics of the backend and create simple server solutions.</p>
              <p>I study at the <strong>Tumo Center for Creative Technologies</strong>, where I develop not only technical, but also creative thinking.</p>
            </div>
            <div className="about-highlights">
              <div className="highlight-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <h3><i className="fas fa-laptop-code"></i> Frontend Core</h3>
                <p>Deep understanding of JavaScript basics: terms, loops, functions, and working with APIs.</p>
              </div>
              <div className="highlight-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <h3><i className="fas fa-server"></i> Backend Basics</h3>
                <p>Utilizing Node.js for simple server solutions and full-stack understanding.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills & AI Section */}
        <section id="skills" className="skills reveal">
          <h2 className="section-title">Tech & <span className="gradient-text">AI</span></h2>
          <div className="skills-container">
            <div className="ai-focus glass-panel">
              <h3><i className="fas fa-robot"></i> AI-Powered Development</h3>
              <p>I am well versed in artificial intelligence tools and actively use them in my work to:</p>
              <ul className="ai-list">
                <li><i className="fas fa-bolt"></i> Quickly generate code snippets</li>
                <li><i className="fas fa-bug"></i> Detect errors and debug effectively</li>
                <li><i className="fas fa-tachometer-alt"></i> Optimize existing code</li>
                <li><i className="fas fa-lightbulb"></i> Find innovative new solutions</li>
              </ul>
              <p className="ai-conclusion">With the help of AI, I can work more efficiently and quickly master new technologies.</p>
            </div>
            
            <div className="tech-grid">
              {['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'CSS Grid', 'Flexbox', 'APIs'].map((tech, index) => {
                const icons = ['html5', 'css3-alt', 'js', 'react', 'node-js', 'border-all', 'columns', 'network-wired'];
                return (
                  <div key={index} className="tech-item" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <i className={`fa${index < 5 ? 'b' : 's'} fa-${icons[index]}`}></i> {tech}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mindset Section */}
        <section id="mindset" className="mindset reveal">
          <h2 className="section-title">My <span className="gradient-text">Mindset</span></h2>
          <div className="mindset-cards">
            {[
              { icon: 'broom', title: 'Clean Code', desc: 'I try to keep my code clean, organized, and readable by following best practices.' },
              { icon: 'rocket', title: 'Fast Learner', desc: 'I am a purposeful, fast-learning and responsible person who is constantly developing my skills and following new technologies.' },
              { icon: 'bullseye', title: 'The Goal', desc: 'My goal is to delve deeper into interface development and reach a professional level.' }
            ].map((card, index) => (
              <div key={index} className="glass-card" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div className="card-icon"><i className={`fas fa-${card.icon}`}></i></div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact reveal">
          <div className="contact-wrapper glass-panel">
            <h2 className="section-title">Let's <span className="gradient-text">Connect</span></h2>
            <p className="contact-intro">I am currently looking for a job or internship as an external interface programmer where I can apply my knowledge, gain real-world experience, and create value for the team. I am open to cooperation and interesting projects.</p>
            
            <div className="social-links">
              <a href="https://t.me/Ang5Lboyy" target="_blank" rel="noreferrer" className="social-btn telegram" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <i className="fab fa-telegram-plane"></i>
                <span>@Ang5Lboyy</span>
              </a>
              <a href="mailto:angelbarseghyan12@gmail.com" className="social-btn email" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <i className="fas fa-envelope"></i>
                <span>Email Me</span>
              </a>
              <a href="https://github.com/Ang5Lboyy" target="_blank" rel="noreferrer" className="social-btn github" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <i className="fab fa-github"></i>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Angel Barseghyan. Designed with passion and code.</p>
      </footer>
    </>
  );
}

export default App;
