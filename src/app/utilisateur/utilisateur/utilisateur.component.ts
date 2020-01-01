import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UtilisateurService } from 'src/app/services/utilisateur.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  public types = [ 'Email', 'Last Name'];
    public email: string;
    public lastName: string;
    public displayType: string = 'id';
    public headsTab = ['PRENOM', 'NOM', 'LOGIN', 'ADDRESS'];
    public aucunResultat: boolean = true;
    public isFormSubmitted: boolean = false;
    public actionButton: string = 'Créer';
    public titleSaveOrUpdate: string = 'Ajout d\'un nouvel utilisateur';
    public messageModal: string;
    public displayMessageModal: boolean = false;
    
    public utilisateur = new Utilisateur();
    public utilisateursArray: Utilisateur[] = [];
    
  constructor(private userService: UtilisateurService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  
 
 /**
  * pour sauvegarder un user
  * @param addUserForm
  */
 saveOrUpdateUtilisateur(addUtilisateurForm: NgForm){
      this.displayMessageModal = false;
      if(!addUtilisateurForm.valid){
        this.buildMessageModal('Erreur dans le formulaire utilisateur');
      }
      if(this.actionButton && this.actionButton === 'Save'){
          this.saveNewCustomer(this.utilisateur);
      }else if(this.actionButton && this.actionButton === 'Update'){
          this.updateCustomer(this.utilisateur);
      }
      this.titleSaveOrUpdate = 'Formulaire d\'ajout d\'un utilisateur';
      this.actionButton = 'Save';
  }
  
 /**
  * Save new utilisateur
  * @param utilisateur
  */
  saveNewCustomer(utilisateur: Utilisateur){
      this.spinner.show();
      this.userService.saveUtilisateur(utilisateur).subscribe(
              (result: Utilisateur) => {
                 if(result.id){
                     this.spinner.hide();
                     this.buildMessageModal('Utilisateur correctement sauvegardé');
                 }
              },
              error => {
                  this.spinner.hide();
                  this.buildMessageModal('Erreur lors de la sauvegarde de l\'utilisateur');
              }
      );
  }
  
  /**
   * Update an existing utilisateur
   * @param utilisateur
   */
   updateCustomer(utilisateur: Utilisateur){
       this.spinner.show();
       this.userService.updateUtilisateur(utilisateur).subscribe(
               (result: Utilisateur) => {
                  if(result.id){
                      this.updateResearchCustomerTab(utilisateur);
                      this.spinner.hide();
                      this.buildMessageModal('Utilisateur correctement mis à jour');
                  }
               },
               error => {
                this.spinner.hide();
                this.buildMessageModal('Erreur lors de la mise à jour de l\'utilisateur');
               }
       );
   }

   /**
    * Update in the list tab, the utilisateur that has been updated
    * @param utilisateur 
    */
   updateResearchCustomerTab(utilisateur: Utilisateur){
        let index : number = 0; 
        if(this.utilisateursArray && this.utilisateursArray.length > 0){
            this.utilisateursArray.forEach(user => {
                if(user.id == utilisateur.id){
                    this.utilisateursArray.splice(index, 1, utilisateur);
            
                }
                index++;
            });
        }
   }
   
   /**
    * Delete an existing utilisateur
    * @param utilisateur
    */
    deleteCustomer(utilisateur: Utilisateur){
        this.spinner.show();
        this.displayMessageModal = false;
        this.userService.deleteUtilisateur(utilisateur).subscribe(
                result => {
                    for( var i = 0; i < this.utilisateursArray.length; i++){ 
                        if ( this.utilisateursArray[i].id === utilisateur.id) {
                            this.utilisateursArray.splice(i, 1); 
                        }
                    }
                    this.spinner.hide();
                    this.buildMessageModal('Utilisateur supprimé');
                    if(this.utilisateursArray.length == 0){
                        this.aucunResultat = true;
                    }
                });
    }
  
  /**
   * Set the selected utilisateur as the utilisateur to be updated
   * @param utilisateur
   */
   setUpdateCustomer(utilisateur: Utilisateur){
       this.titleSaveOrUpdate = 'Mise à jour de l\'utilisateur';
       this.actionButton = 'Update';
       this.utilisateur = Object.assign({}, utilisateur);
   }
   
 /**
  * effacer les données du formulaire 
  * @param addUtilisateurForm
  */
  clearForm(addUtilisateurForm: NgForm){
    addUtilisateurForm.form.reset(); 
      this.displayMessageModal = false;
  }
  
 /**
  * Search customers by title or by isbn
  * @param searchUtilisateurForm
  */
  searchUsersBy(searchUtilisateurForm: NgForm){
      this.spinner.show();
      this.displayMessageModal = false;
      if(!searchUtilisateurForm.valid){
        this.buildMessageModal('Erreur dans le formulaire');
      }
      if(this.displayType === 'id'){
          this.utilisateursArray = [];
          this.userService.searchUtilisateurById(1).subscribe(
                  result => {
                      if(result && result != null){
                          this.utilisateursArray.push(result);
                          this.aucunResultat = false;
                          this.spinner.hide();
                          return;
                       }
                       this.aucunResultat = true;
                       this.spinner.hide();
                  },
                  error => {
                      this.spinner.hide();
                      this.buildMessageModal('Erreur dans la recherche d\'un utilisateur par critere');
                  }
          );
      } 
      this.isFormSubmitted = searchUtilisateurForm.submitted;
  }

    /**
   * Construit le message à afficher suite à une action utilisateur.
   * @param msg 
   */
  buildMessageModal(msg: string){
    this.messageModal = msg;
    this.displayMessageModal = true;
  }


}
