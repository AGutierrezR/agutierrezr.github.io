---
layout: "../../../layouts/BlogLayout.astro"
title: Cómo tener tipos en JavaScript sin TypeScript usando Zod y JSDoc
date: 2026-04-10
description: Aprende cómo tener tipos en JavaScript sin TypeScript usando Zod y JSDoc. Valida datos en runtime y obtén autocompletado sin configuración.
draft: false
tags: [javascript, zod, jsdoc, types, typescript]
---

Los tipos en JavaScript pueden parecer un lujo innecesario, pero cuando trabajas en proyectos personales o prototipos rápidos, tener algo de verificación puede ahorrarte horas de depuración.

Durante años, TypeScript ha sido la solución por excelencia para proyectos más grandes. Pero si eres como yo y prefieres mantener las cosas simples en proyectos pequeños, la configuración adicional se siente excesiva. Además, el código termina siendo tan diferente de JavaScript "puro" que no puedes simplemente copiarlo y pegarlo en el navegador.

¿Qué tal si te dijera que puedes tener lo mejor de ambos mundos? Tipos en tu editor, verificación en tiempo de ejecución, y todo funcionando en JavaScript puro sin compilar ni transpilar nada.

En esta publicación, exploraremos cómo usar Zod con JSDoc para lograr exactamente eso. Ya seas un desarrollador que busca una solución más ligera o alguien que quiere verificar sus tipos sin complicarse con la configuración de TypeScript, encontrarás perspectivas prácticas aquí.

## Cómo usar JSDoc para tipos en JavaScript

Cuando quiero type hints para proyectos pequeños y/o personales, uso JSDoc, que me permite declarar tipos desde comentarios de JavaScript, además se puede compartir entre archivos.

 ```javascript
 // file: file-1.js
 /**
  * @typedef Candy
  * @property {string} name
  * @property {"chocolate"|"gummy"} type
  */

 // file: file-2.js
 /** @type { import('./file-1').Candy[] } */
 const candy = [
   { name: "Kit Kat", type: "chocolate" },
   { name: "Peach Rings", type: "gummy" },
 ];
 ```

Lo mejor de todo esto es que no necesitas configurar absolutamente nada. Y además, las sugerencias de tipo en el editor de texto aparecen automáticamente. Escribes `.` después de un objeto y boom — el autocompletado te muestra todas las propiedades disponibles.

Pero hay un detalle importante: JSDoc solo te da sugerencias en el editor. No hay verificación real de tipos en tiempo de ejecución. Puedes escribir código que rompa y el editor no te advertirá.

Para obtener esa verificación, puedes agregar `@ts-check` al principio de tu archivo:

```javascript
// @ts-check
/** @type { import('./file-1').Candy } */
const candy = { name: "Kit Kat", type: "menta" }; // Error: "menta" no es válido
```

Ahora el editor te mostrará errores de tipo directamente en el archivo con esas líneas rojas que tanto nos gustan.

## Validación de datos en runtime con Zod

Aquí es donde las cosas se ponen interesantes. JSDoc es genial para el editor, pero solo funciona ahí. En el navegador, tu código se ejecuta sin ninguna verificación. Los errores de tipo los descubres cuando algo falla en producción.

Zod es una librería que te permite definir esquemas de validación y usarlos en tiempo de ejecución. Lo que lo hace especial es que puedes inferir el tipo de TypeScript directamente desde el esquema:

 ```typescript
import z from "zod";

const CandySchema = z.object({
  name: z.string(),
  type: z.enum(["chocolate", "gummy"]),
});

// Extrae el tipo para TypeScript automáticamente
type Candy = z.infer<typeof CandySchema>;
```

Ahora tienes dos cosas valiosas:
1. Un esquema que puedes usar para validar datos en runtime
2. Un tipo de TypeScript que puedes usar en tu código

El problema es que esto solo funciona en archivos `.ts` (TypeScript). Si estás usando JavaScript puro, no puedes usar `z.infer` de la misma manera.

## Cómo combinar Zod y JSDoc para tipado en JavaScript

Aquí está el truco que hace todo esto posible: puedes inferir tipos de Zod directamente en tus comentarios JSDoc.

Funciona así:

```javascript
import z from "zod";

// Declara tu esquema con Zod
const CandySchema = z.object({
  name: z.string(),
  type: z.enum(["chocolate", "gummy"]),
});

// Extrae el tipo inference como un tipo JSDoc
/** @typedef { z.infer<typeof CandySchema> Candy } */
```

