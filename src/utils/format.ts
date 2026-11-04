import type { Country } from '../types/country';

export function formatPopulation(population: number | null | undefined): string {
  return typeof population === 'number' && Number.isFinite(population) && population >= 0
    ? new Intl.NumberFormat('es-SV').format(population)
    : 'No disponible';
}

export function getCapital(country: Country): string {
  return country.capitals?.map((capital) => capital.name.trim()).filter(Boolean).join(', ') || 'No disponible';
}
