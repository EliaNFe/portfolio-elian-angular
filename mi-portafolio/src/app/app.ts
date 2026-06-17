import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, HostListener, NgZone, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProjectService } from './services/project';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
<div class="site">

  <!-- ░░ NAV ░░ -->
  <nav class="nav" [class.scrolled]="scrolled">
    <span class="nav-brand">
      <span class="prompt">~/</span><span class="brand-name">elian</span>
    </span>
    <div class="nav-right">
      <div class="nav-links">
        <a href="#proyectos"><span class="dim">cd</span> proyectos</a>
        <a href="#sobre-mi"><span class="dim">cat</span> bio</a>
        <a href="#contacto"><span class="dim">ping</span> contacto</a>
      </div>
      <a href="/cv/Elian_Ferreyra_CV.pdf" target="_blank" class="nav-cv">.pdf</a>
      <button class="theme-toggle" (click)="toggleTheme()">
        <span *ngIf="!isLight" class="toggle-icon">◐</span>
        <span *ngIf="isLight" class="toggle-icon">◑</span>
      </button>
    </div>
  </nav>

  <!-- ░░ HERO — foto de fondo con terminal encima ░░ -->
  <header class="hero">

    <!-- Fondo con grid animado -->
    <div class="hero-bg" aria-hidden="true">
      <canvas class="hero-canvas" #heroCanvas></canvas>
      <div class="scanlines"></div>
      <div class="hero-vignette"></div>
    </div>

    <!-- Terminal flotante -->
    <div class="terminal-window">
      <div class="term-bar">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green-dot"></span>
        <span class="term-title">elian@portfolio: ~</span>
      </div>
      <div class="term-body">
        <div class="term-line" *ngFor="let line of termLines; let i = index"
             [style.opacity]="i < termVisible ? 1 : 0"
             [style.transition]="'opacity 0.1s ' + (i * 80) + 'ms'">
          <span class="term-prompt" *ngIf="line.prompt">{{ line.prompt }}</span>
          <span [class]="line.cls">{{ line.text }}</span>
        </div>
        <span class="cursor" [class.blink]="termDone">▋</span>
      </div>
    </div>

    <!-- Nombre grande -->
    <div class="hero-name-block">
      <p class="hero-label">// Fullstack Developer — Argentina</p>
      <h1 class="hero-name" (mouseenter)="glitchOn = true" (mouseleave)="glitchOn = false"
          [class.glitch]="glitchOn" [attr.data-text]="'Elian Ferreyra'">
        Elian Ferreyra
      </h1>
      <p class="hero-sub">
        <span class="green">Java</span> para el core.&nbsp;
        <span class="cyan">Angular</span> para la interfaz.
      </p>
    </div>

    <div class="hero-scroll">
      <div class="scroll-track"><div class="scroll-thumb"></div></div>
      <span>scroll</span>
    </div>
  </header>

  <!-- ░░ BIO ░░ -->
  <section id="sobre-mi" class="section">
    <div class="section-head">
      <span class="sec-num green">01</span>
      <span class="sec-sep">//</span>
      <span class="sec-title">sobre_mi.json</span>
    </div>

    <div class="bio-layout">
      <div class="bio-photo-wrap">
        <img src="imagen/perfil.png" alt="Elian Ferreyra" class="bio-photo">
        <div class="bio-photo-badge">
          <span class="green">●</span> disponible
        </div>
      </div>
      <div class="bio-code-block">
        <pre class="code-preview"><span class="kw">const</span> <span class="var">dev</span> <span class="op">=</span> &#123;
  <span class="key">nombre</span><span class="op">:</span> <span class="str">"Elian Ferreyra"</span>,
  <span class="key">rol</span><span class="op">:</span> <span class="str">"Fullstack Developer"</span>,
  <span class="key">base</span><span class="op">:</span> <span class="str">"Argentina 🇦🇷"</span>,
  <span class="key">stack</span><span class="op">:</span> [
    <span class="str">"Java 17+"</span>, <span class="str">"Spring Boot"</span>,
    <span class="str">"Angular 18+"</span>, <span class="str">"TypeScript"</span>,
    <span class="str">"PostgreSQL"</span>, <span class="str">"Docker"</span>
  ],
  <span class="key">foco</span><span class="op">:</span> <span class="str">"código mantenible y escalable"</span>
