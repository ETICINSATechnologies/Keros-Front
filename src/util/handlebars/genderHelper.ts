enum genders {"H" = "Homme", "F" = "Femme", "A" = "Autre", "I" = "Inconnu"}

export function labelToName(label: any) {
  return genders[label];
}
