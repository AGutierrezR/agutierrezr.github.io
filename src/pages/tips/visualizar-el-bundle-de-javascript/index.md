---
layout: "../../../layouts/BlogLayout.astro"
title: Visualiza el bundle de JavaScript
date: 2023-09-07
draft: false
tags: devtools
---

## Introducción

El Treemap de Lighthouse puede proporcionar una representación gráfica de tus paquetes de JavaScript. Este feature es compatible con sourcemaps y te ayuda a comprender los módulos de JavaScript utilizados por tu página web.

## Para probar esto en un sitio web:

1. Desde el Panel de Lighthouse en DevTools, ejecuta un perfil de Perfomance.
2. En el perfil de Lighthouse resultante, haz clic en "View Treemap".
3. Explora las diversas partes que componen tu bundle. También puedes resaltar código no utilizados y explorar en el código que utiliza sourcemaps.

## ¿Qué sigue?

Excelente trabajo al ver el Treemap de Lighthouse. A partir de aquí, puedes:

- Seleccionar paquetes específicos en los que deseas profundizar.
- Navegar entre diferentes archivos dentro de esos paquetes diferentes.
- Resaltar los bytes no utilizados dentro de los paquetes.
- Ver estadísticas detalladas de cobertura en la zona de cobertura ubicada cerca del final de la página.

## Sourcemaps

Con la ayuda de sourcemaps, la visualización puede mostrar tus `node_modules` originales. Explorar archivos dentro de `node_modules` es algo que uso genial para mantener nuestros paquetes a un tamaño razonable. La visualización resalta scripts de terceros que consumen una cantidad significativa de bytes.

## Compatibilidad con navegadores

Esta característica funciona en las versiones estables de Chrome y Edge.
