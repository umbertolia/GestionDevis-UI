import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utilisateur } from '../models/utilisateur';

@Injectable({
    providedIn: 'root'
})
export class UtilisateurService {

    constructor(private http: HttpClient) { }

    /**
     * Search Users
     */
    searchUtilisateurs(): Observable<Utilisateur[]> {
        return this.http.get<Utilisateur[]>('/gestiondevis/users/');
    }

    /**
    * Search Users from gerant
    */
    searchClientsFromGerant(idGerant: number): Observable<Utilisateur[]> {
        return this.http.get<Utilisateur[]>('/gestiondevis/gerant/' + idGerant);
    }

    /**
    * Search User by id
    */
    searchUtilisateurById(id: number): Observable<Utilisateur> {
        return this.http.get<Utilisateur>('/gestiondevis/users/' + id);
    }

    /**
     * Save a new User object in the Backend server data base.
     * @param utilisateur
     */
    saveUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
        return this.http.post<Utilisateur>('/gestiondevis/users/users', utilisateur);
    }

    /**
     * Update an existing User object in the Backend server data base.
     * @param utilisateur
     */
    updateUtilisateur(utilisateur: Utilisateur): Observable<Utilisateur> {
        return this.http.put<Utilisateur>('/gestiondevis/users/users' + utilisateur.id, utilisateur);
    }

    /**
     * Delete an existing User object in the Backend server data base.
     * @param utilisateur
     */
    deleteUtilisateur(utilisateur: Utilisateur): Observable<string> {
        return this.http.delete<string>('/gestiondevis/users/' + utilisateur.id);
    }


}
