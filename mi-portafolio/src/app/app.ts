import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef, HostListener, NgZone, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from './services/project';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
<ng-template #arrow><svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></ng-template>

<header class="top" [class.scrolled]="scrolled">
  <a class="mark" href="#inicio"><span class="pr">~/</span>elian</a>
  <nav class="links" [attr.aria-label]="t.menu">
    <a href="#sobre-mi">{{ t.navBio }}</a>
    <a href="#proyectos">{{ t.navProyectos }}</a>
    <a href="#contacto">{{ t.navContacto }}</a>
  </nav>
  <div class="tools">
    <a class="cv" href="/cv/Elian_Ferreyra_CV.pdf?v=20260823" target="_blank">{{ t.cv }}</a>
    <button class="lang-toggle" (click)="toggleLang()" [attr.aria-label]="t.idioma">{{ isEn ? 'ES' : 'EN' }}</button>
    <button class="theme-toggle" (click)="toggleTheme($event)"
            [attr.aria-label]="isLight ? t.activarOscuro : t.activarClaro"
            [attr.title]="isLight ? t.activarOscuro : t.activarClaro">
      <svg class="ico" viewBox="0 0 24 24" [class.flip]="isLight" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16z" fill="currentColor"/></svg>
    </button>
  </div>
</header>

<main id="inicio">
  <section class="hero">
    <div class="hero-text">
      <h1><span class="rv r1">Elian</span><span class="rv r2"><em>Ferreyra</em></span></h1>
      <div class="who rv r3"><img class="avatar" src="imagen/perfil.png" alt="Elian Ferreyra"><div><p class="role">{{ t.role }}</p><p class="avail"><i class="dot"></i>{{ t.available }}</p></div></div>
      <p class="tagline rv r4"><b>Java</b> {{ t.heroCore }} <b>Angular</b> {{ t.heroInterface }}</p>
    </div>
    <div class="term rv r4" aria-hidden="true">
      <div class="term-bar"><i></i><i></i><i></i><span>elian@portfolio: ~</span></div>
      <div class="term-body">
        <div class="tl" *ngFor="let l of termLines; let i = index" [style.opacity]="i < termVisible ? 1 : 0">
          <span class="tp" *ngIf="l.prompt">{{ l.prompt }}</span><span [class]="l.cls">{{ l.key ? t[l.key] : l.text }}</span>
        </div>
        <span class="cur" [class.blink]="termDone">▋</span>
      </div>
    </div>
  </section>

  <div class="marquee" aria-hidden="true"><div class="track"><span *ngFor="let w of stackList.concat(stackList)"><i class="ic" [style.--ic]="'url(' + w.i + ')'"></i>{{ w.n }}</span></div></div>

  <section id="sobre-mi" class="block">
    <h2>{{ t.tituloBio }}</h2>
    <div class="about">
      <p class="lead">{{ t.bioText }}</p>
      <dl class="stack"><div *ngFor="let g of stackGroups"><dt>{{ t[g.k] }}</dt><dd><span *ngFor="let i of g.items">{{ i }}</span></dd></div></dl>
    </div>
  </section>

  <section id="proyectos" class="block">
    <h2>{{ t.tituloProy }}</h2>
    <ng-container *ngIf="proyectos.length > 0; else loading">
      <article class="proj" *ngFor="let p of proyectos">
        <div class="proj-media">
          <button class="shot" (click)="openModal(p)" [attr.aria-label]="t.verGaleria + ': ' + p.titulo">
            <img [src]="p.imagenSeleccionada || p.imagen" [alt]="p.titulo">
            <span class="shot-hint">{{ t.verGaleria }}</span>
          </button>
          <div class="thumbs">
            <img *ngFor="let img of p.galeria?.slice(0,4)" [src]="img" alt=""
                 (mouseenter)="p.imagenSeleccionada = img" (click)="openModal(p, img)">
          </div>
          <p class="path"><span>~/proyectos/</span>{{ slug(p.titulo) }}</p>
        </div>
        <div class="proj-body">
          <h3>{{ p.titulo }}</h3>
          <p class="desc">{{ tx(p, 'descripcion') }}</p>
          <dl class="story">
            <div><dt>{{ t.problema }}</dt><dd>{{ tx(p, 'problema') }}</dd></div>
            <div><dt>{{ t.decision }}</dt><dd>{{ tx(p, 'decision') }}</dd></div>
            <div><dt>{{ t.impacto }}</dt><dd>{{ tx(p, 'impacto') }}</dd></div>
            <div><dt>{{ t.aprendizaje }}</dt><dd>{{ tx(p, 'aprendizaje') }}</dd></div>
          </dl>
          <ul class="tech"><li *ngFor="let t2 of p.tecnologias">{{ t2 }}</li></ul>
          <div class="acts">
            <a [href]="p.github" target="_blank" class="btn ghost">GitHub <ng-container *ngTemplateOutlet="arrow"></ng-container></a>
            <a *ngIf="p.demo" [href]="p.demo" target="_blank" class="btn solid">Demo <ng-container *ngTemplateOutlet="arrow"></ng-container></a>
          </div>
        </div>
      </article>
    </ng-container>
    <ng-template #loading><p class="loading">{{ t.loading }}</p></ng-template>
  </section>

  <section id="contacto" class="block contact">
    <h2 class="big">{{ t.contactH2a }} <em>{{ t.contactH2b }}</em></h2>
    <p class="lead">{{ t.contactSub }}</p>
    <div class="rows">
      <a href="mailto:elianferre@hotmail.com.ar"><span>{{ t.mail }}</span><b>elianferre@hotmail.com.ar</b><ng-container *ngTemplateOutlet="arrow"></ng-container></a>
      <a href="https://linkedin.com/in/elian-ferreyra" target="_blank"><span>LinkedIn</span><b>/in/elian-ferreyra</b><ng-container *ngTemplateOutlet="arrow"></ng-container></a>
      <a href="https://wa.me/5492262580172" target="_blank"><span>WhatsApp</span><b>+54 9 2262 58-0172</b><ng-container *ngTemplateOutlet="arrow"></ng-container></a>
    </div>
  </section>
