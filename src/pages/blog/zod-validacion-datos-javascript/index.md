---
layout: "../../../layouts/BlogLayout.astro"
title: 'Zod: cómo validar datos en JavaScript y TypeScript (guía práctica)'
date: 2026-04-09
description: Aprende a validar datos en JavaScript y TypeScript con Zod. Evita errores en runtime validando APIs, formularios y configs con ejemplos prácticos.
draft: false
tags: [zod, javascript, typescript]
---

Imagina este escenario: Tu aplicación recibe datos de una API externa, los procesa y luego falla en producción porque el campo `email` llegó como `null`, o el campo `price` llegó como string en lugar de número, rompiendo los cálculos.

**Este es el problema más común en JavaScript:** no tenemos forma de garantizar que los datos que reciben nuestras funciones sean correctos. TypeScript nos ayuda en desarrollo, pero en runtime los tipos desaparecen.

Ahí entra **[Zod](https://zod.dev)**: una librería de validación runtime que te permite definir esquemas y validar que tus datos tengan la estructura esperada — sin escribir código defensivo manualmente.

En esta publicación aprenderás:
- Qué es Zod y por qué deberías usarlo
- Cómo definir esquemas de validación
- Casos de uso prácticos: APIs, formularios, configuraciones
- Comparación con Joi para validar respuestas de APIs

---

## ¿Qué es Zod?

Zod es una librería de validación diseñada para JavaScript y TypeScript. Te permite definir esquemas para validar cualquier tipo de dato: objetos, strings, números, arrays, y más.

Características principales:
- **Cero dependencias**: Ligera y eficiente
- **API intuitiva**: Métodos que se encadenan naturalmente
- **validación síncrona y asíncrona**: Soporta ambos modos

---

## Cómo validar datos en JavaScript con Zod

La función principal de Zod es validar que tus datos tengan la estructura esperada:

```javascript
import { z } from 'zod';

// Definir un esquema para validar usuarios
const userSchema = z.object({
  name: z.string().min(3).max(50),
  age: z.number().int().positive(),
  email: z.string().email(),
});

// Datos válidos
const validUser = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
};

// Validar usando safeParse
const result = userSchema.safeParse(validUser);

if (result.success) {
  console.log('Usuario válido:', result.data);
} else {
  console.error('Errores:', result.error.issues);
}
```

**Métodos comunes:**
- `z.string()` - Valida que sea un string
- `z.number()` - Valida que sea un número
- `z.boolean()` - Valida que sea un booleano
- `z.array()` - Valida que sea un array
- `z.object()` - Valida que sea un objeto

### Validadores de String

```javascript
const stringSchema = z.string()
  .min(3, 'Mínimo 3 caracteres')
  .max(50, 'Máximo 50 caracteres')
  .trim() // elimina espacios antes y después
  .email('Email inválido')

stringSchema.parse('  test@example.com  '); // 'test@example.com'
```

### Validadores de Número

```javascript
const numberSchema = z.number()
  .int('Debe ser entero')
  .positive('Debe ser positivo')
  .min(0, 'Mínimo 0')
  .max(100, 'Máximo 100');

numberSchema.parse(25); // ✓
numberSchema.parse(-5); // ✗ Error
```

### Validadores Personalizados

Zod permite crear validadores personalizados con `.refine()`:

```javascript
const passwordSchema = z.string().min(8).refine(
  (password) => /[A-Z]/.test(password),
  { message: 'Debe contener al menos una mayúscula' }
).refine(
  (password) => /[0-9]/.test(password),
  { message: 'Debe contener al menos un número' }
);

passwordSchema.parse('cG18sZwfdd') // ✓
passwordSchema.parse('mah9hx9khy') // ✗ Error
```

---

## Manejo de errores en Zod

Cuando la validación falla, Zod proporciona errores detallados:

```javascript
const userSchema = z.object({
  name: z.string().min(3),
  age: z.number().min(18, 'Debes tener al menos 18 años'),
  email: z.string().email(),
});

const invalidData = {
  name: 'Jo', // Muy corto
  age: 16,   // Menor de 18
  email: 'correo-invalido', // No es email
};

const result = userSchema.safeParse(invalidData);

if (!result.success) {
  console.error('Errores de validación:');
  result.error.issues.forEach(err => {
    console.log(`  - ${err.path.join('.')}: ${err.message}`);
  });
}

// Salida
// Errores de validación:
//   - name: Too small: expected string to have >=3 characters
//   - age: Debes tener al menos 18 años
//   - email: Invalid email address
```


<aside class="highlight">

💡 **Sobre `ZodError`:**

La instancia de `$ZodError` contiene un array `.issues`. Cada uno de estos contiene un `message`

</aside>

---

## Casos de uso reales de Zod

### Validación de Respuestas de API

Uno de los usos más importantes de Zod es validar datos externos. Cuando consumes una API, nunca puedes asumir que los datos tienen la forma esperada.

Zod te permite validar esa respuesta antes de usarla, evitando errores difíciles de depurar en producción.

```javascript
import { z } from 'zod';

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    zipcode: z.string(),
  }),
});

async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();
  
  // Valida array de usuarios
  const result = z.array(userSchema).safeParse(data);
  
  if (result.success) {
    return result.data;
  }
  
  throw new Error('Formato de respuesta inválido: ' + 
    result.error.issues[0].message);
}

// Usar en tu código
fetchUsers()
  .then(users => console.log(users[0].name))
  .catch(err => console.error(err.message));
```

### Validación de Datos de Formulario

Zod es excelente para validar datos enviados desde un formulario:

```javascript
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Debes ser mayor de edad'),
  interests: z.array(z.string()).min(1, 'Selecciona al menos un interés'),
});

function validateFormData(formData) {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    age: parseInt(formData.get('age'), 10),
    interests: formData.getAll('interests'),
  };
  
  const result = formSchema.safeParse(data);
  
  if (!result.success) {
    return { 
      valid: false, 
      errors: result.error.issues.map(e => e.message) 
    };
  }
  
  return { valid: true, data: result.data };
}

// Ejemplo de uso con FormData del navegador
// Para simular que los datos vienen de un formulario
const formData = new FormData();
formData.append('name', 'Juan');
formData.append('email', 'juan@example.com');
formData.append('age', '25');
formData.append('interests', 'javascript');
formData.append('interests', 'nodejs');

const result = validateFormData(formData);
console.log(result);
// { valid: true, data: { name: 'Juan', email: 'juan@example.com', age: 25, interests: ['javascript', 'nodejs'] } }
```

### Validación de Datos de Entrada

Añade una capa extra de validación a funciones que procesan datos:

```javascript
import { z } from 'zod';

const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
});

function createUser(data) {
  const result = createUserSchema.safeParse(data);
  
  if (!result.success) {
    throw new Error('Datos inválidos: ' + 
      result.error.issues.map(e => e.message).join(', '));
  }
  
  const user = result.data;
  // Lógica para crear usuario...
  return user;
}

// Uso
try {
  createUser({ name: 'John', email: 'john@example.com', role: 'admin' });
} catch (err) {
  console.error(err.message);
}
```

### Reutilización de Esquemas

Componer esquemas más complejos:

```javascript
import { z } from 'zod';

// Esquema base reutilizable
const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipcode: z.string(),
  country: z.string().default('México'), // Valor por defecto
});

// Usar en otro esquema
const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  billingAddress: addressSchema,
  shippingAddress: addressSchema.optional(),
});

// También puedes hacer arrays
const usersArraySchema = z.array(userSchema);

const validUser = {
  id: 1,
  name: 'Juan Pérez',
  email: 'juan@example.com',
  billingAddress: {
    street: 'Av. Principal 123',
    city: 'Ciudad de México',
    zipcode: '06000',
  },
};

const validData = [validUser];

const result = usersArraySchema.safeParse(validData);
console.log('Valid:', result.success);
```

### Transformación de Datos

Zod permite transformar datos después de validarlos:

```javascript
import { z } from 'zod';

const userInputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthYear: z.number(),
}).transform((data) => ({
  ...data,
  fullName: `${data.firstName} ${data.lastName}`,
  initials: `${data.firstName[0]}${data.lastName[0]}`.toUpperCase(),
}));

const result = userInputSchema.parse({
  firstName: 'Juan',
  lastName: 'Pérez',
  birthYear: 1990,
});

console.log(result)

// Salida:
// {
//   firstName: 'Juan',
//   lastName: 'Pérez',
//   birthYear: 1990,
//   fullName: 'Juan Pérez',
//   initials: 'JP'
// }
```

---

## Conclusión

Zod resuelve un problema fundamental en JavaScript: la falta de validación runtime. Con Zod, puedes definir esquemas una vez y usarlos en toda tu aplicación.

Las ventajas principales:
1. **Código limpio**: API intuitiva y legible
2. **Múltiples casos de uso**: APIs, formularios, configs, archivos
3. **Comunidad activa**: Buena documentación y soporte

---

## FAQ

### ¿Qué es Zod en JavaScript?

Zod es una librería para validar datos en runtime usando esquemas definidos en código.

### ¿Zod reemplaza a TypeScript?

No. Zod complementa a TypeScript validando datos en runtime.

### ¿Cuándo usar Zod?

Cuando trabajas con datos externos como APIs, formularios o archivos de configuración.

---

## Recursos

- [zod+js+jsdoc.js](https://gist.github.com/pmuellr/60668d33049f96ce7323f5eab648f468) 

