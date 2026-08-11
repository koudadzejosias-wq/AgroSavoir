import { jsPDF } from 'jspdf';
import { DomainData } from '../types';

export function generateCertificatePDF(
  domain: DomainData,
  learnerName: string,
  certificateId: string,
  issueDate: string
) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const width = doc.internal.pageSize.getWidth(); // ~297 mm
  const height = doc.internal.pageSize.getHeight(); // ~210 mm

  // Background gradient fill simulation
  doc.setFillColor(252, 253, 250);
  doc.rect(0, 0, width, height, 'F');

  // Decorative Outer Double Border (Emerald Green & Gold)
  doc.setLineWidth(2);
  doc.setDrawColor(16, 185, 129); // Emerald
  doc.rect(8, 8, width - 16, height - 16);

  doc.setLineWidth(0.8);
  doc.setDrawColor(217, 119, 6); // Amber Gold
  doc.rect(11, 11, width - 22, height - 22);

  // Corner Ornaments
  const drawCorner = (x: number, y: number) => {
    doc.setFillColor(16, 185, 129);
    doc.circle(x, y, 3, 'F');
  };
  drawCorner(15, 15);
  drawCorner(width - 15, 15);
  drawCorner(15, height - 15);
  drawCorner(width - 15, height - 15);

  // Header Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(16, 185, 129);
  doc.text('AGROSAVOIR', width / 2, 32, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(100, 116, 139);
  doc.text("Plateforme Nationale d'Apprentissage Agropastoral - Togo", width / 2, 39, { align: 'center' });

  // Certificate Main Header
  doc.setFont('serif', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(30, 41, 59);
  doc.text('CERTIFICAT DE SPÉCIALISATION', width / 2, 55, { align: 'center' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(12);
  doc.setTextColor(71, 85, 105);
  doc.text('Ce présent certificat est officiellement décerné à :', width / 2, 67, { align: 'center' });

  // Learner Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(15, 23, 42);
  doc.text(learnerName.toUpperCase(), width / 2, 82, { align: 'center' });

  // Underline for name
  doc.setLineWidth(0.5);
  doc.setDrawColor(16, 185, 129);
  doc.line(width / 2 - 50, 85, width / 2 + 50, 85);

  // Recognition text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(51, 65, 85);
  doc.text(
    `Pour avoir accompli avec succès 100% du programme de formation continue et validé les évaluations de :`,
    width / 2,
    97,
    { align: 'center' }
  );

  // Specialization Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(16, 185, 129);
  doc.text(`« ${domain.certificateTitle} »`, width / 2, 110, { align: 'center' });

  // Domain details subtext
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(
    `Filière : ${domain.title} | Maîtrise des modules théoriques, fiches techniques et cas pratiques.`,
    width / 2,
    118,
    { align: 'center' }
  );

  // Gold Seal / Stamp Simulation
  const sealX = width / 2;
  const sealY = 145;
  doc.setFillColor(245, 158, 11); // Gold fill
  doc.circle(sealX, sealY, 14, 'F');
  doc.setLineWidth(1);
  doc.setDrawColor(217, 119, 6);
  doc.circle(sealX, sealY, 12, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('OFFICIEL', sealX, sealY - 2, { align: 'center' });
  doc.text('AGROSAVOIR', sealX, sealY + 3, { align: 'center' });

  // QR Code Box Simulation
  const qrX = 28;
  const qrY = 142;
  doc.setFillColor(255, 255, 255);
  doc.rect(qrX, qrY, 26, 26, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.rect(qrX, qrY, 26, 26, 'S');

  // Simulated QR Pattern
  doc.setFillColor(15, 23, 42);
  doc.rect(qrX + 2, qrY + 2, 7, 7, 'F');
  doc.rect(qrX + 17, qrY + 2, 7, 7, 'F');
  doc.rect(qrX + 2, qrY + 17, 7, 7, 'F');
  doc.rect(qrX + 11, qrY + 11, 4, 4, 'F');
  doc.rect(qrX + 17, qrY + 17, 5, 5, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Scannez pour vérifier', qrX + 13, qrY + 30, { align: 'center' });
  doc.text(`ID: ${certificateId}`, qrX + 13, qrY + 33, { align: 'center' });

  // Date and Signatures
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text(`Délivré le : ${issueDate}`, 250, 145, { align: 'right' });

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text("Le Comité Pédagogique AgroSavoir Togo", 250, 152, { align: 'right' });

  // Simulated Signature Line
  doc.setFont('serif', 'bolditalic');
  doc.setFontSize(14);
  doc.setTextColor(16, 185, 129);
  doc.text('J. Koudadze', 250, 162, { align: 'right' });
  doc.setLineWidth(0.5);
  doc.setDrawColor(148, 163, 184);
  doc.line(200, 165, 260, 165);

  // Footer Verification Note
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    `Authenticité vérifiable en ligne sur la plateforme AgroSavoir - ID: ${certificateId}`,
    width / 2,
    195,
    { align: 'center' }
  );

  // Trigger Download
  doc.save(`Certificat_AgroSavoir_${domain.id}_${certificateId}.pdf`);
}

export function generateResourcePDF(title: string, filename: string, contentMarkdown: string) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const width = doc.internal.pageSize.getWidth();

  // Header Banner
  doc.setFillColor(16, 185, 129);
  doc.rect(0, 0, width, 25, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text('AGROSAVOIR - RESSOURCE OFFICIELLE', 15, 16);

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 41, 59);
  doc.text(title, 15, 36);

  doc.setLineWidth(0.5);
  doc.setDrawColor(226, 232, 240);
  doc.line(15, 40, width - 15, 40);

  // Content Body
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);

  const lines = doc.splitTextToSize(contentMarkdown.replace(/[#*`]/g, ''), width - 30);
  doc.text(lines, 15, 48);

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('AgroSavoir Togo © 2026 - Document réservé à l\'apprentissage agropastoral.', 15, 285);

  doc.save(filename);
}