</main>

<footer class="foot">
  <span>Elian Ferreyra · Argentina · 2026</span>
  <span>{{ t.footerMade }}</span>
</footer>

<div *ngIf="proyectoActivo" class="modal" (click)="closeModal()">
  <button class="mbtn close" (click)="closeModal()" [attr.aria-label]="t.cerrar"><svg class="ico" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  <button class="mbtn prev" (click)="prevFoto($event)" [attr.aria-label]="t.anterior"><svg class="ico" viewBox="0 0 24 24" style="transform:scaleX(-1)"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
  <button class="mbtn next" (click)="nextFoto($event)" [attr.aria-label]="t.siguiente"><svg class="ico" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
  <figure class="mbox" (click)="$event.stopPropagation()">
    <div class="mbar"><i></i><i></i><i></i><span>~/proyectos/{{ slug(proyectoActivo.titulo) }}/gallery</span></div>
    <img [src]="proyectoActivo.galeria[indexFoto]" [alt]="proyectoActivo.titulo">
    <figcaption><span>{{ proyectoActivo.titulo }}</span><span>{{ indexFoto + 1 }} / {{ proyectoActivo.galeria.length }}</span></figcaption>
  </figure>
</div>
  `,
  styles: [`
:host { display:block; }
.ico { width:1.1em; height:1.1em; fill:none; stroke:currentColor; stroke-width:1.6; stroke-linecap:round; stroke-linejoin:round; flex:none; transition:transform .4s cubic-bezier(.16,1,.3,1); }
a:focus-visible, button:focus-visible { outline:2px solid var(--accent); outline-offset:3px; border-radius:4px; }
h1, h2, h3, .big, .lead, .mark, .track span { font-family:'Fraunces', Georgia, serif; font-optical-sizing:auto; font-weight:380; text-wrap:balance; }
em { font-style:italic; }