Espera, ¿qué? Sí, es posible. El truco está en usar `z.infer<typeof ...>` directamente en el `@typedef` de JSDoc.

Ahora tienes lo mejor de ambos mundos:
 - Un esquema de Zod que puedes usar para validar datos en runtime
 - Un tipo que puedes usar en cualquier archivo JavaScript con JSDoc

Aquí tienes un ejemplo completo:

```javascript
import z from "zod";

// file: file-1.js
const CandySchema = z.object({
  name: z.string(),
  type: z.enum(["chocolate", "gummy"]),
});

/** @typedef { z.infer<typeof CandySchema> Candy } */

// file: file-2.js
/** @type { import('./file-1').Candy[] } */
const candy = [
  { name: "Kit Kat", type: "chocolate" },
  { name: "Peach Rings", type: "gummy" },
];
```

Agrega un `@ts-check` al principio y tendrás verificación de errores en tiempo de edición, sin necesidad de archivos `.ts`.

## Ejemplo del Mundo Real

Ahora que entiendes la técnica, veamos cómo aplicarla en un caso real. Imagina que estás construyendo un generador de sitios estáticos (SSG) donde recibes datos de algún origen y necesitas asegurarte de que los datos tienen la forma correcta.

Con esta aproximación, puedes:

1. Definir tus esquemas con Zod en archivos JavaScript
2. Validar los datos en tiempo de build
3. Obtener sugerencias de tipo en tu editor mientras programas

```javascript
import z from "zod";

// schemas/post.js
const PostSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  content: z.string(),
  publishDate: z.string().datetime(),
  tags: z.array(z.string()),
});
/** @typedef { z.infer<typeof PostSchema> Post } */

// validation/validate-post.js
function validatePost(data) {
  const result = PostSchema.safeParse(data);
  if (!result.success) {
    console.error("Error de validación:", result.error);
    throw new Error("Datos del post inválidos");
  }
  return result.data;
}
```

Mientras programas tu generador, el editor te mostrará sugerencias para cada propiedad del post. Y cuando ejecutes el build, Zod validará que los datos realmente tienen la forma esperada.

## Mejores Prácticas y Recomendaciones

### Buenas prácticas

- **Usar Zod para datos externos**: Cuando recibes datos de una API o archivo externo, Zod te ayuda a validar que los datos tienen la forma esperada
- **Mantener los esquemas en archivos dedicados**: Esto facilita importarlos en múltiples lugares
- **Agregar `@ts-check` en archivos clave**: Para obtener verificación extra en tiempo de edición

### Buenas prácticas

- **No re-escribir tipos**: Una vez que defines el esquema con Zod, úsalo para inferir el tipo JSDoc. No necesitas declarar el tipo dos veces
- **No obsesionarse con la validación en runtime para todo**: Úsala en puntos críticos como entradas externas, no para cada pequeña función
- **No usar esto en lugar de TypeScript para proyectos grandes**: Esta técnica es perfecta para proyectos pequeños o prototipos, pero para proyectos grandes, TypeScript sigue siendo la mejor opción

## Lecturas Adicionales

- [Documentación oficial de Zod](https://zod.dev/)
- [JSDoc supported types - TypeScript](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
- [Gist original de pmuellr que inspiró esta técnica](https://gist.github.com/pmuellr/60668d33049f96ce7323f5eab648f468)

## Conclusión

Esta aproximación no es para todos los proyectos. Para aplicaciones grandes y equipos distribuidos, TypeScript con su verificación estática sigue siendo la mejor opción. Pero para proyectos personales, prototipos rápidos, o cuando simplemente quieres algo más ligero, combinar Zod con JSDoc te da:

- Verificación de tipos en runtime cuando ejecutas tu código
- Sugerencias en el editor mientras trabajas
- Errores visibles marcados en rojo mientras escribes

Y todo eso sin necesidad de compilar, transpilar, o configurar nada. Solo JavaScript puro que puedes copiar y pegar directamente en el navegador.

Lo que más me gusta de esta técnica es que es "suficiente para ayudarme a ser productivo sin requerir que configure y mantenga herramientas TypeScript con el tiempo." Para proyectos donde quiero moverme rápido pero no quiero sacrificar completamente la seguridad de tipos, esto es lo ideal.

