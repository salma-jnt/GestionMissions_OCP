package com.ocp.missions.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ocp.missions.model.Mission;
import com.ocp.missions.repository.MissionRepository;
import com.ocp.missions.service.MissionService;

@Service
public class MissionServiceImpl implements MissionService {

    private final MissionRepository repo;

    public MissionServiceImpl(MissionRepository repo) {
        this.repo = repo;
    }

    @Override
    public List<Mission> getAll() {
        return repo.findAll();
    }

    @Override
    public Mission getById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    @Override
    public Mission save(Mission mission) {
        return repo.save(mission);
    }

    @Override
    public Mission update(Long id, Mission mission) {
        Mission m = repo.findById(id).orElseThrow();
        m.setTitre(mission.getTitre());
        m.setDescription(mission.getDescription());
        m.setLieu(mission.getLieu());
        m.setStatut(mission.getStatut());
        m.setLatitude(mission.getLatitude());
        m.setLongitude(mission.getLongitude());
        m.setDateDebut(mission.getDateDebut());
        m.setDateFin(mission.getDateFin());
        return repo.save(m);
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
