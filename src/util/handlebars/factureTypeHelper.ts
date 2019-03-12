enum types {"proforma" = "Pro-forma", "acompte" = "Acompte", "intermediaire" = "Intermédiaire", "solde" = "Solde"}

export function typeToName (label: any) {
  return types[label];
}