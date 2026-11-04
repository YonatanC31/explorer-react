# Detalles técnicos y comprobaciones

## Atomic Design

```text
src/
  components/
    atoms/
      Badge.tsx          Presenta la región recibida.
      Flag.tsx           Presenta la bandera y su respaldo.
      Button.tsx         Botones reutilizables.
      Icon.tsx           Iconos de la interfaz.
      CountryFact.tsx    Etiqueta y valor de un dato.
    molecules/
      CountryCard.tsx    Compone Flag, Badge y los datos del país.
      SearchBar.tsx      Búsqueda controlada con onQueryChange.
      RegionFilter.tsx   Región controlada con onRegionChange.
      Navigation.tsx     Enlaces del menú.
      EmptyState.tsx     Mensaje y acción para restablecer filtros.
    organisms/
      Header.tsx         Título, children, navegación y controles.
      CountryGrid.tsx    Listado de tarjetas generado con map().
  data/countries-demo.ts Los tres registros locales de clase.
  data/regions.ts        Valores exactos y nombres visibles del selector.
  types/country.ts      Interfaces del contrato de países.
  utils/filter.ts       Búsqueda y región combinadas.
  utils/format.ts       Formato de población y capital.
  App.tsx               Estado compartido y callbacks del padre.
  main.tsx              Montaje de React e import de index.css.
  index.css             Tailwind v4, tokens y estilos adaptables.
```

### CountryGrid y CountryCard

`CountryGrid` recibe `countries: Country[]` y `onSelect: (code: string) => void`. Recorre el arreglo con `map()`, entrega cada objeto a `CountryCard` mediante `country` y transmite el mismo callback `onSelect`. Utiliza `country.codes.alpha_2` como `key` estable y única.

`CountryCard` declara una interfaz de props y compone `Flag`, `Badge`, nombre, población y capital. El botón «Ver más» llama a `onSelect(country.codes.alpha_2)`. En esta etapa `handleSelect`, definido en `App`, muestra `SV`, `JP` o `CA` en la consola; no navega a una página de detalle.

Al añadir otro objeto con un código único al arreglo recibido por `CountryGrid`, aparece otra tarjeta sin modificar el componente.

## Estado, children y controles de S27

`App.tsx` conserva `query`, `region` e `isMenuOpen` mediante `useState`. Los resultados y su cantidad se calculan a partir de los registros originales; no se guarda otra copia del arreglo filtrado en estado.

```text
App (query y setQuery)
  → Header (query y onQueryChange)
    → SearchBar (value={query} y onChange tipado)
      → onQueryChange(texto) → setQuery en App

App (region y setRegion)
  → Header (region y onRegionChange)
    → RegionFilter (value={region} y onChange tipado)
      → onRegionChange(valor) → setRegion en App
```

`Header` recibe un título y `children: ReactNode`. App coloca entre `<Header>...</Header>` el párrafo «Consulte sus datos y encuentre países por nombre o región». Header lo muestra y transmite los valores y callbacks a los controles. No guarda una copia local de los filtros.

El menú sigue el mismo principio: `Header` recibe `isMenuOpen`, `onMenuToggle` y `onMenuClose`; el estado permanece en App. Puede cerrarse con su botón, al seleccionar un enlace o con Escape desde la navegación.

La búsqueda es inmediata, no distingue mayúsculas ni espacios exteriores y siempre se combina con la región. Borrar el texto conserva la región; elegir «Todas las regiones» conserva el texto. «Limpiar filtros» y «Restablecer filtros» reinician ambos valores.

## Datos de clase

Los objetos `elSalvador`, `japon` y `canada`, y el arreglo `countriesDemo`, siguen el [repositorio de referencia facilitado en el material](https://github.com/Kcruz080492/explorer-react/blob/main/src/data/countries-demo.ts). Se mantienen los nombres en inglés, los códigos `SV`, `JP`, `CA`, las poblaciones y las capitales de esa muestra. Por eso debe buscar `Japan` para encontrar el registro japonés.

La interfaz conserva `names.common`, `codes.alpha_2`, `flag.url_svg`, `population`, `region` y `capitals`. Las banderas se incluyen en `public/flags/` y solo sus rutas se adaptan para servirlas localmente. La licencia de los datos se conserva en `public/data/LICENSE.txt`. No se realiza ninguna petición `fetch` ni se requiere una clave.

`names` y `codes` son obligatorios para identificar cada tarjeta. Los metadatos `flag`, `population`, `region` y `capitals` contemplan propiedades omitidas y valores `null`, sin recurrir a `any`. Cuando faltan, se muestra «No disponible» o «Bandera no disponible». Las cadenas con solo espacios también se consideran vacías; una población de cero se conserva. Si una bandera falla y después el componente recibe otra ruta, intenta mostrar la nueva imagen.

## Verificación de S25–S27

| Búsqueda | Región | Resultado esperado |
| --- | --- | --- |
| Vacía | Todas | El Salvador, Japan y Canada: 3 países. |
| `SAL` | Todas | El Salvador: 1 país. |
| Vacía | América (`Americas`) | El Salvador y Canada: 2 países. |
| Vacía | Asia | Japan: 1 país. |
| `can` | América | Canada: 1 país. |
| `can` | Asia | Mensaje sin coincidencias: 0 países. |
| Vacía | Europa | Mensaje sin coincidencias: 0 países. |
| Limpiar filtros | Todas | Se recuperan los 3 países. |

Compruebe también «Ver más» en la consola, la navegación con teclado y el menú móvil. El grid tiene cuatro columnas desde 1120 px y una en móvil; con los tres registros de clase queda una posición libre en escritorio. No se añade un cuarto país ajeno a la muestra. El modo oscuro responde automáticamente a la preferencia del sistema, sin interruptor adicional.

Las **27 pruebas** verifican esos casos, el flujo de callbacks, `children`, los códigos de selección, los metadatos ausentes o `null`, el respaldo de banderas y la reutilización del grid al añadir otro país. También comprueban que el mensaje vacío desaparezca al corregir la región y que se conserve la búsqueda. `vitest.config.ts` limita las pruebas al código de este proyecto. Ejecute `pnpm run lint`, `pnpm test` y `pnpm run build` antes de guardar cambios; revise después `git diff` y utilice Conventional Commits.

### Comprobación de la rúbrica React

| Criterio | Evidencia en el proyecto |
| --- | --- |
| Atomic Design | `atoms`, `molecules` y `organisms`; CountryCard compone Flag y Badge; CountryGrid genera las tarjetas con `map()` y códigos únicos. |
| Props e interfaces de TypeScript | `Country` representa los datos utilizados y sus posibles ausencias. Las props, los eventos y los callbacks tienen tipos explícitos. |
| Estado y comunicación | App conserva `query`, `region` e `isMenuOpen`. Header transmite valores y callbacks a SearchBar y RegionFilter; también muestra `children`. |
| Búsqueda y región | Se combinan sobre los registros originales, actualizan inmediatamente, conservan el otro control y muestran un mensaje sin coincidencias. |
| Tarjetas y menú adaptables | Cuatro columnas en pantallas amplias y distribución ajustada en móvil. El menú puede abrirse y cerrarse con el botón, los enlaces o Escape. |
| Evidencia y documentación | Se incluyen README, capturas, guion e instrucciones de ejecución. Debe grabar y adjuntar el video de 3 a 5 minutos para completar la evidencia de entrega. |
