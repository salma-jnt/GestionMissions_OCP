package com.ocp.missions.dto;

public class AffectationDTO {

    private Long missionId;
    private String missionTitre;

    private Long collaborateurId;
    private String collaborateurNom;

    private Long vehiculeId;
    private String vehiculeMatricule;

    // ✅ Constructeurs
    public AffectationDTO() {
    }

    public AffectationDTO(Long missionId, String missionTitre,
            Long collaborateurId, String collaborateurNom,
            Long vehiculeId, String vehiculeMatricule) {
        this.missionId = missionId;
        this.missionTitre = missionTitre;
        this.collaborateurId = collaborateurId;
        this.collaborateurNom = collaborateurNom;
        this.vehiculeId = vehiculeId;
        this.vehiculeMatricule = vehiculeMatricule;
    }

    // ✅ Getters et Setters
    public Long getMissionId() {
        return missionId;
    }

    public void setMissionId(Long missionId) {
        this.missionId = missionId;
    }

    public String getMissionTitre() {
        return missionTitre;
    }

    public void setMissionTitre(String missionTitre) {
        this.missionTitre = missionTitre;
    }

    public Long getCollaborateurId() {
        return collaborateurId;
    }

    public void setCollaborateurId(Long collaborateurId) {
        this.collaborateurId = collaborateurId;
    }

    public String getCollaborateurNom() {
        return collaborateurNom;
    }

    public void setCollaborateurNom(String collaborateurNom) {
        this.collaborateurNom = collaborateurNom;
    }

    public Long getVehiculeId() {
        return vehiculeId;
    }

    public void setVehiculeId(Long vehiculeId) {
        this.vehiculeId = vehiculeId;
    }

    public String getVehiculeMatricule() {
        return vehiculeMatricule;
    }

    public void setVehiculeMatricule(String vehiculeMatricule) {
        this.vehiculeMatricule = vehiculeMatricule;
    }
}
