import { useState } from 'react';

interface FlagProps {
  src?: string | null;
  countryName: string;
}

export function Flag({ src, countryName }: FlagProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  const source = src?.trim() || '';

  return (
    <div className="flag-frame">
      {!source || failedSource === source
        ? <span className="flag-placeholder">Bandera no disponible</span>
        : <img key={source} src={`${import.meta.env.BASE_URL}${source}`} alt={`Bandera de ${countryName}`} width="240" height="140" onError={() => setFailedSource(source)} />}
    </div>
  );
}
