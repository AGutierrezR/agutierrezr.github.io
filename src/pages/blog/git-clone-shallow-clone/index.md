---
layout: "../../../layouts/BlogLayout.astro"
title: 'Git clone --depth: cómo clonar repositorios más rápido (shallow clone)'
date: 2026-04-24
description: Aprende a usar git clone --depth para hacer shallow clone y clonar repositorios más rápido. Ahorra tiempo y espacio con ejemplos prácticos..
draft: false
tags: [git]
---

¿Alguna vez `git clone` tardó varios minutos solo para ver el código actual?

En muchos casos, no necesitas todo el historial del repositorio. Solo quieres el estado actual.

Aquí es donde entra el **shallow clone en Git**: una técnica que te permite clonar solo los últimos commits usando `git clone --depth`, reduciendo drásticamente el tiempo de descarga y el espacio en disco.

En esta guía aprenderás:
- Qué es un shallow clone y cómo funciona
- Cómo usar `git clone --depth` correctamente
- Cuándo usarlo (y cuándo evitarlo)
- Alternativas como partial clone o sparse checkout

## ¿Qué es un Shallow Clone?

Un **shallow clone** (clon superficial) es una operación de Git que crea una copia local de un repositorio, pero solo descarga una porción limitada de su historial. En lugar de obtener cada commit, rama y etiqueta, especificas cuántos commits quieres recuperar. Para la mayoría de los casos de uso diario, no necesitas saber qué cambió en un commit del 2019.

### ¿Por Qué Usar un Shallow Clone?

Las razones principales:

- **Velocidad**: Reduces significativamente el tiempo de descarga
- **Espacio en disco**: El repositorio local ocupa mucho menos
- **Ancho de banda**: Ideal para conexiones lentas o limitadas
- **Proyectos grandes**: Repositorios con años de historia pueden pesar demasiado

La diferencia puede ser dramática. Un repositorio de 500MB con historial completo podría pesar solo pocos megas con `--depth 1`.

## Cómo usar git clone --depth

### El Básico: `git clone --depth`

La sintaxis es simples:

```bash
# Clonar solo el último commit
git clone --depth 1 https://github.com/usuario/repositorio.git

# Clonar los últimos 10 commits
git clone --depth 10 https://github.com/usuario/repositorio.git

# Clonar los últimos 50 commits
git clone --depth 50 https://github.com/usuario/repositorio.git
```

El número que pasas a `--depth` indica cuántos commits quieres desde la punta de la rama.

### Clonar una Rama Específica

Por defecto, shallow clone opera en la rama principal (main o master). Si necesitas una rama específica:

```bash
# Clonar última commit de una rama específica
git clone --depth 1 --branch develop https://github.com/usuario/repositorio.git
```

Por defecto, `--depth` ya implica `--single-branch`. Es decir, al usar depth solo traes la rama que especificas (o la principal). No necesitas añadir `--single-branch`.

### Clonar Desde una Fecha Específica

Si sabes desde cuándo necesitas historial, usa `--shallow-since`:

```bash
# Clonar todo desde el 1 de enero de 2024
git clone --shallow-since=2024-01-01 https://github.com/usuario/repositorio.git
```

Esto es útil cuando necesitas más contexto histórico pero no todo el historial.

## Cuándo usar git clone --depth

Ya sea para probar una librería o como dependencia de tu proyecto:

```bash
# Clonar solo el último commit
git clone --depth 1 https://github.com/lodash/lodash.git

# O una rama específica
git clone --depth 1 --branch main https://github.com/otra-libreria/libreria.git
```

En segundos tienes el código para inspeccionar o usar.

### Con Submodules

Si usas submodules, combínalos:

```bash
# Shallow clone del submodule
git submodule update --depth 1 --init
```

O durante el clone inicial:

```bash
git clone --recurse-submodules --depth 1 https://github.com/proyecto/main.git
```

