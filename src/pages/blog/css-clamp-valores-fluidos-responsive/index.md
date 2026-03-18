---
layout: "../../../layouts/BlogLayout.astro"
title: CSS clamp() - cómo crear valores fluidos y responsive sin media queries
date: 2026-03-18
description: Aprende a usar clamp() en CSS para crear diseños fluidos y responsive sin media queries. Guía práctica con ejemplos de tipografía, spacing y layouts.
draft: false
tags: [css]
---

> **TL;DR**: `clamp()` te permite definir un valor que se ajusta automáticamente entre un mínimo y un máximo, simplificando el CSS responsivo sin necesidad de media queries para cada breakpoint.

---

Si alguna vez has tenido que escribir múltiples media queries solo para ajustar un tamaño de fuente o un padding, `clamp()` es tu nueva mejor amiga. Esta función CSS permite crear valores fluidos que se adaptan dinámicamente al viewport sin complicar tu código.

En este post exploraremos cómo funciona `clamp()`, por qué es útil, y cómo aplicarla en proyectos reales.

## ¿Qué es CSS Clamp?

`clamp()` es una función CSS que acepta tres valores:

```css
clamp(valor-mínimo, valor-preferido, valor-máximo)
```

- **valor-mínimo**: El límite inferior que nunca se excederá.
- **valor-preferido**: El valor ideal que intenta usar (puede ser una fórmula).
- **valor-máximo**: El límite superior que nunca se excederá.

Si el `valor-preferido` está dentro del rango, se usa ese. Si es menor que el mínimo, se usa el mínimo. Si es mayor que el máximo, se usa el máximo.

## Uso práctico: Tamaños de fuente responsivos

El caso de uso más común es crear tamaños de fuente que escalen suavemente con el viewport.

### El problema

Tradicionalmente, para un título responsivo necesitarías:

```css
h1 {
  font-size: 16px;
}

@media (min-width: 768px) {
  h1 {
    font-size: 24px;
  }
}

@media (min-width: 1200px) {
  h1 {
    font-size: 32px;
  }
}
```

### La solución con clamp()

```css
h1 {
  font-size: clamp(1rem, 2.5vw + 0.5rem, 2rem);
}
```

Este código significa:
- **Mínimo**: `1rem` (~16px en la mayoría de navegadores)
- **Valor preferido**: `2.5vw + 0.5rem` (crece con el viewport)
- **Máximo**: `2rem` (~32px)

El navegador calcula el valor preferido basado en el ancho del viewport. Si el resultado está entre 1rem y 2rem, lo usa. Si es menor, aplica 1rem. Si es mayor, aplica 2rem.

## Fórmulas útiles

### Escalar entre dos tamaños

```css
.element {
  width: clamp(300px, 50vw, 800px);
}
```

El elemento tendrá un ancho mínimo de 300px, preferirá ocupar 50% del viewport, pero nunca excederá 800px.

### Espaciado fluido

```css
.card {
  padding: clamp(1rem, 3vw, 2rem);
  margin-bottom: clamp(1.5rem, 2vw + 0.5rem, 3rem);
}
```

### Alturas responsivas

```css
.hero {
  min-height: clamp(300px, 50vh, 600px);
}
```

## Ejemplo completo: Layout de tarjeta

```css
.card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: clamp(1rem, 4vw, 2.5rem);
  margin: clamp(0.5rem, 2vw, 1.5rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
  margin-bottom: clamp(0.5rem, 1vw, 1rem);
}

.card-body {
  font-size: clamp(0.875rem, 1.5vw, 1rem);
  line-height: 1.6;
}
```

Este enfoque garantiza que las tarjetas se vean bien tanto en móvil como en escritorio, sin necesidad de media queries.

## Calcula valores fácilmente con Utopia

Calcular los valores perfectos para `clamp()` puede ser trial-and-error. [Utopia](https://utopia.fyi/) es una herramienta gratuita que genera tablas de valores fluidos basados en una escala tipográfica y espaciado consistente.

Solo defines tus puntos de corte (breakpoints) y el rango de escalado, y Utopia te genera el CSS listo para copiar:

```css
/* Ejemplo generado por Utopia para un tipo fluído */
h1 {
  font-size: clamp(1.875rem, 1.19rem + 2.86vw, 3.75rem);
}
```

Utopia también ofrece un generador de CSS custom properties que puedes integrar directamente en tu proyecto.

## Compatibilidad y consideraciones

### Soporte de navegadores

`clamp()` tiene soporte universal en navegadores modernos desde hace varios años. Si necesitas soportar IE11 o versiones muy antiguas de Safari, usa fallback:

```css
.title {
  font-size: 1rem;              /* Fallback para navegadores antiguos */
  font-size: clamp(1rem, 2vw, 2rem);  /* Navegadores modernos */
}
```

### Precisión en cálculos

Cuando uses expresiones como `2.5vw + 0.5rem`, asegúrate de probar en diferentes tamaños de viewport para verificar que los valores resultantes se vean bien.

### Unit vw vs rem

- **vw**: Relacionado directamente con el ancho del viewport. Escala uniformemente.
- **rem**: Relacionado con el tamaño de fuente raíz. Escala con las preferencias de zoom del usuario.

Para accesibilidad, prefers usar `rem` en la parte preferida cuando sea posible.

## Mejores prácticas

### Hazlo
- Usa `clamp()` para tamaños de fuente, espaciados y anchos de contenedores.
- Combina `vw` o `vh` con unidades fijas (`rem`, `px`) para mayor control.
- Siempre define valores mínimos y máximos razonables.

### Evítalo
- No uses `clamp()` para todo. Media queries siguen siendo necesarios para cambios de layout drásticos.
- Evita valores mínimos/maximos extremos que puedan romper el diseño.
- No mezcles `clamp()` con valores hardcodeados que anulan su propósito.

## Conclusión

`clamp()` es una herramienta poderosa que simplifica el CSS responsivo. Permite crear experiencias fluidas y profesionales sin media queries excesivas.

**Tus próximos pasos:**
1. Identifica propiedades que podrían beneficiarse de valores fluidos en tu proyecto.
2. Reemplaza media queries simples de tamaño con `clamp()`.
3. Experimenta con fórmulas como `calc(algo + algo)` dentro de `clamp()`.

¿Ya usas `clamp()` en tus proyectos? Comparte tu experiencia en los comentarios.

