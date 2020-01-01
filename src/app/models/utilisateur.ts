import { Role } from './role';

export class Utilisateur {
    
    id: number;
    
    nom: string;
    
    prenom: string;
    
    login: string;
    
    password: string;
    
    roles: Role[];
}
