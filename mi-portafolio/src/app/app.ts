import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProjectService } from './services/project';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div [class.dark]="isDarkMode">
      <div class="min-h-screen transition-colors duration-700 bg-[#f6f4ef] dark:bg-[#030712] text-slate-900 dark:text-white font-sans selection:bg-fuchsia-500/30 scroll-smooth relative overflow-x-hidden">

        <div class="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
          <div class="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-amber-100/30 dark:bg-fuchsia-600/10 blur-[130px] rounded-full transition-colors duration-700"></div>
          <div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-100/30 dark:bg-rose-600/10 blur-[120px] rounded-full transition-colors duration-700"></div>
          <div class="absolute top-[30%] right-[15%] w-[40%] h-[40%] bg-violet-100/20 dark:bg-violet-600/5 blur-[100px] rounded-full transition-colors duration-700"></div>

          <div class="absolute inset-0 opacity-[0.25] dark:opacity-[0.1]" 
               style="background-image: radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0); background-size: 40px 40px; mask-image: radial-gradient(circle at center, black, transparent 80%);">
          </div>
        </div>

        <nav class="fixed top-0 w-full z-50 bg-white/60 dark:bg-[#030712]/60 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 px-6 py-4">
          <div class="max-w-6xl mx-auto flex justify-between items-center">
            <span class="text-xl font-bold bg-gradient-to-r from-fuchsia-500 via-violet-500 to-rose-500 bg-clip-text text-transparent italic tracking-tighter">EF.dev</span>
            
            <div class="flex items-center gap-6">
              <div class="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-400">
                <a href="#proyectos" class="hover:text-fuchsia-500 transition-colors">Proyectos</a>
                <a href="#sobre-mi" class="hover:text-violet-500 transition-colors">Bio</a>
                <a href="#contacto" class="hover:text-rose-500 transition-colors">Contacto</a>
              </div>

              <button (click)="toggleDarkMode()" class="p-2.5 rounded-xl bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 transition-all text-lg shadow-inner">
                {{ isDarkMode ? '☀️' : '🌙' }}
              </button>

              <a href="/cv/Elian_Ferreyra_CV.pdf" target="_blank"
                 class="px-5 py-2 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/5 text-fuchsia-600 dark:text-fuchsia-400 font-bold text-[10px] uppercase tracking-widest hover:bg-fuchsia-500 hover:text-white transition-all duration-500 shadow-lg shadow-fuchsia-500/10">
                 CV
              </a>
            </div>
          </div>
        </nav>

        <header class="pt-56 pb-32 px-6 text-center max-w-5xl mx-auto relative">
  
  <div class="mb-10 relative inline-block group cursor-pointer">
    
    <div class="absolute inset-0 bg-gradient-to-tr from-fuchsia-500 to-rose-500 rounded-full blur-2xl opacity-20 dark:opacity-40 animate-pulse group-hover:scale-150 group-hover:opacity-60 transition-all duration-700 ease-out"></div>
    
    <div class="relative w-32 h-32 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-tr from-fuchsia-500 via-violet-500 to-rose-500 shadow-2xl transition-all duration-500 ease-out group-hover:scale-105 group-hover:rotate-2">
      
      <div class="w-full h-full rounded-full overflow-hidden border-4 border-[#f6f4ef] dark:border-[#030712] bg-slate-200 transition-all duration-500 group-hover:border-white/20">
      
        <img src="imagen/perfil.png" 
             alt="Elian Ferreyra" 
             class="w-full h-full object-cover scale-125 object-[center_25%] transition-all duration-700 ease-in-out group-hover:scale-150">
        </div>
        </div>
      </div>
      <h1 class="block text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter leading-[1.1] relative group cursor-default">
        <span class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-white dark:to-slate-500 bg-clip-text text-transparent transition-opacity drop-shadow-sm">
        Elian Ferreyra
        </span>
        <span class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-48 h-[3px] bg-gradient-to-r from-fuchsia-500 via-violet-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out rounded-full shadow-[0_0_15px_rgba(217,70,239,0.6)]"></span>
        </h1>
        
          <p class="text-slate-700 dark:text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Fullstack Developer de <span class="text-slate-900 dark:text-white font-medium">Argentina</span>. 
            Especializado en <span class="text-rose-600 font-semibold">Java</span> para el core e interfaces fluidas con <span class="text-violet-600 font-semibold">Angular</span>.
          </p>
        </header>

        <section id="sobre-mi" class="max-w-5xl mx-auto px-6 mb-20 scroll-mt-32">
          <div class="group relative p-10 md:p-14 rounded-[2.5rem] bg-white dark:bg-white/[0.01] border border-slate-200 dark:border-white/[0.05] shadow-xl shadow-slate-200/40 dark:shadow-none backdrop-blur-[2px] transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-fuchsia-500/5 overflow-hidden">
            <div class="absolute -top-32 -right-32 w-64 h-64 bg-fuchsia-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 items-start relative z-10">
              <div>
                <h2 class="text-xs font-black text-fuchsia-500 uppercase tracking-[0.4em] mb-4">Background</h2>
                <h3 class="text-3xl font-bold italic tracking-tighter dark:text-white">Arquitectura & Propósito.</h3>
              </div>
              <div class="md:col-span-2 space-y-6 text-slate-700 dark:text-slate-400 text-base font-light leading-relaxed">
                <p>
                  Soy desarrollador con foco en la <span class="text-slate-900 dark:text-white font-medium border-b border-slate-200 dark:border-white/5">mantenibilidad y la claridad del código</span>. 
                  Me gusta construir soluciones que no solo funcionen hoy, sino que sean fáciles de entender y escalar mañana.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-white/5 leading-snug">
                  <div class="flex gap-3 items-start group/item">
                    <span class="text-rose-600 dark:text-rose-500 font-bold group-hover/item:text-rose-500 transition-colors">01/</span>
                    <p class="text-sm"><strong class="text-slate-900 dark:text-white">Enfoque Backend:</strong> Priorizo la integridad de los datos, el diseño de APIs claras y el buen rendimiento.</p>
                  </div>
                  <div class="flex gap-3 items-start group/item">
                    <span class="text-violet-600 dark:text-violet-500 font-bold group-hover/item:text-violet-500 transition-colors">02/</span>
                    <p class="text-sm"><strong class="text-slate-900 dark:text-white">Frontend cuidado:</strong> Me interesa que lo técnico se vea reflejado en interfaces simples, rápidas y coherentes en Angular.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="max-w-5xl mx-auto px-6 mb-40">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="group relative p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-rose-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/10 overflow-hidden cursor-default">
              <div class="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div class="relative z-10">
                <h4 class="text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-500 mb-4 origin-left group-hover:scale-105 transition-transform duration-500">Core Backend</h4>
                <p class="text-sm text-slate-700 dark:text-slate-400 italic">Java 17+, Spring Boot, Hibernate/JPA, PostgreSQL, REST APIs.</p>
              </div>
            </div>
            <div class="group relative p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-violet-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-500/10 overflow-hidden cursor-default">
              <div class="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div class="relative z-10">
                <h4 class="text-xs font-black uppercase tracking-widest text-violet-600 dark:text-violet-500 mb-4 origin-left group-hover:scale-105 transition-transform duration-500">Frontend</h4>
                <p class="text-sm text-slate-700 dark:text-slate-400 italic">Angular 18+, TypeScript, Tailwind CSS.</p>
              </div>
            </div>
            <div class="group relative p-8 rounded-[2rem] bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-fuchsia-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-fuchsia-500/10 overflow-hidden cursor-default">
              <div class="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
              <div class="relative z-10">
                <h4 class="text-xs font-black uppercase tracking-widest text-fuchsia-600 dark:text-fuchsia-500 mb-4 origin-left group-hover:scale-105 transition-transform duration-500">Herramientas</h4>
                <p class="text-sm text-slate-700 dark:text-slate-400 italic">Git, GitHub, Docker, Maven, Postman.</p>
              </div>
            </div>
          </div>
        </section>

        <main id="proyectos" class="max-w-6xl mx-auto px-6 pb-40 scroll-mt-32 relative z-10">
          <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div>
              <h2 class="text-xs font-black text-fuchsia-500 uppercase tracking-[0.4em] mb-4">Portfolio</h2>
              <h3 class="text-5xl font-bold italic tracking-tighter dark:text-white">Proyectos Seleccionados</h3>
            </div>
            <div class="h-px flex-1 bg-gradient-to-r from-rose-500/50 to-transparent mx-8 hidden md:block"></div>
            <p class="text-slate-600 max-w-xs text-xs italic text-right">Soluciones reales construidas con precisión técnica.</p>
          </div>
          
          <div *ngIf="proyectos.length > 0; else loading" class="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div *ngFor="let p of proyectos" 
                 class="group relative bg-white dark:bg-slate-900/20 border border-slate-200 dark:border-white/5 rounded-[2.5rem] overflow-hidden hover:border-fuchsia-500/40 transition-all duration-700 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-fuchsia-500/5 hover:-translate-y-4">
              
              <div class="h-80 overflow-hidden relative border-b border-slate-200 dark:border-white/5 group/img cursor-zoom-in"
                   (click)="openModal(p)">
                <img [src]="p.imagenSeleccionada || p.imagen" [alt]="p.titulo" 
                     class="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 ease-in-out">
                
                <div class="absolute inset-0 bg-gradient-to-t from-white dark:from-[#030712] via-transparent to-transparent opacity-80"></div>

                <div class="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover/img:translate-x-0 group-hover/img:opacity-100 transition-all duration-500 z-20">
                  <div *ngFor="let imgPath of p.galeria?.slice(0, 4)" 
                       (mouseenter)="p.imagenSeleccionada = imgPath"
                       (click)="$event.stopPropagation(); openModal(p, imgPath)"
                       class="w-14 h-14 rounded-xl border-2 border-white shadow-lg overflow-hidden cursor-pointer hover:scale-110 hover:border-fuchsia-500 transition-all bg-black">
                    <img [src]="imgPath" class="w-full h-full object-cover">
                  </div>
                </div>
              </div>

              <div class="p-10 relative z-10">
                <div class="flex flex-wrap gap-2 mb-6">
                  <span *ngFor="let tech of p.tecnologias" 
                        class="text-[9px] font-bold uppercase tracking-widest text-fuchsia-700 dark:text-fuchsia-300 px-3 py-1 bg-fuchsia-50 dark:bg-white/[0.03] rounded-full border border-fuchsia-200 dark:border-white/10 backdrop-blur-sm">
                    {{ tech }}
                  </span>
                </div>
                <h3 class="text-3xl font-bold mb-4 tracking-tighter dark:text-white group-hover:text-fuchsia-500 transition-colors duration-500">
                  {{ p.titulo }}
                </h3>
                <p class="text-slate-600 dark:text-slate-400 mb-10 font-light leading-relaxed text-sm italic">{{ p.descripcion }}</p>

                <div class="flex items-center gap-6 text-[11px] uppercase tracking-widest font-black">
                  <a [href]="p.github" target="_blank" class="dark:text-white hover:text-rose-500 transition-colors duration-300">GitHub Repo</a>
                  <a *ngIf="p.demo" [href]="p.demo" target="_blank" 
                     class="px-8 py-3 bg-gradient-to-br from-fuchsia-600 via-violet-600 to-rose-600 text-white rounded-xl hover:shadow-lg hover:shadow-fuchsia-500/20 hover:scale-105 active:scale-95 transition-all duration-500 leading-none">
                    Launch
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ng-template #loading>
            <div class="text-center py-32 animate-pulse">
                <div class="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-fuchsia-500 mb-6"></div>
                <p class="text-slate-500 uppercase text-[10px] tracking-[0.5em] font-bold">Iniciando Sistemas...</p>
            </div>
          </ng-template>
        </main>

        <section id="contacto" class="max-w-4xl mx-auto px-6 mb-40 scroll-mt-32">
          <div class="py-16 px-8 rounded-[3rem] bg-gradient-to-br from-white/80 via-amber-50 to-rose-50 dark:from-white/[0.03] dark:via-transparent dark:to-transparent border border-slate-200 dark:border-white/10 text-center relative overflow-hidden group hover:-translate-y-2 transition-all duration-700 hover:shadow-2xl hover:shadow-fuchsia-500/5 isolate z-10">
            <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-fuchsia-600/10 blur-[100px] rounded-full group-hover:bg-fuchsia-600/30 group-hover:scale-150 transition-all duration-1000 -z-10"></div>
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-rose-600/10 blur-[100px] rounded-full group-hover:bg-rose-600/30 group-hover:scale-150 transition-all duration-1000 -z-10"></div>
            
            <h2 class="text-[10px] font-black text-rose-500 uppercase tracking-[0.5em] mb-4 relative z-10">Ready to talk?</h2>
            <h3 class="text-4xl md:text-5xl font-bold mb-12 tracking-tighter italic dark:text-white relative z-10">¿Hagamos algo increíble?</h3>
            
            <div class="flex flex-wrap justify-center gap-6 relative z-10 text-[11px] uppercase tracking-widest font-black">
              <a href="mailto:elianferre@hotmail.com.ar" class="px-10 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl hover:bg-fuchsia-600 dark:hover:bg-fuchsia-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-500 shadow-xl shadow-fuchsia-500/10">Enviar Email</a>
              <a href="https://linkedin.com/in/elian-ferreyra" target="_blank" class="px-10 py-4 bg-white/50 dark:bg-transparent text-slate-900 dark:text-white rounded-2xl border border-slate-200 dark:border-white/10 hover:bg-white/5 transition-all backdrop-blur-sm hover:scale-105">LinkedIn</a>
              <a href="https://wa.me/5492262580172" target="_blank" class="px-8 py-4 bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl hover:scale-110 active:scale-95 transition-all duration-500 shadow-xl shadow-emerald-500/10">WhatsApp</a>
            </div>
          </div>
        </section>

        <footer class="pb-16 text-center relative z-10">
          <div class="inline-block px-8 py-3 bg-white/40 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-full backdrop-blur-sm text-slate-600 dark:text-slate-600 text-[9px] uppercase font-black tracking-[1.1em]">
            Elian Ferreyra <span class="mx-4 text-slate-300 dark:text-slate-800">|</span> 2026 <span class="mx-4 text-slate-300 dark:text-slate-800">|</span> Argentina
          </div>
        </footer>

        <div *ngIf="proyectoActivo" 
             class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 md:p-10 animate-in fade-in duration-300"
             (click)="closeModal()">
          
          <button (click)="closeModal()" class="absolute top-6 right-6 z-[110] p-4 text-white/50 hover:text-white transition-colors text-3xl">&times;</button>
          
          <button (click)="prevFoto($event)" class="absolute left-4 z-[110] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-md transition-all">
            <span class="block transform rotate-180 text-xl">➜</span>
          </button>

          <div class="relative max-w-6xl w-full h-full flex flex-col items-center justify-center gap-6" (click)="$event.stopPropagation()">
            <img [src]="proyectoActivo.galeria[indexFoto]" 
                 class="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10 animate-in zoom-in-95 duration-500">
            <div class="text-center">
              <h4 class="text-white font-bold tracking-tighter text-xl">{{proyectoActivo.titulo}}</h4>
              <p class="text-fuchsia-400 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Imagen {{indexFoto + 1}} de {{proyectoActivo.galeria.length}}</p>
            </div>
          </div>

          <button (click)="nextFoto($event)" class="absolute right-4 z-[110] p-4 bg-white/5 hover:bg-white/10 rounded-full text-white backdrop-blur-md transition-all">
            <span class="text-xl">➜</span>
          </button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .animate-pulse { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse { 0%, 100% { opacity: 0.05; transform: scale(1); } 50% { opacity: 0.1; transform: scale(1.1); } }
    .animate-in { animation: fadeIn 0.3s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    .zoom-in-95 { animation: zoomIn 0.3s ease-out; }
    @keyframes zoomIn { from { transform: scale(0.95); } to { transform: scale(1); } }
  `]
})
export class App implements OnInit {
  proyectos: any[] = [];
  isDarkMode: boolean = true;
  proyectoActivo: any = null;
  indexFoto: number = 0;

  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.initTheme();
    this.loadProjects();
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark' || !savedTheme;
    this.updateHtmlClass();
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
       next: (data) => {
        this.proyectos = data.map((p: any) => {
          const tituloLower = p.titulo.toLowerCase();
          // Lógica corregida para carpetas
          let carpeta = 'inmodoc';
          let total = 9;
          if (tituloLower.includes('inmodoc') || tituloLower.includes('gestión')) {
            carpeta = 'turnos';
            total = 11;
          }
          const galeria = Array.from({ length: total }, (_, i) => `imagen/${carpeta}/foto${i + 1}.png`);
          return {
            ...p,
            galeria: galeria,
            imagenSeleccionada: galeria[0]
          };
        });
        this.cdr.detectChanges();
      }
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.updateHtmlClass();
  }

  updateHtmlClass() {
    const html = document.documentElement;
    this.isDarkMode ? html.classList.add('dark') : html.classList.remove('dark');
    this.cdr.detectChanges();
  }

  openModal(proyecto: any, startingImg?: string) {
    this.proyectoActivo = proyecto;
    if (startingImg) {
      this.indexFoto = proyecto.galeria.indexOf(startingImg);
    } else {
      this.indexFoto = proyecto.galeria.indexOf(proyecto.imagenSeleccionada);
    }
    if (this.indexFoto === -1) this.indexFoto = 0;
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.proyectoActivo = null;
    document.body.style.overflow = 'auto';
  }

  nextFoto(event?: Event) {
    if (event) event.stopPropagation();
    this.indexFoto = (this.indexFoto + 1) % this.proyectoActivo.galeria.length;
  }

  prevFoto(event?: Event) {
    if (event) event.stopPropagation();
    this.indexFoto = (this.indexFoto - 1 + this.proyectoActivo.galeria.length) % this.proyectoActivo.galeria.length;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.proyectoActivo) return;
    if (event.key === 'ArrowRight') this.nextFoto();
    if (event.key === 'ArrowLeft') this.prevFoto();
    if (event.key === 'Escape') this.closeModal();
  }
}