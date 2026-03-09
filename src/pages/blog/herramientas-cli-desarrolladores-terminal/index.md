---
layout: "../../../layouts/BlogLayout.astro"
title: Mis herramientas favoritas para la terminal (CLI tools)
date: 2026-03-10
description: Descubre las mejores herramientas CLI para desarrolladores como fzf, ripgrep, lazygit, tmux, jq y muchas más para mejorar tu productividad en la terminal.
draft: false
tags: [cli, terminal]
---

Con el tiempo fui acumulando muchas herramientas en mi entorno de terminal. Hace poco decidí hacer limpieza y quedarme solo con las que **realmente uso todos los días**.

Esta es mi lista actual de **herramientas CLI para desarrolladores**, organizadas por categorías. Todas ellas están pensadas para mejorar la productividad cuando trabajas desde la terminal en sistemas como Linux o macOS.

---

## Herramientas CLI esenciales

### Utilidades generales para la terminal

* **[fzf](https://github.com/junegunn/fzf)**:
  Fuzzy finder extremadamente rápido para la terminal. Permite buscar interactivamente archivos, historial, procesos o cualquier lista de texto.
* **[atuin](https://github.com/atuinsh/atuin)**:
  Reemplazo moderno del historial de shell con búsqueda avanzada y sincronización opcional entre máquinas.
* **[bat](https://github.com/sharkdp/bat)**:
  Alternativa a `cat` con resaltado de sintaxis, integración con Git y paginación automática.
* **[zoxide](https://github.com/ajeetdsouza/zoxide)**:
  Navegación inteligente entre directorios que aprende de tus hábitos.
* **[yazi](https://github.com/sxyazi/yazi)**:
  File manager moderno para terminal, extremadamente rápido y con preview de archivos.
* **[clipboard](https://github.com/Slackadays/Clipboard)**:
  Herramienta CLI multiplataforma para copiar y pegar contenido desde el portapapeles del sistema.
* **[jq](https://github.com/jqlang/jq)**:
  Procesador de JSON para la línea de comandos. Ideal para filtrar y transformar respuestas de APIs.
* **[fnm](https://github.com/Schniz/fnm)**:
  Gestor de versiones de Node.js extremadamente rápido.
* **[ripgrep](https://github.com/BurntSushi/ripgrep)**:
  Búsqueda recursiva ultrarrápida basada en regex, optimizada para repositorios grandes.
* **[zsh-syntax-highlighting](https://github.com/zsh-users/zsh-syntax-highlighting)**:
  Plugin de Zsh que resalta la sintaxis de los comandos mientras escribes.
* **[zsh-autosuggestions](https://github.com/zsh-users/zsh-autosuggestions)**:
  Plugin de Zsh que sugiere comandos basándose en tu historial.

---

### Herramientas CLI para Git y control de versiones

- **[worktrunk](https://github.com/max-sixty/worktrunk)**
  Es una CLI para la gestión del árbol de trabajo de Git, diseñada para flujos de trabajo de agentes de IA paralelos.
* **[lazygit](https://github.com/jesseduffield/lazygit)**:
  Interfaz TUI muy completa para trabajar con Git sin salir de la terminal.
* **[diff-so-fancy](https://github.com/so-fancy/diff-so-fancy)**:
  Mejora la legibilidad de `git diff` con una salida más clara.
* **[jj (Jujutsu)](https://github.com/jj-vcs/jj)**:
  Sistema de control de versiones moderno inspirado en Git y Mercurial, con operaciones más seguras y reversibles.

---

### Manejo de procesos y sesiones en terminal

* **[tmux](https://github.com/tmux/tmux)**:
  Multiplexor de terminal que permite múltiples sesiones, paneles y persistencia.
* **[mprocs](https://github.com/pvolok/mprocs)**:
  Ejecuta y monitoriza múltiples procesos en paralelo desde una interfaz TUI.

---

## Otras herramientas CLI útiles

### Utilidades

* **[curlie](https://github.com/rs/curlie)**:
  Interfaz más amigable para `curl`, inspirada en `httpie`.
* **[entr](https://github.com/eradman/entr)**:
  Ejecuta comandos automáticamente cuando cambian archivos.
* **[mult](https://github.com/dhth/mult)**:
  Ejecuta un comando varias veces y permite ver los diferentes outputs en una interfaz TUI.
* **[freeze](https://github.com/charmbracelet/freeze)**:
  Genera imágenes elegantes de código o terminal para documentación o redes sociales.
* **[vhs](https://github.com/charmbracelet/vhs)**:
  Permite grabar GIFs reproducibles de terminal usando scripts.
* **[fd](https://github.com/sharkdp/fd)**:
  Alternativa moderna a `find`, con sintaxis más simple y mayor velocidad.
* **[glow](https://github.com/charmbracelet/glow)**:
  Visualizador de Markdown en terminal.
* **[tabroom](https://terminaltrove.com/taproom/)**:
  Un TUI interactivo para Homebrew.
* **[tldr](https://github.com/tldr-pages/tldr)**:
  Alternativa simplificada a `man` con ejemplos prácticos.
* **[starship](https://github.com/starship/starship)**:
  Prompt rápido, minimalista y altamente configurable para cualquier shell.

---

### Herramientas CLI para trabajar con JSON y CSV

* **[jnv](https://github.com/ynqa/jnv)**:
  Explorador interactivo de JSON que combina navegación visual con `jq`.
* **[jless](https://github.com/PaulJuliusMartinez/jless)**:
  Viewer interactivo de JSON en terminal.
* **[fx](https://github.com/antonmedv/fx)**:
  Herramienta para explorar y transformar JSON usando JavaScript.
* **[csvlens](https://github.com/YS-L/csvlens)**:
  Visualizador interactivo de CSV con navegación tipo spreadsheet.

---

### Herramientas para visualizar logs en terminal

* **[tl](https://github.com/Textualize/toolong)**:
  Herramienta para visualizar y seguir logs desde la terminal.

---

### Herramientas de IA para la terminal

- **[opencode](https://github.com/anomalyco/opencode)**:
  Agente de IA open source para tareas de programación.
- **[GitHub Copilot CLI](https://github.com/github/copilot-cli)**:
  Copilot para la terminal que genera y explica comandos. (Similar a opencode)
* **[mods](https://github.com/charmbracelet/mods)**:
  Cliente CLI para interactuar con modelos de lenguaje desde la terminal.
* **[models](https://github.com/arimxyer/models)**:
  TUI y CLI para explorar modelos de IA, benchmarks y agentes de codificación.

---

## Combinaciones de herramientas especialmente útiles

Muchas de estas herramientas funcionan especialmente bien juntas:

* `fzf`
* `ripgrep`
* `fd`
* `zoxide`

Esta combinación forma una **base muy potente para mejorar la experiencia en la terminal** y navegar proyectos grandes de forma mucho más rápida.

## Recursos

- **[Terminal Trove](https://terminaltrove.com/)** 

