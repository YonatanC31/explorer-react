import { describe, expect, it } from 'vitest';
import { countriesDemo, elSalvador } from '../data/countries-demo';
import { filterCountries, normalizeText } from './filter';
import { formatPopulation, getCapital } from './format';

describe('datos, filtros y formato', () => {
  it('mantiene los tres registros y códigos únicos del material de clase', () => {
    expect(countriesDemo.map((country) => country.names.common)).toEqual(['El Salvador', 'Japan', 'Canada']);
    expect(countriesDemo.map((country) => country.codes.alpha_2)).toEqual(['SV', 'JP', 'CA']);
    expect(new Set(countriesDemo.map((country) => country.codes.alpha_2)).size).toBe(3);
  });
  it('filtra desde la colección original sin modificarla', () => {
    const original = JSON.stringify(countriesDemo);
    expect(filterCountries(countriesDemo, 'can', 'Americas').map((country) => country.codes.alpha_2)).toEqual(['CA']);
    expect(filterCountries(countriesDemo, 'can', 'Asia')).toEqual([]);
    expect(JSON.stringify(countriesDemo)).toBe(original);
  });
  it('normaliza espacios, mayúsculas y acentos', () => {
    expect(normalizeText('  SALVÁDOR ')).toBe('salvador');
    expect(filterCountries(countriesDemo, 'SAL', '')).toEqual([elSalvador]);
  });
  it('formatea población y capital sin perder el cero', () => {
    expect(formatPopulation(6029976)).toBe('6,029,976');
    expect(formatPopulation(0)).toBe('0');
    expect(getCapital(elSalvador)).toBe('San Salvador');
    expect(getCapital({ ...elSalvador, capitals: [] })).toBe('No disponible');
  });

  it('contempla poblaciones ausentes o inválidas y capitales vacías', () => {
    for (const population of [undefined, null, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      expect(formatPopulation(population)).toBe('No disponible');
    }
    expect(getCapital({ names: elSalvador.names, codes: elSalvador.codes })).toBe('No disponible');
    expect(getCapital({ ...elSalvador, capitals: null })).toBe('No disponible');
    expect(getCapital({ ...elSalvador, capitals: [{ name: ' ' }] })).toBe('No disponible');
    expect(getCapital({ ...elSalvador, capitals: [{ name: ' San Salvador ' }, { name: ' ' }] })).toBe('San Salvador');
  });

  it('busca registros con metadatos ausentes sin confundirlos con otra región', () => {
    const country = { names: elSalvador.names, codes: elSalvador.codes };
    expect(filterCountries([country], 'SAL', '')).toEqual([country]);
    expect(filterCountries([country], 'SAL', 'Americas')).toEqual([]);
  });
});
