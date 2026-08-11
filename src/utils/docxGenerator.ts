export function downloadDocxFile(title: string, filename: string, contentMarkdown: string) {
  // Format clean text content with header and footer
  const fullContent = `================================================================================
AGROLEARN - FICHE ET RESOURCE COMPLÉMENTAIRE DE COURS
Titre: ${title}
================================================================================

${contentMarkdown}

--------------------------------------------------------------------------------
AgroLearn Platform © 2026 - Plateforme Numérique d'Apprentissage Agropastoral.
  `;

  const blob = new Blob([fullContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.docx') ? filename : `${filename}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
