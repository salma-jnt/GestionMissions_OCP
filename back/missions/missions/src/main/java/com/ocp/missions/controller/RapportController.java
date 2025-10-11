package com.ocp.missions.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ocp.missions.service.RapportPdfService;

@RestController
@RequestMapping("/api/rapports")
@CrossOrigin(origins = "http://localhost:5173") // à adapter si besoin
public class RapportController {

    private final RapportPdfService pdfService;

    public RapportController(RapportPdfService pdfService) {
        this.pdfService = pdfService;
    }

    @GetMapping("/mission/{id}")
    public ResponseEntity<byte[]> getRapportMission(@PathVariable Long id) {
        try {
            byte[] pdfBytes = pdfService.generateMissionPdf(id);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=rapport_mission_" + id + ".pdf")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(("Erreur lors de la génération du PDF : " + e.getMessage()).getBytes());
        }
    }
}
