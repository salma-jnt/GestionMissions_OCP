package com.ocp.missions.service;

import com.itextpdf.html2pdf.HtmlConverter;
import com.ocp.missions.model.Mission;
import com.ocp.missions.repository.MissionRepository;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class RapportPdfService {

    private final MissionRepository missionRepository;

    public RapportPdfService(MissionRepository missionRepository) {
        this.missionRepository = missionRepository;
    }

    public byte[] generateMissionPdf(Long missionId) throws Exception {
        Mission mission = missionRepository.findById(missionId)
                .orElseThrow(() -> new RuntimeException("Mission non trouvée"));

        String html = """
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; }
                h1 { color: #2c3e50; text-align: center; }
                table { width: 100%%; border-collapse: collapse; margin-top: 20px; }
                th, td { padding: 8px; border: 1px solid #ccc; }
                th { background-color: #f2f2f2; }
              </style>
            </head>
            <body>
              <h1>Rapport de Mission</h1>
              <table>
                <tr><th>Titre</th><td>%s</td></tr>
                <tr><th>Description</th><td>%s</td></tr>
                <tr><th>Lieu</th><td>%s</td></tr>
                <tr><th>Statut</th><td>%s</td></tr>
                <tr><th>Date Début</th><td>%s</td></tr>
                <tr><th>Date Fin</th><td>%s</td></tr>
                <tr><th>Collaborateur</th><td>%s</td></tr>
                <tr><th>Véhicule</th><td>%s</td></tr>
              </table>
            </body>
            </html>
            """.formatted(
                mission.getTitre(),
                mission.getDescription(),
                mission.getLieu(),
                mission.getStatut(),
                mission.getDateDebut() != null ? mission.getDateDebut().toString() : "—",
                mission.getDateFin() != null ? mission.getDateFin().toString() : "—",
                mission.getCollaborateur() != null ? mission.getCollaborateur().getNom() : "Non affecté",
                mission.getVehicule() != null ? mission.getVehicule().getMatricule() : "Non affecté"
        );

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        HtmlConverter.convertToPdf(html, outputStream);
        return outputStream.toByteArray();
    }
}