## Limitaciones de git shallow clone

### No Puedes Hacer Ciertas Operaciones

Con shallow clone, estas operaciones no funcionan o requieren pasos adicionales:

1. **git log limitado**: No ves historial más antiguo que el depth
2. **git rebase problemático**: Puede fallar si necesitas commits anteriores
3. **git bisect**: No funciona completamente
4. **Merge conflicts**: Puede ser difícil resolver si necesitas historia antigua

### Cómo Expandir un Shallow Clone

Cuando necesitas más historial, hay solución:

```bash
# Convertir a clon completo
git fetch --unshallow

# O añadir más commits
git fetch --depth 1000
```

El comando `--unshallow` es equivalente a `git fetch --depth=2147483647` (el máximo).

### Cuándo NO Usar Shallow Clone

Evita shallow clone si:

- **Necesitas el historial completo**: Para archaeology o debugging
- **Colaboras activamente**: Especialmente con merges complejos
- **Usas git blame**: Para ver quién cambió qué en código antiguo
- **Proyecto es pequeño**: El overhead no justifica el esfuerzo

Para proyectos pequeños, el tiempo ahorrado no vale la limitación.

## Ejemplo Práctico: Tu Flujo de Trabajo

Aquí está un flujo práctico para desarrollo diario:

```bash
# 1. Para probar algo rápidamente
git clone --depth 1 https://github.com/proyecto/proyecto.git
cd proyecto
npm install
npm start

# 2. Si decides contribuir, hazlo completo
git clone --depth 1 https://github.com/proyecto/proyecto.git
cd proyecto
git fetch --unshallow
```

## Errores Comunes a Evitar

### 1. Depth Muy Pequeño para Resolver Merges

- **Qué sucede**: No puedes hacer merge de cambios porque faltan commits
- **Por qué es problemático**: Git no puede encontrar ancestros comunes
- **Mejor enfoque**: Usa `--depth 50` mínimo si planeas hacer merge

### 2. Olvidar Que Es Shallow y Perder Cambios

- **Qué sucede**: Haces cambios locales pensando que tienes historial completo
- **Por qué es problemático**: git log muestra solo lo reciente
- **Mejor enfoque**: Verifica con `git log --oneline | wc -l` antes de trabajar mucho

### 3. Shallow Clone con Submodules Sin las Opciones Correctas

- **Qué sucede**: Submodules vienen vacíos o incompletos
- **Por qué es problemático**: Dependencias faltantes
- **Mejor enfoque**: Usa `--recurse-submodules` desde el inicio

## Mejores Prácticas y Recomendaciones

### Haceres

- **Usar `--depth 1` para pruebas rápidas**: Porque solo necesitas código actual
- **Expandir a clon completo cuando sea necesario**: Con `git fetch --unshallow`

### No Haceres

- **Depth muy bajo para desarrollo activo**: Porque vas a causar problemas de merge
- **Usar siempre shallow para proyectos pequeños**: Porque no hay beneficio real


## Lecturas Adicionales

- [Documentación oficial de Git: Cloning Repositories](https://git-scm.com/docs/git-clone)
- [Git Tower: Git Shallow Clone](https://git-tower.com/learn/git/faq/git-shallow-clone)
- [Atlassian Git Tutorial: Shallow Clone](https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone)
Un shallow clone es como tener una copia parcial de un libro: tienes lo esencial para entender y trabajar, pero no toda la historia de ediciones. Para la mayoría de casos de desarrollo, probar algo rápido o revisar codigo actual, es perfecto.

**Ahora tienes las herramientas para clonar repositorios en segundos** en lugar de minutos. La próxima vez que necesites solo el código actual, ya sabes qué hacer.

**Tus próximos pasos:**
1. Prueba un `git clone --depth 1` en tu próximo proyecto
2. Usa shallow clone cuando necesites código rápido
3. Recuerda: `--unshallow` está disponible cuando necesites más