.top { position:sticky; top:0; z-index:50; display:flex; align-items:center; justify-content:space-between; gap:1.5rem; padding:1rem clamp(1.2rem,4vw,3rem); background:color-mix(in srgb, var(--bg) 85%, transparent); backdrop-filter:blur(10px); border-bottom:1px solid transparent; transition:border-color .3s; }
.top.scrolled { border-color:var(--border); }
.mark { font-size:1.4rem; font-style:italic; }
.links { display:flex; gap:2rem; font-size:.95rem; }
.links a { color:var(--muted); background:linear-gradient(var(--accent),var(--accent)) 0 100%/0 1px no-repeat; padding-bottom:3px; transition:color .2s, background-size .35s cubic-bezier(.16,1,.3,1); }
.links a:hover { color:var(--text); background-size:100% 1px; }
.tools { display:flex; align-items:center; gap:.7rem; font-size:.9rem; }
.cv { padding:.45rem 1rem; border-radius:99px; background:var(--accent); color:var(--accent-ink); font-weight:500; transition:transform .25s; } .cv:hover { transform:translateY(-2px); }
.lang-toggle, .theme-toggle { background:none; border:1px solid var(--border); color:var(--text); height:2.2rem; min-width:2.2rem; padding:0 .6rem; border-radius:99px; cursor:pointer; display:grid; place-items:center; font:inherit; font-size:.8rem; letter-spacing:.06em; transition:border-color .2s; }
.lang-toggle:hover, .theme-toggle:hover { border-color:var(--accent); }
.theme-toggle .flip { transform:rotate(180deg); }

main { max-width:1180px; margin:0 auto; padding:0 clamp(1.2rem,4vw,3rem); }

