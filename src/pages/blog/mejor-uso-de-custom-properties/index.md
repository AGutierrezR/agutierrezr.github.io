---
layout: "../../../layouts/BlogLayout.astro"
title: Mejor uso de CSS Custom Properties
date: 2023-10-14
description: 
draft: false
tags: [css, tips]
---

Las Custom Properties de CSS aparecieron en el 2012, y no fue hasta el 2017 que tuvieron soporte en los navegadores, pero en su momento no les encontré tantos casos de uso para poder sustituir algo como las variables de Sass o para aplicarlas en el CSS de un proyecto pequeño. Pero no fue hasta 2020 que empecé a darles uso (aunque sea primitivo) para ir familiarizándome con ellas, y la verdad, ahora veo muchos casos de uso.

Las custom properties ayudan a mantener nuestro CSS más DRY en esos momentos en los que queremos crear varias "instancias" de un componente que tendrá distintos estilos. Para esto (sin usar custom properties), normalmente usamos CSS bastante específico para cada instancia usando un namespace al estilo BEM con su modificador.

## Comencemos

Usaré el ejemplo expuesto en este video [Using CSS custom properties like this is a waste](https://www.youtube.com/watch?v=_2LwjfYc1x8) y basándome en el componente que expone. La idea final es obtener este resultado:

![](./assets/final.png)

¡Comencemos! Tenemos este componente Plan:

```html
<div class="plan">
  <svg class="plan__icon"> ... </svg>
  <div>
    <h2 class="plan__title">...</h2>
    <p>...</p>
  </div>
  <p class="plan__price">...<span>/...</span></p>
  <button class="button">...</button>
</div>
```

Creamos los estilos base de este en CSS

```css
.plan {
  position: relative;
  display: grid;
  justify-content: start;
  gap: 1rem;
  background: var(--clr-white);
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 
		0 0 1rem rgb(0 0 0 / 0.122), 
		-1rem -1rem 0 0 rgb(0 0 0 / 0.122);
}

.plan__icon {
  width: 2.5rem;
}

.plan__title {
  font-size: var(--fs-500);
  font-weight: var(--fw-bold);
}

.plan__price {
  font-size: var(--fs-600);
  font-weight: var(--fw-black);
}

.plan__price span {
  font-size: var(--fs-300);
  font-weight: var(--fw-regular);
}

.plan > .button:last-child {
  margin-block-start: 2rem;
}
```

Esto nos da como resultado algo como esto:

![](./assets/base.png)

Puedes ver esta base en [Codepen](https://codepen.io/AgutierrezR/pen/wvRbWwy):

Ahora si creamos variantes de estos tres componentes, lo haríamos así:

```css
.plan--pram {
  box-shadow: 
		0 0 1rem rgb(0 0 0 / 0.122),
		-1rem -1rem 0 0 var(--clr-yellow-300);
}

.plan--pram .plan__icon {
  fill: var(--clr-yellow-400);
}

.plan--pram .button:hover,
.plan--pram .button:focus {
  background-color: var(--clr-yellow-400);
}

.plan--bike {
  box-shadow: 
		0 0 1rem rgb(0 0 0 / 0.122), 
		-1rem -1rem 0 0 var(--clr-cyan-300);
}

.plan--bike .plan__icon {
  fill: var(--clr-cyan-400);
}

.plan--bike .button:hover,
.plan--bike .button:focus {
  background-color: var(--clr-cyan-400);
}

.plan--rocket {
  box-shadow: 
		0 0 1rem rgb(0 0 0 / 0.122), 
		-1rem -1rem 0 0 var(--clr-purple-300);
}

.plan--rocket .plan__icon {
  fill: var(--clr-purple-400);
}

.plan--rocket .button:hover,
.plan--rocket .button:focus {
  background-color: var(--clr-purple-400);
}
```

Como podemos ver, hemos creado varios estilos usando el namespace del modificador que necesitamos, esto ha agregado 44 líneas de código repetido y este resultado:

![](./assets/final.png)

Para visualizar el código pulsa [aquí](https://codepen.io/AgutierrezR/pen/LYMoZLx):

## Ahora si usemos custom properties

Lo primero que tenemos que hacer es regresar a la versión inicial de este proceso y analizar cuáles son los factores que cambian entre instancias. Hasta ahora sabemos que cambia el color de la sombra, el color del icono y el color del botón al hacer hover o focus.

Teniendo esto en cuenta, podemos agregar variables "privadas" al componente `.plan`

```css
.plan {
  --_shadow: var(--shadow, rgb(0 0 0 / 0.122));
  --_icon: var(--icon, --clr-text);
  --_button-hover: var(--button-hover, var(--clr-text));
	/* ... */
}
```

Aquí hemos creado variables "privadas" siguiendo el estilo que recomienda Lea Verou en este post [Custom properties with defaults: 3+1 strategies](https://lea.verou.me/blog/2021/10/custom-properties-with-defaults/). Hay que tener en cuenta que las variables `--shadow`, `--icon` y `--button-hover` no están declaradas en el proyecto, por lo que se tomará el segundo valor en la función `var()`.

Ahora vamos a colocar las variables "privadas" en las secciones del componente que sean necesarias

```diff
.plan {
+  --_shadow: var(--shadow, rgb(0 0 0 / 0.122));
+  --_icon: var(--icon, --clr-text);
+  --_button-hover: var(--button-hover, var(--clr-text));

  position: relative;
  display: grid;
  justify-content: start;
  gap: 1rem;
  background: var(--clr-white);
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 
		0 0 1rem rgb(0 0 0 / 0.122), 
+	  -1rem -1rem 0 0 var(--_shadow);
}

.plan__icon {
  width: 2.5rem;
+  fill: var(--_icon);
}

/* ... */

+.plan .button:hover,
+.plan .button:focus {
+  background-color: var(--_button-hover);
+}
```

Esto no cambiará nada a nivel base, todo seguirá estando igual.

![](./assets/base.png)

Para verlo en Codepen [aquí](https://codepen.io/AgutierrezR/pen/VwqOjyz?editors=0100):

Ahora veamos el código de las variantes

```css
.plan--pram {
  --button-hover: var(--clr-yellow-400);
  --shadow: var(--clr-yellow-300);
  --icon: var(--clr-yellow-400);
}

.plan--bike {
  --shadow: var(--clr-cyan-300);
  --icon: var(--clr-cyan-400);
  --button-hover: var(--clr-cyan-400);
}

.plan--rocket {
  --shadow: var(--clr-purple-300);
  --icon: var(--clr-purple-400);
  --button-hover: var(--clr-purple-400);
}
```

Y listo.

![](./assets/final.png)

En [Codepen](https://codepen.io/AgutierrezR/pen/eYbazMN):

Con esto tenemos un código más ligero y más fácil de entender. No tenemos que sobreescribir propiedades y las modificaciones las estamos haciendo desde el namespace sin tener que referenciar a los elementos internos directamente.
