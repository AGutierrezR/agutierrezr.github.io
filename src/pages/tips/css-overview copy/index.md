---
layout: "../../../layouts/BlogLayout.astro"
title: CSS Overview
date: 2023-09-11
draft: false
tags: [devtools]
---

## Introducción

Usar la funcionalidad de CSS Overview en el DevTools da un gran entendimiento de nuestro código CSS. Esta información puede ayudarnos a mantener una mejor consistencia, y a su vez, detectar problemas con muchas variantes de colores y tipos de fuente.

## Como usar el CSS Overview

1. Accedemos a la sección de CSS Overview: Presionando `cmd + shift + p` y buscando "CSS Overview" (o "Información general del CSS" si esta en español)
2. Hacemos click en "Capture Overview" (o "Información general de la captura") para obtener los resultados y estadísticas sobre nuestro código CSS.
3. Examinamos el overview, aquí podremos ver informaciones útiles tales como el número de elementos, los tipos de elementos, la lista de colores que se usaron, su frecuencia y más detalles.

## Investigar los colores

Si hacemos click sobre un color podremos ver los elementos que lo usan, y si hacemos click solo un elemento nos mostrará su posición en la pestaña de elementos.

## Identificar problemas de contraste

Esta funcionalidad detecta problemas de contraste entre el fondo y la letra.

## Media Queries

Este panel es capaz de mostrarnos todas los media queries declarados. Si existen demasiadas variantes, es posible que queramos considerar consolidarlos para hacer el CSS más mantenible.

## Información sobre fuentes

Al igual que en el panel de Media Queries, si existen muchas variantes de tamaños de letras en una página nos indica que hay un code smell. Esto nos podría indicar que debemos usar menos tamaños y estilos para promover coherencia. Implementar un sistema de diseño puede ayudarnos a lograr este objetivo.
