package com.ocp.missions.controller;

import com.ocp.missions.model.Vehicule;
import com.ocp.missions.repository.VehiculeRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicules")
@CrossOrigin(origins = "http://localhost:5173")
public class VehiculeController {

    private final VehiculeRepository vehiculeRepository;

    public VehiculeController(VehiculeRepository vehiculeRepository) {
        this.vehiculeRepository = vehiculeRepository;
    }

    @GetMapping
    public List<Vehicule> getAll() {
        return vehiculeRepository.findAll();
    }

    @PostMapping
    public Vehicule create(@RequestBody Vehicule v) {
        return vehiculeRepository.save(v);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        vehiculeRepository.deleteById(id);
    }

    @PutMapping("/{id}")
    public Vehicule update(@PathVariable Long id, @RequestBody Vehicule updated) {
        Vehicule vehicule = vehiculeRepository.findById(id).orElseThrow();
        vehicule.setMatricule(updated.getMatricule());
        vehicule.setType(updated.getType());
        vehicule.setMarque(updated.getMarque());
        vehicule.setActif(updated.isActif());
        return vehiculeRepository.save(vehicule);
    }
}
