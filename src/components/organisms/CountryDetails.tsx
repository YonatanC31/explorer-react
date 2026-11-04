import { useEffect, useRef } from 'react';
import type { JSX } from 'react';
import type { Country } from '../../types/country';
import { formatPopulation, getCapital } from '../../utils/format';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { CountryFact } from '../atoms/CountryFact';
import { Flag } from '../atoms/Flag';

interface CountryDetailsProps {
  country: Country;
  onClose: () => void;
}

export function CountryDetails({ country, onClose }: CountryDetailsProps): JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    return () => {
      dialog?.close();
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return (
    <dialog ref={dialogRef} className="country-details" aria-labelledby="country-details-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="country-details-content">
        <div className="country-details-heading">
          <h2 id="country-details-title">{country.names.common}</h2>
          <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        </div>
        <Flag src={country.flag?.url_svg} countryName={country.names.common} />
        <dl>
          <CountryFact label="Código" value={country.codes.alpha_2} />
          <CountryFact label="Población" value={formatPopulation(country.population)} />
          <CountryFact label="Región" value={<Badge region={country.region} />} />
          <CountryFact label="Capital" value={getCapital(country)} />
        </dl>
      </div>
    </dialog>
  );
}