.hero { position:relative; display:grid; grid-template-columns:1fr minmax(260px,380px); gap:clamp(2rem,6vw,6rem); align-items:center; padding:clamp(3rem,8vw,6rem) 0 clamp(3rem,6vw,5rem); }
.hero::before { content:''; position:absolute; right:-12%; top:-5%; width:70%; aspect-ratio:1; background:radial-gradient(closest-side, color-mix(in srgb, var(--accent) 24%, transparent), transparent); pointer-events:none; }
h1 { position:relative; font-size:clamp(3.8rem,12vw,6rem); line-height:.9; letter-spacing:-.035em; display:flex; flex-direction:column; font-variation-settings:'opsz' 144; }
h1 em { color:var(--accent); font-weight:300; padding-left:.6em; }
.role { margin-top:2rem; color:var(--muted); letter-spacing:.04em; }
.tagline { margin-top:.8rem; font-size:1.3rem; max-width:30ch; line-height:1.4; } .tagline b { font-weight:500; color:var(--accent); }
.hero-photo { position:relative; margin:0; }
.hero-photo::before { content:''; position:absolute; inset:0; transform:translate(1.1rem,1.1rem) rotate(2.5deg); border:1px solid var(--accent); border-radius:999px 999px 18px 18px; transition:transform .6s cubic-bezier(.16,1,.3,1); }
.hero-photo:hover::before { transform:translate(.5rem,.5rem) rotate(.8deg); }
.frame { position:relative; aspect-ratio:4/5; border-radius:999px 999px 18px 18px; overflow:hidden; background:var(--bg2); box-shadow:0 30px 60px -25px rgba(0,0,0,.55), 0 8px 16px -8px rgba(0,0,0,.3); }
.frame img { width:100%; height:100%; object-fit:cover; object-position:50% 20%; filter:grayscale(1) contrast(1.08) brightness(1.02); transform:scale(1.04); transition:filter .8s, transform 1.2s cubic-bezier(.16,1,.3,1); }
.frame::after { content:''; position:absolute; inset:0; background:linear-gradient(160deg, var(--accent), color-mix(in srgb, var(--accent) 40%, var(--bg))); mix-blend-mode:multiply; opacity:.55; transition:opacity .8s; pointer-events:none; }
.hero-photo:hover .frame img { filter:none; transform:scale(1); }
.hero-photo:hover .frame::after { opacity:0; }
.hero-photo figcaption { position:absolute; left:-1rem; bottom:2.2rem; z-index:2; display:flex; align-items:center; gap:.6rem; padding:.55rem 1.1rem; border-radius:99px; background:var(--bg); color:var(--text); font-size:.88rem; font-weight:500; box-shadow:0 12px 28px -10px rgba(0,0,0,.45); }
.dot { width:.55rem; height:.55rem; border-radius:50%; background:#5BD18B; box-shadow:0 0 0 4px color-mix(in srgb, #5BD18B 25%, transparent); }
.rv { animation:rise 1s cubic-bezier(.16,1,.3,1) backwards; display:block; }
.r1{animation-delay:.05s}.r2{animation-delay:.18s}.r3{animation-delay:.32s}.r4{animation-delay:.45s}
@keyframes rise { from { opacity:0; transform:translateY(1.6rem); } }

.marquee { overflow:hidden; border-block:1px solid var(--border); padding:1.1rem 0; mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
.track { display:flex; width:max-content; animation:slide 45s linear infinite; }
.track span { font-size:clamp(1.6rem,3.4vw,2.6rem); font-style:italic; color:var(--muted); white-space:nowrap; display:flex; align-items:center; }
.track span::after { content:''; width:.4rem; height:.4rem; margin:0 1.6rem; border-radius:50%; background:var(--accent); }
@keyframes slide { to { transform:translateX(-50%); } }

.block { padding:clamp(3.5rem,8vw,6.5rem) 0; }
.block > h2 { font-size:clamp(2.4rem,5vw,4rem); letter-spacing:-.025em; margin-bottom:3rem; }
.about { display:grid; grid-template-columns:1.2fr 1fr; gap:clamp(2rem,6vw,5rem); }
.lead { font-size:clamp(1.5rem,2.8vw,2.1rem); line-height:1.3; max-width:32ch; }
.stack div { padding:1.1rem 0; border-bottom:1px solid var(--border); display:grid; grid-template-columns:7rem 1fr; gap:1rem; } .stack div:first-child { padding-top:0; }
dt { color:var(--accent); font-size:.78rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase; padding-top:.25rem; }
dd { line-height:1.6; }

.proj { display:grid; grid-template-columns:1.1fr 1fr; gap:clamp(1.5rem,4vw,4.5rem); padding:3rem 0; align-items:center; }
.proj:nth-of-type(even) .proj-media { order:2; }
.shot { position:relative; display:block; width:100%; padding:0; border:0; background:var(--bg2); cursor:zoom-in; overflow:hidden; border-radius:16px; box-shadow:0 30px 60px -28px rgba(0,0,0,.6), 0 8px 18px -10px rgba(0,0,0,.35); transition:transform .6s cubic-bezier(.16,1,.3,1); }
.shot:hover { transform:translateY(-6px) rotate(-.5deg); }
.shot img { width:100%; aspect-ratio:16/10; object-fit:cover; transition:transform .9s cubic-bezier(.16,1,.3,1); } .shot:hover img { transform:scale(1.04); }
.shot-hint { position:absolute; left:1rem; bottom:1rem; background:var(--accent); color:var(--accent-ink); padding:.4rem .9rem; border-radius:99px; font-size:.82rem; font-weight:500; opacity:0; transform:translateY(.5rem); transition:.35s; }
.shot:hover .shot-hint, .shot:focus-visible .shot-hint { opacity:1; transform:none; }
.thumbs { display:grid; grid-template-columns:repeat(4,1fr); gap:.6rem; margin-top:.8rem; }
.thumbs img { width:100%; aspect-ratio:16/10; object-fit:cover; cursor:pointer; border-radius:8px; opacity:.55; transition:opacity .25s, transform .3s; } .thumbs img:hover { opacity:1; transform:translateY(-2px); }
.proj-body h3 { font-size:clamp(2rem,3.6vw,3rem); line-height:1.02; letter-spacing:-.02em; }
.desc { margin-top:1rem; color:var(--muted); line-height:1.65; max-width:58ch; }
.story { margin-top:1.6rem; display:grid; grid-template-columns:1fr 1fr; gap:1.2rem 1.6rem; } .story dd { font-size:.93rem; margin-top:.3rem; }
.tech { list-style:none; display:flex; flex-wrap:wrap; gap:.5rem; margin-top:1.6rem; }
.tech li { font-size:.82rem; padding:.3rem .8rem; border-radius:99px; border:1px solid var(--border); background:var(--bg2); }
.acts { display:flex; gap:.8rem; margin-top:1.6rem; }
.btn { display:inline-flex; align-items:center; gap:.5rem; padding:.7rem 1.3rem; border-radius:99px; font-size:.92rem; font-weight:500; border:1px solid var(--border); transition:transform .25s, border-color .2s, background .2s, color .2s; }
.btn:hover { transform:translateY(-2px); } .btn:hover .ico { transform:translateX(3px); }
.btn.ghost:hover { border-color:var(--accent); }
.btn.solid { background:var(--accent); border-color:var(--accent); color:var(--accent-ink); }
.loading { color:var(--muted); }

.big { font-size:clamp(3rem,9vw,6rem); line-height:.95; letter-spacing:-.035em; margin-bottom:1.5rem !important; } .big em { color:var(--accent); font-weight:300; }
.contact .lead { font-size:1.3rem; margin-bottom:3rem; }
.rows a { display:grid; grid-template-columns:8rem 1fr auto; gap:1rem; align-items:center; padding:1.5rem 0; border-top:1px solid var(--border); transition:padding .4s cubic-bezier(.16,1,.3,1), color .2s; }
.rows a:last-child { border-bottom:1px solid var(--border); }
.rows a:hover { padding-left:1rem; color:var(--accent); } .rows a:hover .ico { transform:rotate(-45deg); }
.rows span { color:var(--muted); font-size:.9rem; } .rows b { font-weight:400; font-size:clamp(1.1rem,2.4vw,1.7rem); overflow-wrap:anywhere; }
.foot { display:flex; justify-content:space-between; flex-wrap:wrap; gap:.5rem; max-width:1180px; margin:0 auto; padding:2rem clamp(1.2rem,4vw,3rem); color:var(--muted); font-size:.85rem; }

.modal { position:fixed; inset:0; z-index:100; background:color-mix(in srgb, var(--bg) 94%, transparent); backdrop-filter:blur(8px); display:grid; place-items:center; padding:4rem 1rem; animation:rise .3s ease backwards; }
.mbox { margin:0; max-width:min(1100px,92vw); } .mbox img { max-width:100%; max-height:76vh; margin:0 auto; border-radius:12px; box-shadow:0 30px 70px -20px rgba(0,0,0,.6); }
.mbox figcaption { display:flex; justify-content:space-between; gap:1rem; margin-top:1rem; font-size:.9rem; color:var(--muted); }
.mbtn { position:absolute; width:2.8rem; height:2.8rem; border-radius:50%; border:1px solid var(--border); background:var(--bg2); color:var(--text); cursor:pointer; display:grid; place-items:center; transition:border-color .2s; } .mbtn:hover { border-color:var(--accent); }
.close { top:1rem; right:1rem; } .prev { left:1rem; top:50%; } .next { right:1rem; top:50%; }

@supports (animation-timeline: view()) {
  .proj, .block > h2, .rows a, .stack div { animation:rise linear both; animation-timeline:view(); animation-range:entry 0% entry 40%; }
}
@media (max-width:820px) {
  .links { display:none; }
  .hero, .about, .proj { grid-template-columns:1fr; }
  .hero-photo { max-width:300px; order:-1; margin-left:1rem; }
  .proj:nth-of-type(even) .proj-media { order:0; }
  .story { grid-template-columns:1fr; }
  .rows a { grid-template-columns:1fr auto; } .rows span { grid-column:1 / -1; }
}
@media (prefers-reduced-motion:reduce) { .rv, .modal, .track { animation:none; } * { transition-duration:.01ms !important; } }

.pr { font-family:'JetBrains Mono',monospace; font-size:.75em; font-style:normal; color:var(--accent); }
.hero-bg { position:absolute; inset:0; pointer-events:none; z-index:0; mask-image:radial-gradient(ellipse at 62% 40%, #000 18%, transparent 72%); }
.hero-canvas { width:100%; height:100%; display:block; }
.hero-text, .hero-photo { position:relative; z-index:1; }
.term { margin-top:2rem; max-width:30rem; border:1px solid var(--border); border-radius:12px; background:color-mix(in srgb, var(--bg2) 92%, transparent); font:.82rem/1.7 'JetBrains Mono',monospace; box-shadow:0 20px 40px -24px rgba(0,0,0,.55); overflow:hidden; }
.term-bar, .mbar { display:flex; align-items:center; gap:.4rem; padding:.55rem .9rem; border-bottom:1px solid var(--border); color:var(--muted); font:.75rem 'JetBrains Mono',monospace; }
.term-bar i, .mbar i { width:.6rem; height:.6rem; border-radius:50%; background:#D9674F; }
.term-bar i:nth-child(2), .mbar i:nth-child(2) { background:#D9B24F; } .term-bar i:nth-child(3), .mbar i:nth-child(3) { background:#7FB27F; }
.term-bar span, .mbar span { margin-left:.6rem; }
.term-body { padding:.8rem 1rem 1rem; min-height:11rem; }
.tl { transition:opacity .25s; } .tp { color:var(--muted); margin-right:.6rem; }
.t-cmd { color:var(--text); font-weight:500; } .t-out { color:var(--muted); } .t-ok { color:var(--sage); }
.cur { color:var(--accent); } .cur.blink { animation:blink 1s steps(1) infinite; } @keyframes blink { 50% { opacity:0; } }
.code { margin-top:2.2rem; padding:1.4rem 1.6rem; background:var(--bg2); border:1px solid var(--border); border-radius:14px; font:.86rem/1.8 'JetBrains Mono',monospace; overflow-x:auto; box-shadow:0 24px 50px -30px rgba(0,0,0,.5); }
.code .kw { color:var(--accent); } .code .key { color:var(--text); } .code .str { color:var(--sage); } .code .op { color:var(--muted); }
.path { margin-top:.9rem; font:.78rem 'JetBrains Mono',monospace; color:var(--muted); } .path span { color:var(--accent); }
.mbar { background:var(--bg2); border:1px solid var(--border); border-bottom:0; border-radius:12px 12px 0 0; } .mbox img { border-radius:0 0 12px 12px; }
@media (max-width:820px) { .term { max-width:100%; } }

.hero { grid-template-columns:1.1fr minmax(300px,.9fr); }
.who { display:flex; align-items:center; gap:1rem; margin-top:2rem; }
.avatar { width:3.6rem; height:3.6rem; border-radius:50%; object-fit:cover; object-position:50% 20%; filter:grayscale(1); border:2px solid var(--accent); transition:filter .5s; } .avatar:hover { filter:none; }
.who .role { margin:0; color:var(--text); }
.avail { display:flex; align-items:center; gap:.5rem; color:var(--muted); font-size:.88rem; margin-top:.15rem; }
.dot { background:var(--accent); box-shadow:0 0 0 4px color-mix(in srgb, var(--accent) 25%, transparent); }
.hero .term { margin-top:0; max-width:none; font-size:.92rem; } .hero .term .term-body { min-height:15rem; }
.term-bar i:nth-child(3), .mbar i:nth-child(3) { background:#8FA8E0; }
.about .lead { font-size:clamp(1.7rem,3vw,2.5rem); line-height:1.25; max-width:26ch; }
.stack dd { display:flex; flex-wrap:wrap; gap:.45rem; }
.stack dd span { font-size:.84rem; padding:.3rem .8rem; border-radius:99px; border:1px solid var(--border); background:var(--bg2); transition:border-color .2s, color .2s; } .stack dd span:hover { border-color:var(--accent); color:var(--accent); }
.proj { align-items:start; }
@media (min-width:821px) { .proj-media { position:sticky; top:5.5rem; } }

.hero::before { content:none; }
.avatar { width:8.5rem; height:8.5rem; filter:none; border-width:2px; }
.who { gap:1.4rem; }
.ic { width:1.7rem; height:1.7rem; background:currentColor; -webkit-mask:var(--ic) center/contain no-repeat; mask:var(--ic) center/contain no-repeat; }
.marquee { padding:1.4rem 0; }
.track span { font:500 1.05rem 'DM Sans', sans-serif; font-style:normal; gap:.75rem; margin-right:3.4rem; color:var(--muted); }
.track span::after { display:none; }

.about { grid-template-columns:1fr; gap:3.5rem; }
.about .lead { font-family:'Bricolage Grotesque', sans-serif; font-weight:500; font-size:clamp(1.8rem,3.4vw,2.8rem); line-height:1.18; letter-spacing:-.02em; max-width:30ch; }
.stack { display:grid; grid-template-columns:repeat(3,1fr); gap:2.5rem; }
.stack div, .stack div:first-child { display:block; padding:1.2rem 0 0; border-top:1px solid var(--text); border-bottom:0; }
.stack dt { font:600 1.4rem 'Bricolage Grotesque', sans-serif; letter-spacing:-.01em; text-transform:none; color:var(--text); padding:0 0 1rem; }
.stack dd { display:block; }
.stack dd span { display:block; padding:.6rem 0; border:0; border-bottom:1px solid var(--border); border-radius:0; background:none; font-size:1rem; transition:color .2s, padding-left .3s cubic-bezier(.16,1,.3,1); }
.stack dd span:hover { color:var(--accent); padding-left:.5rem; border-color:var(--border); }

.proj { grid-template-columns:1.1fr 1fr; grid-template-areas:"title desc" "media media" "story story" "tech acts"; gap:1.6rem clamp(1.5rem,4vw,4rem); padding:3.5rem 0; align-items:end; border-top:1px solid var(--border); animation:none; }
.proj-body { display:contents; }
.proj-body h3 { grid-area:title; } .proj .desc { grid-area:desc; margin:0; max-width:none; }
.proj-media { grid-area:media; position:static; }
.story { grid-area:story; grid-template-columns:repeat(4,1fr); gap:1.5rem; margin:.5rem 0 0; }
.story div { border-top:1px solid var(--border); padding-top:1rem; }
.tech { grid-area:tech; margin:0; align-self:center; } .acts { grid-area:acts; margin:0; justify-content:flex-end; }
.shot:hover, .shot:hover img, .thumbs img:hover { transform:none; }
.shot img { aspect-ratio:16/9; object-position:top; }
.thumbs { grid-template-columns:repeat(4,minmax(0,9rem)); }
@media (max-width:820px) {
  .proj { grid-template-columns:1fr; grid-template-areas:"title" "desc" "media" "story" "tech" "acts"; }
  .story, .stack { grid-template-columns:1fr; } .acts { justify-content:flex-start; }
}

h1 em { background:linear-gradient(var(--accent),var(--accent)) 0 94%/0 .05em no-repeat; animation:draw 1.2s .8s cubic-bezier(.16,1,.3,1) forwards; }
@keyframes draw { to { background-size:100% .05em; } }
h1 .rv { transition:font-weight .5s; } h1 .rv:hover { font-weight:600; }

#sobre-mi > h2 { text-align:center; }
.about .lead { font-family:'Plus Jakarta Sans', sans-serif; font-weight:500; font-size:clamp(1.5rem,2.6vw,2.1rem); line-height:1.4; letter-spacing:-.015em; max-width:34ch; margin-inline:auto; text-align:center; }
.stack dt { font-family:'Plus Jakarta Sans', sans-serif; font-weight:600; font-size:1.15rem; }

.proj-media { max-width:62rem; width:100%; }
.proj .desc { font-size:1.05rem; }
.story dt { font-size:.82rem; } .story dd { font-size:1.02rem; line-height:1.6; }
  `]
})
export class App implements OnInit, OnDestroy {
  private animFrame: any;
  private resizeObs!: ResizeObserver;
  private termTimer: any;
  termVisible = 0;
  termDone = false;
  termLines: any[] = [
    { prompt: 'elian@portfolio:~$', text: 'whoami', cls: 't-cmd' },
    { prompt: '', text: 'Elian Ferreyra — Dev Fullstack', cls: 't-out' },
    { prompt: 'elian@portfolio:~$', text: 'cat stack.txt', cls: 't-cmd' },
    { prompt: '', text: 'Java · Spring · Angular · SQL · NextJs · NodeJs', cls: 't-ok' },
    { prompt: 'elian@portfolio:~$', text: 'ping recruiter', cls: 't-cmd' },
    { prompt: '', key: 'termOk', cls: 't-ok' },
  ];
  stackList = [
    { n: 'Java', i: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain.svg' },
    { n: 'Spring Boot', i: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { n: 'Angular', i: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angular/angular-plain.svg' },
    { n: 'Next.js', i: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-plain.svg' },
    { n: 'TypeScript', i: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-plain.svg' },
    { n: 'PostgreSQL', i: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg' },
    { n: 'Supabase', i: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-plain.svg' },
    { n: 'Docker', i: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg' },
  ];
  stackGroups = [
    { k: 'backend', items: ['Java 17+', 'Spring Boot', 'Hibernate/JPA', 'PostgreSQL', 'REST APIs', 'Node.js', 'Supabase'] },
    { k: 'frontend', items: ['Angular 18+', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { k: 'tools', items: ['Git', 'GitHub', 'Docker', 'Maven', 'Postman', 'Vercel'] },
  ];
  proyectos: any[] = [];
  isLight = false;
  isEn = false;
  scrolled = false;
  proyectoActivo: any = null;
  indexFoto = 0;

  es: any = {
    menu: 'Principal', codeNombre: 'nombre', codeRol: 'rol', codeBase: 'base', codeFoco: 'foco', codeFocoVal: 'código mantenible y escalable', termOk: '✔ disponible para proyectos', navProyectos: 'Proyectos', navBio: 'Sobre mí', navContacto: 'Contacto',
    cv: 'CV', idioma: 'Cambiar idioma',
    role: 'Desarrollador Fullstack · Argentina',
    heroCore: 'para el core.', heroInterface: 'para la interfaz.',
    available: 'Disponible para proyectos',
    tituloBio: 'Sobre mí', tituloProy: 'Proyectos',
    backend: 'Backend', frontend: 'Frontend', tools: 'Herramientas',
    bioText: 'Desarrollo con foco en la mantenibilidad y claridad del código. Me gusta construir soluciones que no solo funcionen hoy, sino que sean fáciles de entender y escalar mañana.',
    verGaleria: 'Ver galería',
    problema: 'Problema', decision: 'Decisión', impacto: 'Impacto', aprendizaje: 'Aprendizaje',
    activarClaro: 'Activar tema claro', activarOscuro: 'Activar tema oscuro',
    loading: 'Cargando proyectos…',
    contactH2a: '¿Trabajamos', contactH2b: 'juntos?',
    contactSub: 'Abierto a proyectos freelance y posiciones full-time.',
    mail: 'Correo', cerrar: 'Cerrar', anterior: 'Foto anterior', siguiente: 'Foto siguiente',
    footerMade: 'Hecho con Angular + TypeScript',
  };

  en: any = {
    menu: 'Main', codeNombre: 'name', codeRol: 'role', codeBase: 'location', codeFoco: 'focus', codeFocoVal: 'maintainable and scalable code', termOk: '✔ available for projects', navProyectos: 'Projects', navBio: 'About', navContacto: 'Contact',
    cv: 'Résumé', idioma: 'Switch language',
    role: 'Fullstack Developer · Argentina',
    heroCore: 'for the core.', heroInterface: 'for the interface.',
    available: 'Available for projects',
    tituloBio: 'About', tituloProy: 'Projects',
    backend: 'Backend', frontend: 'Frontend', tools: 'Tools',
    bioText: 'I build with a focus on maintainability and code clarity. I like to create solutions that not only work today, but are easy to understand and scale tomorrow.',
    verGaleria: 'View gallery',
    problema: 'Problem', decision: 'Decision', impacto: 'Impact', aprendizaje: 'Learning',
    activarClaro: 'Switch to light theme', activarOscuro: 'Switch to dark theme',
    loading: 'Loading projects…',
    contactH2a: "Let's work", contactH2b: 'together.',
    contactSub: 'Open to freelance projects and full-time positions.',
    mail: 'Email', cerrar: 'Close', anterior: 'Previous photo', siguiente: 'Next photo',
    footerMade: 'Built with Angular + TypeScript',
  };

  get t() { return this.isEn ? this.en : this.es; }

  // Texto de proyecto: usa el campo "<campo>_en" del JSON cuando el idioma es inglés.
  tx(p: any, k: string): string { return (this.isEn && p[k + '_en']) || p[k]; }

  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit() {
    this.initTheme();
    this.isEn = localStorage.getItem('lang') === 'en';
    document.documentElement.lang = this.isEn ? 'en' : 'es';
    this.loadProjects();
    this.startTerminalAnim();
  }

  slug(titulo: string): string {
    return titulo.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
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

  toggleTheme(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const root = document.documentElement;
    root.style.setProperty('--theme-x', `${x}px`);
    root.style.setProperty('--theme-y', `${y}px`);

    const changeTheme = () => {
      this.isLight = !this.isLight;
      localStorage.setItem('theme', this.isLight ? 'light' : 'dark');
      this.applyTheme();
    };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => { finished: Promise<void> };
    };

    if (!doc.startViewTransition || prefersReducedMotion) {
      changeTheme();
      return;
    }
    doc.startViewTransition(changeTheme);
  }

  toggleLang() {
    this.isEn = !this.isEn;
    localStorage.setItem('lang', this.isEn ? 'en' : 'es');
    document.documentElement.lang = this.isEn ? 'en' : 'es';
    this.cdr.detectChanges();
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
          const galeria = (p.carpeta && p.totalFotos)
            ? Array.from({ length: p.totalFotos }, (_, j) => `imagen/${p.carpeta}/foto${j + 1}.png`)
            : [p.imagen];
          return { ...p, galeria, imagenSeleccionada: galeria[0] };
        });
        this.cdr.detectChanges();
      }
    });
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