&#125;</pre>
      </div>

      <div class="bio-text">
        <p>Desarrollo con foco en la <strong>mantenibilidad y claridad del código</strong>. Me gusta construir soluciones que no solo funcionen hoy, sino que sean fáciles de entender y escalar mañana.</p>

        <div class="skill-cards">
          <div class="skill-card">
            <span class="skill-tag backend">BACKEND</span>
            <p>Java 17+, Spring Boot, Hibernate/JPA, PostgreSQL, REST APIs.</p>
          </div>
          <div class="skill-card">
            <span class="skill-tag frontend">FRONTEND</span>
            <p>Angular 18+, TypeScript, Tailwind CSS.</p>
          </div>
          <div class="skill-card">
            <span class="skill-tag tools">TOOLS</span>
            <p>Git, GitHub, Docker, Maven, Postman.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ░░ PROYECTOS ░░ -->
  <section id="proyectos" class="section">
    <div class="section-head">
      <span class="sec-num cyan">02</span>
      <span class="sec-sep">//</span>
      <span class="sec-title">ls ~/proyectos</span>
    </div>

    <ng-container *ngIf="proyectos.length > 0; else loading">
      <div class="projects-grid">
        <article class="project-card" *ngFor="let p of proyectos; let i = index"
                 (click)="openModal(p)">

          <!-- imagen con overlay -->
          <div class="proj-img-wrap">
            <img [src]="p.imagenSeleccionada || p.imagen" [alt]="p.titulo" class="proj-img">
            <div class="proj-img-overlay">
              <span class="proj-open-hint">▶ ver galería</span>
            </div>
            <div class="proj-scanlines"></div>

            <!-- miniaturas -->
            <div class="proj-thumbs" (click)="$event.stopPropagation()">
              <img *ngFor="let img of p.galeria?.slice(0,4)"
                   [src]="img"
                   class="proj-thumb"
                   (mouseenter)="p.imagenSeleccionada = img"
                   (click)="openModal(p, img)">
            </div>
          </div>

          <!-- info -->
          <div class="proj-info">
            <div class="proj-path">
              <span class="green">~/proyectos/</span><span class="proj-slug">{{ slug(p.titulo) }}</span>
            </div>
            <h3 class="proj-title">{{ p.titulo }}</h3>
            <p class="proj-desc">{{ p.descripcion }}</p>

            <div class="proj-tech-row">
              <span class="tech-pill" *ngFor="let t of p.tecnologias">{{ t }}</span>
            </div>

            <div class="proj-actions" (click)="$event.stopPropagation()">
              <a [href]="p.github" target="_blank" class="btn-ghost">
                <span>&#123; &#125;</span> GitHub
              </a>
              <a *ngIf="p.demo" [href]="p.demo" target="_blank" class="btn-solid">
                ▶ Demo
              </a>
            </div>
          </div>
        </article>
      </div>
    </ng-container>

    <ng-template #loading>
      <div class="loading-bar">
        <div class="loading-progress"></div>
      </div>
      <p class="loading-text">inicializando sistema...</p>
    </ng-template>
  </section>

  <!-- ░░ CONTACTO ░░ -->
  <section id="contacto" class="section">
    <div class="section-head">
      <span class="sec-num green">03</span>
      <span class="sec-sep">//</span>
      <span class="sec-title">contacto.sh</span>
    </div>

    <div class="contact-layout">
      <div class="contact-big">
        <h2 class="contact-h2">¿Trabajamos<br><em>juntos?</em></h2>
        <p class="contact-sub">Abierto a proyectos freelance y posiciones full-time.</p>
      </div>

      <div class="contact-list">
        <a href="mailto:elianferre@hotmail.com.ar" class="contact-row">
          <span class="contact-cmd"><span class="green">$</span> mail</span>
          <span class="contact-val">elianferre@hotmail.com.ar</span>
          <span class="contact-arrow">↗</span>
        </a>
        <a href="https://linkedin.com/in/elian-ferreyra" target="_blank" class="contact-row">
          <span class="contact-cmd"><span class="green">$</span> open</span>
          <span class="contact-val">LinkedIn</span>
          <span class="contact-arrow">↗</span>
        </a>
        <a href="https://wa.me/5492262580172" target="_blank" class="contact-row">
          <span class="contact-cmd"><span class="green">$</span> send</span>
          <span class="contact-val">WhatsApp</span>
          <span class="contact-arrow">↗</span>
        </a>
      </div>
    </div>
  </section>

  <!-- ░░ FOOTER ░░ -->
  <footer class="footer">
    <span class="green">▶</span>
    <span>Elian Ferreyra</span>
    <span class="muted">·</span>
    <span class="muted">Argentina</span>
    <span class="muted">·</span>
    <span class="muted">2026</span>
    <span class="footer-right muted">Hecho con Angular + TypeScript</span>
  </footer>

  <!-- ░░ MODAL ░░ -->
  <div *ngIf="proyectoActivo"
       class="modal-overlay"
       (click)="closeModal()">
    <button class="modal-close" (click)="closeModal()">✕</button>
    <button class="modal-nav left" (click)="prevFoto($event)">←</button>
    <button class="modal-nav right" (click)="nextFoto($event)">→</button>

    <div class="modal-box" (click)="$event.stopPropagation()">
      <div class="modal-term-bar">
        <span class="dot red"></span><span class="dot yellow"></span><span class="dot green-dot"></span>
        <span class="modal-path"><span class="green">~/proyectos/</span>{{ slug(proyectoActivo.titulo) }}/gallery</span>
      </div>
      <img [src]="proyectoActivo.galeria[indexFoto]"
           class="modal-img" [alt]="proyectoActivo.titulo">
      <div class="modal-footer-bar">
        <span class="modal-title-txt">{{ proyectoActivo.titulo }}</span>
        <span class="modal-counter muted">{{ indexFoto + 1 }}/{{ proyectoActivo.galeria.length }}</span>
      </div>
    </div>
  </div>

