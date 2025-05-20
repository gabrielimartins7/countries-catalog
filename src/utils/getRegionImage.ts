export const getRegionImage = (region: string): string => {
  const normalized = region.toLowerCase();

  if (normalized.includes('europe')) return '/assets/europe.png';
  if (normalized.includes('africa')) return '/assets/africa.png';
  if (normalized.includes('asia')) return '/assets/asia.png';
  if (normalized.includes('america')) {
    if (normalized.includes('south')) return '/assets/south-america.png';
    if (normalized.includes('north')) return '/assets/north-america.png';
    return '/assets/america.png';
  }
  if (normalized.includes('oceania')) return '/assets/oceania.png';
  if (normalized.includes('antarctica')) return '/assets/oceania.png';
  return '/assets/default.png';
};
