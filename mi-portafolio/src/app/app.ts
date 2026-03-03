import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProjectService } from './services/project';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <div class="min-h-screen bg-slate-950 text-white font-sans selection:bg-fuchsia-500/30">
      
      <nav class="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-fuchsia-900/20 px-6 py-4">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          <span class="text-xl font-bold bg-gradient-to-r from-fuchsia-500 via-violet-500 to-rose-500 bg-clip-text text-transparent italic tracking-tighter">EF.dev</span>
          <div class="flex gap-8 text-xs font-bold uppercase tracking-widest text-slate-500">
            <a href="#proyectos" class="hover:text-fuchsia-400 transition-colors">Proyectos</a>
            <a href="#sobre-mi" class="hover:text-violet-400 transition-colors">Bio</a>
            <a href="#contacto" class="hover:text-rose-400 transition-colors">Contacto</a>
          </div>
        </div>
      </nav>

      <header class="pt-48 pb-32 px-6 text-center max-w-5xl mx-auto relative">
        <div class="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-fuchsia-600/10 blur-[150px] -z-10"></div>
        <div class="absolute top-40 left-1/4 w-64 h-64 bg-violet-600/10 blur-[120px] -z-10"></div>
        
        <div class="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-fuchsia-500/5 border border-fuchsia-500/20">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
          </span>
          <span class="text-[10px] font-bold text-fuchsia-400 uppercase tracking-tighter">Disponible para trabajar</span>
        </div>

        <h1 class="text-7xl md:text-8xl font-black mb-8 tracking-tighter leading-none relative group">
          <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-r from-fuchsia-600/10 via-violet-600/10 to-rose-600/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 rounded-full"></div>
          <span class="relative inline-block pb-1">
            <span class="bg-gradient-to-r from-white via-slate-100 via-fuchsia-100 to-rose-200 bg-clip-text text-transparent decoration-violet-500/20 drop-shadow-[0_2px_10px_rgba(217,70,239,0.1)]">
              Elian Ferreyra
            </span>
            <span class="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-fuchsia-500 via-violet-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-full shadow-[0_0_10px_rgba(217,70,239,0.5)]"></span>
          </span>
        </h1>
        
        <p class="text-slate-400 text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto">
          Desarrollador <span class="text-white font-medium">Fullstack</span> de Argentina. 
          Enfocado en backend con <span class="text-rose-400 font-bold">Java</span> y frontend con <span class="text-violet-400 font-bold">Angular</span>.
        </p>
      </header>

      <section id="sobre-mi" class="max-w-5xl mx-auto px-6 mb-40">
        <div class="grid grid-cols-1 gap-16">
          <div class="flex flex-col md:flex-row gap-8 items-end">
            <div class="flex-1">
              <h2 class="text-sm font-black text-fuchsia-500 uppercase tracking-[0.3em] mb-4">Bio</h2>
              <h3 class="text-5xl font-bold italic tracking-tighter">Más allá del código.</h3>
            </div>
            <p class="text-slate-500 max-w-xs text-sm italic border-l border-violet-500/50 pl-4">
              Un poco sobre mi perfil y cómo trabajo.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="space-y-8 text-slate-400 text-lg font-light leading-relaxed">
              <p>
                Soy desarrollador fullstack con foco en backend. Me gusta construir software claro, mantenible y que realmente resuelva problemas. Disfruto trabajar con <span class="text-rose-400 font-bold">Java</span> y diseñar soluciones que escalen sin volverse complejas innecesariamente.
              </p>
              <p>
                Le doy mucha importancia a la simplicidad y a la arquitectura limpia. Para mí, un buen sistema es el que funciona bien hoy pero también se puede mantener mañana sin dolores de cabeza.
              </p>
            </div>
            <div class="space-y-8 text-slate-400 text-lg font-light leading-relaxed">
              <p>
                Actualmente sigo profundizando mi stack con <span class="text-violet-400 font-bold">Angular</span> para acompañar el backend con interfaces claras y rápidas. Me interesa seguir creciendo en entornos donde pueda aportar valor real y aprender constantemente.
              </p>
              <p>
                Busco oportunidades como desarrollador trainee o junior donde pueda seguir sumando experiencia profesional y aportar desde el primer día.
              </p>
            </div>
          </div>

          <!-- BOTONES CV -->
          <div class="flex flex-wrap gap-4 justify-center mt-8">
            <a href="/cv/Elian_Ferreyra_CV.pdf" target="_blank"
               class="px-8 py-3 bg-slate-900 border border-fuchsia-500/40 rounded-2xl text-sm font-bold uppercase tracking-widest hover:border-fuchsia-400 transition-all">
              Ver CV
            </a>

            <a href="/cv/Elian_Ferreyra_CV.pdf" download
               class="px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-2xl text-sm font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all">
              Descargar CV
            </a>
          </div>
        </div>
      </section>

      <main id="proyectos" class="max-w-6xl mx-auto px-6 pb-40">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 class="text-sm font-black text-fuchsia-500 uppercase tracking-[0.3em] mb-4">Portafolio</h2>
            <h3 class="text-5xl font-bold italic tracking-tighter text-white">Proyectos Destacados</h3>
          </div>
          <p class="text-slate-500 max-w-xs text-sm italic border-l border-rose-500/50 pl-4">Una selección de mis trabajos más recientes integrando tecnologías modernas.</p>
        </div>
        
        <div *ngIf="proyectos.length > 0; else loading" class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div *ngFor="let p of proyectos" 
               class="group relative bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] overflow-hidden hover:border-fuchsia-500/50 transition-all duration-500 shadow-2xl hover:-translate-y-3">
            
            <div class="absolute inset-0 bg-gradient-to-br from-fuchsia-600/5 via-transparent to-violet-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div class="h-80 overflow-hidden relative">
              <img [src]="p.imagen" [alt]="p.titulo" 
                   class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-in-out">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
            </div>

            <div class="p-10 relative z-10">
              <div class="flex flex-wrap gap-2 mb-6">
                <span *ngFor="let tech of p.tecnologias" 
                      class="text-[10px] font-bold uppercase tracking-widest text-fuchsia-400 px-3 py-1 bg-fuchsia-500/10 rounded-full border border-fuchsia-500/20">
                  {{ tech }}
                </span>
              </div>
              <h3 class="text-3xl font-bold mb-4 tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-400 group-hover:to-rose-400 transition-all duration-300">
                {{ p.titulo }}
              </h3>
              <p class="text-slate-400 mb-10 font-light leading-relaxed text-sm italic">{{ p.descripcion }}</p>

              <div class="flex items-center gap-6">
                <a [href]="p.github" target="_blank" class="text-xs font-black uppercase tracking-widest text-white hover:text-rose-400 transition-colors">GitHub Repo</a>
                <a *ngIf="p.demo" [href]="p.demo" target="_blank" 
                   class="text-xs font-black uppercase tracking-widest px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-violet-600 rounded-2xl hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] transition-all">
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>

        <ng-template #loading>
          <div class="text-center py-32">
             <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-fuchsia-500 mb-4"></div>
             <p class="text-slate-500 uppercase text-[10px] tracking-widest font-bold">Sincronizando Proyectos...</p>
          </div>
        </ng-template>
      </main>

      <section class="max-w-6xl mx-auto px-6 mb-40">
        <div class="text-center mb-16">
          <h2 class="text-sm font-black text-violet-500 uppercase tracking-[0.4em] mb-4">Stack</h2>
          <h3 class="text-4xl font-bold italic">Herramientas & Tecnologías</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 bg-slate-900/20 border border-slate-800 rounded-3xl hover:border-rose-500/30 transition-colors group">
            <h4 class="text-rose-400 font-bold mb-6 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]"></span> Backend
            </h4>
            <ul class="space-y-3 text-slate-400 font-light">
              <li class="flex justify-between">Java <span>17/21</span></li>
              <li class="flex justify-between">Spring Boot <span>3.x</span></li>
              <li class="flex justify-between">PostgreSQL <span>DB</span></li>
              <li class="flex justify-between">Hibernate <span>ORM</span></li>
            </ul>
          </div>

          <div class="p-8 bg-slate-900/20 border border-slate-800 rounded-3xl hover:border-fuchsia-500/30 transition-colors group">
            <h4 class="text-fuchsia-400 font-bold mb-6 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_#d946ef]"></span> Frontend
            </h4>
            <ul class="space-y-3 text-slate-400 font-light">
              <li class="flex justify-between">Angular <span>18+</span></li>
              <li class="flex justify-between">TypeScript <span>ES6</span></li>
              <li class="flex justify-between">Tailwind CSS <span>UI</span></li>
              <li class="flex justify-between">RxJS <span>Reactive</span></li>
            </ul>
          </div>

          <div class="p-8 bg-slate-900/20 border border-slate-800 rounded-3xl hover:border-violet-500/30 transition-colors group">
            <h4 class="text-violet-400 font-bold mb-6 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_#8b5cf6]"></span> Herramientas
            </h4>
            <ul class="space-y-3 text-slate-400 font-light">
              <li class="flex justify-between">Git <span>Version Control</span></li>
              <li class="flex justify-between">Docker <span>Containers</span></li>
              <li class="flex justify-between">Maven <span>Build</span></li>
              <li class="flex justify-between">Postman <span>API Testing</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contacto" class="max-w-6xl mx-auto px-6 mb-40 text-center">
        <div class="py-32 bg-gradient-to-b from-violet-600/5 to-transparent border border-fuchsia-900/20 rounded-[4rem] relative overflow-hidden">
          <div class="absolute top-0 right-0 w-64 h-64 bg-rose-600/5 blur-[100px] -z-10"></div>
          
          <h2 class="text-sm font-black text-rose-500 uppercase tracking-[0.3em] mb-6">¿Qué sigue?</h2>
          <h3 class="text-6xl md:text-7xl font-bold mb-10 tracking-tighter italic">Ponte en contacto.</h3>
          <p class="text-slate-400 max-w-xl mx-auto mb-16 text-xl font-light">
            Estoy abierto a propuestas laborales, colaboraciones o simplemente a charlar sobre tecnología. ¡Mi bandeja está siempre abierta!
          </p>
          
          <div class="flex flex-wrap justify-center gap-6">
            <a href="mailto:elianferre@hotmail.com.ar" 
               class="px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-fuchsia-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl shadow-white/5">
               Escribir Email
            </a>
            <a href="https://linkedin.com/in/elian-ferreyra" target="_blank" 
               class="px-12 py-5 bg-slate-900 text-white font-black rounded-2xl border border-violet-800 hover:border-violet-400 transition-all transform hover:-translate-y-1">
               LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer class="pb-20 text-center">
        <p class="text-slate-800 text-[10px] uppercase font-black tracking-[0.8em]">
          Elian Ferreyra — <span class="text-fuchsia-900">2026</span>
        </p>
      </footer>
    </div>
  `
})
export class App implements OnInit {
  proyectos: any[] = [];

  constructor(
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.proyectos = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar proyectos:', err)
    });
  }
}