</div>
  `,
  styles: [`
/* ── SITE ─────────────────────────────────────── */
.site { min-height: 100vh; background: var(--bg); color: var(--text); }

/* ── NAV ──────────────────────────────────────── */
.nav {
  position: fixed; top:0; left:0; right:0; z-index:50;
  display:flex; justify-content:space-between; align-items:center;
  padding: 1rem 2.5rem;
  border-bottom: 1px solid transparent;
  transition: background 0.3s, border-color 0.3s, backdrop-filter 0.3s;
  font-family: 'JetBrains Mono', monospace;
}
.nav.scrolled {
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(12px);
  border-color: var(--border);
}
.nav-brand { font-size: 0.9rem; letter-spacing:0.05em; }
.prompt { color: var(--green); }
.brand-name { color: var(--text); }
.nav-right { display:flex; align-items:center; gap:1.5rem; }
.nav-links { display:flex; gap:2rem; font-size:0.72rem; color:var(--muted); }
.nav-links a { transition:color 0.2s; }
.nav-links a:hover { color:var(--green); }
.nav-links .dim { color:var(--green); opacity:0.6; margin-right:0.3rem; }
.nav-cv {
  font-size:0.7rem; letter-spacing:0.1em;
  border:1px solid var(--border); padding:0.35rem 0.8rem;
  color:var(--muted); transition:border-color 0.2s, color 0.2s;
}
.nav-cv:hover { border-color:var(--cyan); color:var(--cyan); }
.theme-toggle {
  background:none; border:1px solid var(--border);
  color:var(--muted); cursor:pointer;
  width:2rem; height:2rem;
  display:flex; align-items:center; justify-content:center;
  font-size:1rem; transition:border-color 0.2s, color 0.2s;
}
.theme-toggle:hover { border-color:var(--green); color:var(--green); }

/* ── HERO ─────────────────────────────────────── */
.hero {
  position:relative; min-height:100vh;
  display:flex; flex-direction:column;
  justify-content:center; align-items:flex-start;
  padding: 6rem 2.5rem 3rem;
  overflow:hidden;
  gap: 3rem;
}
/* Fondo hero */
.hero-bg {
  position:absolute; inset:0; z-index:0;
  background: var(--bg);
}
.hero-canvas {
  position:absolute; inset:0;
  width:100%; height:100%;
}
.hero-vignette {
  position:absolute; inset:0;
  background: radial-gradient(ellipse at center, transparent 30%, var(--bg) 80%);
  pointer-events:none;
}
.scanlines {
  position:absolute; inset:0; z-index:1; pointer-events:none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0,255,156,0.015) 2px,
    rgba(0,255,156,0.015) 4px
  );
  animation: scanMove 8s linear infinite;
}
@keyframes scanMove {
  from { background-position: 0 0; }
  to   { background-position: 0 100px; }
}

