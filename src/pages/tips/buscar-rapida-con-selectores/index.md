---
layout: "../../../layouts/BlogLayout.astro"
title: Búsqueda Rápida con Selectores de CSS
date: 2023-09-11
draft: false
tags: devtools
---

## Introducción

En el panel de Elements, podemos hacer búsquedas rápidas de elementos en el DOM usando Selectores de CSS. Por ejemplo:

- `a[href]` - Encuentra todos los elementos `` que tengan el atributo `[href]`
- `li a` - Encuentra todos los `` que son descendientes de elementos `li`.

## Para usar esta funcionalidad

Para buscar elementos en el DOM con selectores CSS, utilizamos el atajo: `cmd + f` en MacOs o `ctrl + f` si estamos en Windows o Linux.

Esto abrirá una barra de búsqueda donde puedes escribir selectores CSS, si vamos a usar un único elemento para la búsqueda se recomendó agregar un `` al final. 

En vez de `a` colocamos `` ya que el selector simple nos hará búsqueda de texto en vez de elemento.

## Personaliza la experiencia

Si te molesta que al escribir, la búsqueda se haga automática y veas el panel saltar de arriba a bajo. Puedes ir a las preferencias del DevTools y en la sección Global deshabilitar la casilla de "Search as you typo" (o "Buscar mientras escribes").

## Notas

Esta funcionalidad también nos sirve para hacer pruebas con los selectores, pudiendo hacer debugging de estos y ver si apuntan a donde queremos exactamente. Además si lo combinamos con las **Alteraciones de estado de un elemento** tales como `:hover`, `:active`, etc., podemos sacar más provecho.