# Explorer App con React — Yonatan Chicas

Proyecto desarrollado con **React 18, TypeScript, Vite y Tailwind CSS v4**. Utiliza los tres países de demostración de clase: El Salvador, Japan y Canada, con datos y banderas locales.


## Cómo ejecutar

Necesita **Node.js 22.12 o 24** y **pnpm**. Si no tiene pnpm, instálelo una vez con `npm install -g pnpm@11.25.0`.

1. En GitHub, seleccione **Code → Download ZIP** y extraiga el archivo.
2. Abra una terminal en la carpeta extraída, donde está `package.json`, y ejecute:

```bash
pnpm install
pnpm run dev
```

3. Abra la dirección que aparece en la terminal, normalmente **http://127.0.0.1:5174/**. Mantenga la terminal abierta mientras utiliza la aplicación.

## Qué incluye

Búsqueda inmediata por nombre, filtro por región combinado, mensaje sin resultados y menú móvil. Las tarjetas muestran bandera, nombre, población, región y capital, con respaldo para los datos ausentes. El diseño admite cuatro tarjetas por fila en escritorio y se adapta a móvil; la muestra de clase contiene tres países.

Para comprobar los filtros, busque `can` y elija América: aparece Canada. Cambie a Asia: aparece el mensaje sin resultados. Pulse «Restablecer filtros» para recuperar los tres países. «Ver más» abre una ficha del país; puede cerrarla con «Cerrar», Escape o pulsando el fondo.

## Organización

- **Átomos:** `Flag`, `Badge`, `Button`, `Icon` y `CountryFact`.
- **Moléculas:** `CountryCard`, `SearchBar`, `RegionFilter`, `Navigation` y `EmptyState`.
- **Organismos:** `Header`, `CountryGrid` y `CountryDetails`.

`CountryGrid` recibe `countries: Country[]` y `onSelect: (code: string) => void`. Crea las tarjetas con `map()`, utiliza el código del país como `key` y pasa cada país y el callback a `CountryCard`, que utiliza `Flag` y `Badge`.

`App.tsx` mantiene `query`, `region`, `isMenuOpen` y el código seleccionado. `Header` muestra `children` y transmite los valores y callbacks a los controles hijos. Los datos de clase están en `src/data/countries-demo.ts`, los tipos en `src/types/` y las utilidades en `src/utils/`.

## Captura

![Explorer App en escritorio](./captura.jpg)

## Comprobaciones

```bash
pnpm run lint
pnpm run build
```

`build` comprueba TypeScript y genera `dist/`. `.gitignore` excluye `node_modules` y `dist`.

## Entrega

- [Rama de entrega: entrega-s24-s27](https://github.com/YonatanC31/explorer-react/tree/entrega-s24-s27).


