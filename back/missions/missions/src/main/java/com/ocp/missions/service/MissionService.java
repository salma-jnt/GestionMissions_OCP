package com.ocp.missions.service;

import java.util.List;

import com.ocp.missions.model.Mission;

public interface MissionService {

    List<Mission> getAll();

    Mission getById(Long id);

    Mission save(Mission mission);

    Mission update(Long id, Mission mission);

    void delete(Long id);
}