/* Terminal flotante */
.terminal-window {
  position:relative; z-index:2;
  background: rgba(17,17,17,0.92);
  border:1px solid var(--border);
  border-radius:8px;
  width: min(480px, 100%);
  box-shadow: 0 0 40px rgba(0,255,156,0.08), 0 20px 60px rgba(0,0,0,0.6);
  font-family:'JetBrains Mono', monospace;
  font-size:0.78rem;
  backdrop-filter: blur(4px);
}
.term-bar {
  display:flex; align-items:center; gap:0.5rem;
  padding:0.65rem 1rem;
  border-bottom:1px solid var(--border);
  background: var(--bg3);
  border-radius:8px 8px 0 0;
}
.dot { width:12px; height:12px; border-radius:50%; }
.red { background:#FF5F57; }
.yellow { background:#FFBD2E; }
.green-dot { background:#28C840; }
.term-title { margin-left:0.5rem; color:var(--muted); font-size:0.7rem; }
.term-body { padding:1.2rem 1.2rem 1rem; line-height:2; min-height:10rem; }
.term-line { display:flex; gap:0.5rem; transition:opacity 0.1s; }
.term-prompt { color:var(--green); user-select:none; white-space:nowrap; }
.t-cmd  { color:var(--cyan); }
.t-out  { color:var(--text); }
.t-muted{ color:var(--muted); }
.t-ok   { color:var(--green); }
.t-err  { color:var(--red); }
.cursor { color:var(--green); font-size:1rem; }
.cursor.blink { animation: blink 1s step-end infinite; }
@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

/* Nombre hero */
.hero-name-block {
  position:relative; z-index:2;
}
.hero-label {
  font-family:'JetBrains Mono', monospace;
  font-size:0.72rem; color:var(--muted); margin-bottom:0.8rem;
  letter-spacing:0.05em;
}
.hero-name {
  font-family:'Space Grotesk', sans-serif;
  font-size: clamp(3.5rem, 8vw, 7rem);
  font-weight:700; line-height:1;
  letter-spacing:-0.03em;
  color:var(--text);
  cursor:default;
  position:relative;
  display:inline-block;
}
/* Glitch */
.hero-name.glitch { animation: glitch 0.4s steps(2) infinite; }
.hero-name.glitch::before,
.hero-name.glitch::after {
  content: attr(data-text);
  position:absolute; top:0; left:0;
  width:100%; height:100%;
  background: transparent;
}
.hero-name.glitch::before {
  color:var(--cyan);
  clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
  transform: translateX(-3px);
  animation: glitch-clip1 0.4s steps(2) infinite;
}
.hero-name.glitch::after {
  color:var(--green);
  clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
  transform: translateX(3px);
  animation: glitch-clip2 0.4s steps(2) infinite;
}
@keyframes glitch       { 0%,100%{transform:translate(0)} 33%{transform:translate(-2px,1px)} 66%{transform:translate(2px,-1px)} }
@keyframes glitch-clip1 { 0%,100%{clip-path:polygon(0 30%,100% 30%,100% 50%,0 50%)} 50%{clip-path:polygon(0 15%,100% 15%,100% 40%,0 40%)} }
@keyframes glitch-clip2 { 0%,100%{clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%)} 50%{clip-path:polygon(0 70%,100% 70%,100% 90%,0 90%)} }

.hero-sub {
  font-size:1.05rem; font-weight:300;
  color:var(--muted); margin-top:1.2rem;
  letter-spacing:0.02em;
}
.green { color:var(--green); }
.cyan  { color:var(--cyan); }
.muted { color:var(--muted); }

.hero-scroll {
  position:absolute; bottom:2.5rem; left:2.5rem; z-index:2;
  display:flex; align-items:center; gap:0.8rem;
  font-family:'JetBrains Mono', monospace;
  font-size:0.6rem; color:var(--muted); letter-spacing:0.2em;
}
.scroll-track {
  width:40px; height:2px; background:var(--border); overflow:hidden;
}
.scroll-thumb {
  height:100%; width:40%;
  background:var(--green);
  animation: scrollAnim 2s ease-in-out infinite;
}
@keyframes scrollAnim {
  0%   { transform:translateX(-100%); }
  100% { transform:translateX(300%); }
}

/* ── SECTIONS ─────────────────────────────────── */
.section {
  max-width:1140px; margin:0 auto;
  padding: 6rem 2.5rem;
  border-top:1px solid var(--border);
}
.section-head {
  display:flex; align-items:baseline; gap:0.75rem;
  margin-bottom:3.5rem;
  font-family:'JetBrains Mono', monospace;
}
.sec-num   { font-size:0.7rem; font-weight:700; letter-spacing:0.1em; }
.sec-sep   { color:var(--muted); font-size:0.8rem; }
.sec-title { font-size:0.78rem; color:var(--muted); letter-spacing:0.05em; }

/* ── BIO ──────────────────────────────────────── */
.bio-layout {
  display:grid; grid-template-columns:200px 1fr 1fr; gap:3rem; align-items:start;
}
.bio-photo-wrap {
  position:relative;
}
.bio-photo {
  width:200px; height:260px;
  object-fit:cover; object-position:center 15%;
  border:1px solid var(--border);
  border-radius:4px;
  filter:grayscale(20%);
  transition:filter 0.4s, border-color 0.3s;
}
.bio-photo:hover { filter:grayscale(0%); border-color:var(--green); }
.bio-photo-badge {
  position:absolute; bottom:-0.75rem; left:50%; transform:translateX(-50%);
  white-space:nowrap;
  background:var(--bg2); border:1px solid var(--border);
  padding:0.25rem 0.75rem; border-radius:3px;
  font-family:'JetBrains Mono', monospace;
  font-size:0.65rem; color:var(--muted);
  letter-spacing:0.08em;
}
.bio-code-block {
  background:var(--bg2); border:1px solid var(--border);
  border-radius:6px; padding:1.5rem;
  font-family:'JetBrains Mono', monospace;
  font-size:0.78rem; line-height:1.8;
}
.code-preview { white-space:pre; overflow-x:auto; }
.kw  { color:var(--cyan); }
.var { color:var(--text); }
.op  { color:var(--muted); }
.key { color:var(--green); }
.str { color:#FFB86C; }
.bio-text p {
  font-size:0.92rem; line-height:1.85; color:var(--muted); margin-bottom:2rem;
}
.bio-text strong { color:var(--text); font-weight:500; }
.skill-cards { display:flex; flex-direction:column; gap:1rem; }
.skill-card {
  background:var(--bg2); border:1px solid var(--border);
  border-radius:6px; padding:1rem 1.2rem;
  transition:border-color 0.2s;
}
.skill-card:hover { border-color:var(--green); }
.skill-card p { font-size:0.82rem; color:var(--muted); margin-top:0.4rem; line-height:1.6; }
.skill-tag {
  font-family:'JetBrains Mono', monospace;
  font-size:0.62rem; letter-spacing:0.15em; font-weight:700;
  padding:0.2rem 0.5rem; border-radius:3px;
}
.skill-tag.backend  { background:rgba(0,212,255,0.1); color:var(--cyan); }
.skill-tag.frontend { background:rgba(0,255,156,0.1); color:var(--green); }
.skill-tag.tools    { background:rgba(255,71,87,0.1);  color:var(--red); }

/* ── PROJECTS ─────────────────────────────────── */
.projects-grid { display:grid; grid-template-columns:1fr 1fr; gap:2rem; }
.project-card {
  background:var(--bg2); border:1px solid var(--border);
  border-radius:8px; overflow:hidden; cursor:pointer;
  transition:border-color 0.3s, transform 0.3s, box-shadow 0.3s;
}
.project-card:hover {
  border-color:var(--green);
  transform:translateY(-4px);
  box-shadow:0 0 30px rgba(0,255,156,0.08);
}
.proj-img-wrap { position:relative; height:220px; overflow:hidden; }
.proj-img { width:100%; height:100%; object-fit:cover; filter:grayscale(40%); transition:filter 0.5s, transform 0.5s; }
.project-card:hover .proj-img { filter:grayscale(0%); transform:scale(1.04); }
.proj-img-overlay {
  position:absolute; inset:0;
  background:rgba(0,255,156,0.06);
  display:flex; align-items:center; justify-content:center;
  opacity:0; transition:opacity 0.3s;
}
.project-card:hover .proj-img-overlay { opacity:1; }
.proj-open-hint {
  font-family:'JetBrains Mono', monospace;
  font-size:0.78rem; color:var(--green);
  border:1px solid var(--green);
  padding:0.4rem 1rem; border-radius:3px;
  background:rgba(0,0,0,0.7);
}
.proj-scanlines {
  position:absolute; inset:0; pointer-events:none;
  background:repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,156,0.02) 2px, rgba(0,255,156,0.02) 4px);
}
.proj-thumbs {
  position:absolute; bottom:0.75rem; right:0.75rem; z-index:10;
  display:flex; gap:0.4rem;
  opacity:0; transform:translateY(6px);
  transition:opacity 0.3s, transform 0.3s;
}
.project-card:hover .proj-thumbs { opacity:1; transform:translateY(0); }
.proj-thumb {
  width:40px; height:40px; object-fit:cover;
  border:1px solid rgba(0,255,156,0.4); border-radius:3px;
  cursor:pointer; transition:border-color 0.2s, transform 0.2s;
}
.proj-thumb:hover { border-color:var(--green); transform:scale(1.1); }

.proj-info { padding:1.5rem; }
.proj-path {
  font-family:'JetBrains Mono', monospace;
  font-size:0.68rem; color:var(--muted); margin-bottom:0.6rem;
}
.proj-slug { color:var(--text); }
.proj-title {
  font-size:1.35rem; font-weight:700; letter-spacing:-0.02em;
  margin-bottom:0.6rem; transition:color 0.2s;
}
.project-card:hover .proj-title { color:var(--green); }
.proj-desc { font-size:0.82rem; color:var(--muted); line-height:1.7; margin-bottom:1.2rem; }
.proj-tech-row { display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1.2rem; }
.tech-pill {
  font-family:'JetBrains Mono', monospace;
  font-size:0.6rem; padding:0.2rem 0.6rem;
  border:1px solid var(--border); border-radius:3px; color:var(--muted);
  transition:border-color 0.2s, color 0.2s;
}
.project-card:hover .tech-pill { border-color:rgba(0,255,156,0.3); color:var(--text); }
.proj-actions { display:flex; gap:0.8rem; }
.btn-ghost {
  font-family:'JetBrains Mono', monospace;
  font-size:0.7rem; padding:0.45rem 1rem;
  border:1px solid var(--border); color:var(--muted);
  border-radius:4px; transition:border-color 0.2s, color 0.2s;
}
.btn-ghost:hover { border-color:var(--cyan); color:var(--cyan); }
.btn-solid {
  font-family:'JetBrains Mono', monospace;
  font-size:0.7rem; padding:0.45rem 1rem;
  background:var(--green); color:#000; font-weight:700;
  border-radius:4px; border:none; transition:opacity 0.2s, transform 0.2s;
}
.btn-solid:hover { opacity:0.85; transform:scale(1.02); }

.loading-bar {
  height:2px; background:var(--border); border-radius:2px;
  overflow:hidden; margin-bottom:1rem;
}
.loading-progress {
  height:100%; width:40%; background:var(--green);
  animation:loadAnim 1.2s ease-in-out infinite;
}
@keyframes loadAnim { 0%{transform:translateX(-100%)} 100%{transform:translateX(300%)} }
.loading-text {
  font-family:'JetBrains Mono', monospace;
  font-size:0.75rem; color:var(--muted); letter-spacing:0.1em;
}

/* ── CONTACT ──────────────────────────────────── */
.contact-layout { display:grid; grid-template-columns:1fr 1.2fr; gap:4rem; align-items:center; }
.contact-h2 {
  font-size:clamp(2.2rem, 4vw, 3.5rem);
  font-weight:700; line-height:1.1; letter-spacing:-0.03em;
  margin-bottom:1rem;
}
.contact-h2 em { color:var(--green); font-style:normal; }
.contact-sub { font-size:0.9rem; color:var(--muted); }
.contact-list { display:flex; flex-direction:column; }
.contact-row {
  display:grid; grid-template-columns:120px 1fr auto;
  align-items:center; gap:1rem;
  padding:1.2rem 0;
  border-bottom:1px solid var(--border);
  font-size:0.88rem; color:var(--muted);
  transition:color 0.2s, background 0.2s;
  position:relative;
}
.contact-row::after {
  content:''; position:absolute; bottom:-1px; left:0;
  height:1px; width:0;
  background:var(--green);
  transition:width 0.4s cubic-bezier(0.77,0,0.175,1);
}
.contact-row:hover::after { width:100%; }
.contact-row:hover { color:var(--text); }
.contact-cmd {
  font-family:'JetBrains Mono', monospace;
  font-size:0.72rem; white-space:nowrap;
}
.contact-val { font-size:0.85rem; }
.contact-arrow { font-size:1rem; color:var(--green); transition:transform 0.2s; }
.contact-row:hover .contact-arrow { transform:translate(3px,-3px); }

/* ── FOOTER ───────────────────────────────────── */
.footer {
  border-top:1px solid var(--border);
  padding:1.8rem 2.5rem;
  display:flex; align-items:center; gap:1rem;
  font-family:'JetBrains Mono', monospace;
  font-size:0.68rem; letter-spacing:0.08em;
}
.footer-right { margin-left:auto; }

/* ── MODAL ────────────────────────────────────── */
.modal-overlay {
  position:fixed; inset:0; z-index:100;
  background:rgba(4,4,4,0.97);
  display:flex; align-items:center; justify-content:center;
  animation:fadeIn 0.2s ease-out;
}
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
.modal-close {
  position:absolute; top:1.5rem; right:1.5rem;
  background:none; border:1px solid var(--border); color:var(--muted);
  width:2.5rem; height:2.5rem;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; font-size:0.9rem; border-radius:4px;
  transition:border-color 0.2s, color 0.2s;
}
.modal-close:hover { border-color:var(--red); color:var(--red); }
.modal-nav {
  position:absolute; top:50%; transform:translateY(-50%);
  background:rgba(17,17,17,0.9); border:1px solid var(--border); color:var(--muted);
  width:3rem; height:3rem;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer; font-size:1.1rem; border-radius:4px; z-index:110;
  transition:border-color 0.2s, color 0.2s;
}
.modal-nav.left  { left:1.5rem; }
.modal-nav.right { right:1.5rem; }
.modal-nav:hover { border-color:var(--green); color:var(--green); }
.modal-box {
  background:var(--bg2); border:1px solid var(--border);
  border-radius:8px; overflow:hidden;
  max-width:min(1000px, 90vw); width:100%;
  box-shadow:0 0 60px rgba(0,255,156,0.06);
  animation:zoomIn 0.25s ease-out;
}
@keyframes zoomIn { from{transform:scale(0.97);opacity:0} to{transform:scale(1);opacity:1} }
.modal-term-bar {
  display:flex; align-items:center; gap:0.5rem;
  padding:0.6rem 1rem; background:var(--bg3);
  border-bottom:1px solid var(--border);
  font-family:'JetBrains Mono', monospace; font-size:0.7rem;
}
.modal-path { margin-left:0.5rem; color:var(--muted); }
.modal-img { width:100%; max-height:75vh; object-fit:contain; display:block; }
.modal-footer-bar {
  display:flex; justify-content:space-between; align-items:center;
  padding:0.7rem 1rem;
  border-top:1px solid var(--border);
  font-family:'JetBrains Mono', monospace; font-size:0.72rem;
}
.modal-title-txt { color:var(--text); }
.modal-counter { color:var(--muted); }

/* ── RESPONSIVE ───────────────────────────────── */
@media (max-width: 768px) {
  .nav { padding:1rem 1.2rem; }
  .nav-links { display:none; }
  .hero { padding:5rem 1.2rem 3rem; gap:2rem; }
  .terminal-window { font-size:0.7rem; }
  .hero-name { font-size:clamp(2.8rem, 12vw, 4rem); }
  .section { padding:3.5rem 1.2rem; }
  .bio-layout { grid-template-columns:1fr; }
  .bio-photo { width:180px; height:230px; margin:0 auto; display:block; }
  .bio-photo-wrap { margin-bottom:1.5rem; display:flex; justify-content:center; }
  .projects-grid { grid-template-columns:1fr; }
  .contact-layout { grid-template-columns:1fr; gap:2rem; }
  .contact-row { grid-template-columns:90px 1fr auto; }
  .footer { padding:1.5rem 1.2rem; flex-wrap:wrap; gap:0.5rem; }
  .footer-right { width:100%; margin-left:0; }
}
  `]
})
export class App implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('heroCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private animFrame: any;
  private resizeObs!: ResizeObserver;
  proyectos: any[]  = [];
  isLight: boolean  = false;
  scrolled: boolean = false;
  glitchOn: boolean = false;
  proyectoActivo: any = null;
  indexFoto: number   = 0;
  termVisible: number = 0;
  termDone: boolean   = false;
  private termTimer: any;

  termLines = [
    { prompt: 'elian@portfolio:~$', text: 'whoami',                        cls: 't-cmd' },
    { prompt: '',                   text: 'Elian Ferreyra — Dev Fullstack', cls: 't-out' },
    { prompt: 'elian@portfolio:~$', text: 'cat stack.txt',                 cls: 't-cmd' },
    { prompt: '',                   text: 'Java · Spring · Angular · SQL', cls: 't-ok'  },
    {prompt: '',                    text: 'NextJs · Python · Clean Code',  cls: 't-ok'  },
    { prompt: 'elian@portfolio:~$', text: 'ping recruiter',                cls: 't-cmd' },
    { prompt: '',                   text: '✔ disponible para proyectos',   cls: 't-ok'  },
  ];

  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.initTheme();
    this.loadProjects();
    this.startTerminalAnim();
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => this.initCanvas());
  }

  initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const spacing = 32;
    let w = 0, h = 0, t = 0;
    const isDark = () => !this.isLight;

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    this.resizeObs = new ResizeObserver(resize);
    this.resizeObs.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      const color = isDark() ? '0,255,156' : '0,122,74';

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const x = c * spacing;
          const y = r * spacing;
          // Wave effect: distance from center + time
          const dx = x - w / 2, dy = y - h / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(dist * 0.015 - t * 0.8) * 0.5 + 0.5;
          const alpha = wave * 0.18 + 0.02;
          const radius = wave * 1.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color},${alpha})`;
          ctx.fill();
        }
      }
      t += 0.04;
      this.animFrame = requestAnimationFrame(draw);
    };
    draw();
  }

  ngOnDestroy() {
    if (this.termTimer)  clearInterval(this.termTimer);
    if (this.animFrame)  cancelAnimationFrame(this.animFrame);
    if (this.resizeObs)  this.resizeObs.disconnect();
  }

  startTerminalAnim() {
    this.termVisible = 0;
    this.termDone = false;
    this.ngZone.runOutsideAngular(() => {
      this.termTimer = setInterval(() => {
        this.ngZone.run(() => {
          if (this.termVisible < this.termLines.length) {
            this.termVisible++;
            this.cdr.detectChanges();
          } else {
            this.termDone = true;
            clearInterval(this.termTimer);
            this.cdr.detectChanges();
          }
        });
      }, 350);
    });
  }

  initTheme() {
    const saved = localStorage.getItem('theme');
    this.isLight = saved === 'light';
    this.applyTheme();
  }

  toggleTheme() {
    this.isLight = !this.isLight;
    localStorage.setItem('theme', this.isLight ? 'light' : 'dark');
    this.applyTheme();
  }

  applyTheme() {
    if (this.isLight) document.body.classList.add('light');
    else              document.body.classList.remove('light');
    this.cdr.detectChanges();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.proyectos = data.map((p: any) => {
          const t = p.titulo.toLowerCase();
          let carpeta = 'inmodoc', total = 9;
          if (t.includes('inmodoc') || t.includes('gestión')) { carpeta = 'turnos'; total = 11; }
          const galeria = Array.from({ length: total }, (_, j) => `imagen/${carpeta}/foto${j + 1}.png`);
          return { ...p, galeria, imagenSeleccionada: galeria[0] };
        });
        this.cdr.detectChanges();
      }
    });
  }

  slug(titulo: string): string {
    return titulo.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }

  openModal(proyecto: any, startingImg?: string) {
    this.proyectoActivo = proyecto;
    const img = startingImg || proyecto.imagenSeleccionada;
    this.indexFoto = proyecto.galeria.indexOf(img);
    if (this.indexFoto === -1) this.indexFoto = 0;
    document.body.style.overflow = 'hidden';
  }

  closeModal() { this.proyectoActivo = null; document.body.style.overflow = 'auto'; }

  nextFoto(e?: Event) { e?.stopPropagation(); this.indexFoto = (this.indexFoto + 1) % this.proyectoActivo.galeria.length; }
  prevFoto(e?: Event) { e?.stopPropagation(); this.indexFoto = (this.indexFoto - 1 + this.proyectoActivo.galeria.length) % this.proyectoActivo.galeria.length; }

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 40; }

  @HostListener('document:keydown', ['$event'])
  handleKey(e: KeyboardEvent) {
    if (!this.proyectoActivo) return;
    if (e.key === 'ArrowRight') this.nextFoto();
    if (e.key === 'ArrowLeft')  this.prevFoto();
    if (e.key === 'Escape')     this.closeModal();
  }
}
