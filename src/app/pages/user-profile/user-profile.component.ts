import { Component, OnInit } from '@angular/core';
import { ProjectsMockService } from 'src/app/services/moks/projects-mock.service';
import { DataService } from 'src/app/services/data.service';
import { PersonData } from 'src/app/models/Response/PersonResponse';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchOtherValidator } from './match-other-validator';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../services/alerts.service';
import { PersonRequest } from '../../models/Request/PersonRequest';
import { PasswordRequest } from '../../models/Request/PasswordRequest';
import { PassData } from '../../models/Response/PasswordResponse';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  passwordVisible = false;
  passwordVisible2 = false;
  passwordVisible3 = false;
  showProyectsList: boolean = true;
  dataUser!: PersonData;
  dataPass!: PassData;
  passForm: FormGroup = new FormGroup({});
  userForm: FormGroup = new FormGroup({});
  closeResult = '';
  projectsUser!: any[];
  showLoader: boolean = true;

  constructor(
    private service: DataService,
    private projectsMock: ProjectsMockService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private alertService: AlertsService
  ) {}

  ngOnInit() {
    this.projectsUser = this.projectsMock.getProjectsClientUser();

    if (sessionStorage.getItem('email') != null) {
      this.service.getByEmail(sessionStorage.getItem('email')).subscribe({
        next: (user) => {
          this.dataUser = user.data as PersonData;
          this.showLoader = false;
        },
        error: (err) => {
          this.alertService.alert(
            'error',
            'Hubo un problema al procesar la solicitud',
            false
          );
        },
      });
    }

    if (sessionStorage.getItem('roles')?.includes('ADMIN')) {
      this.showProyectsList = false;
    }

    // form edit password
    this.passForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$'
          ),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, matchOtherValidator('newPassword')],
      ],
    });

    // form edit user
    this.userForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.maxLength(45)]],
      apellido: ['', [Validators.required, Validators.maxLength(45)]],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email, Validators.maxLength(45)],
      ],
      cuilCuit: ['', [Validators.required, Validators.maxLength(15)]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  // open modal
  open(content: any) {
    this.userForm.patchValue({
      nombre: this.dataUser?.name,
      apellido: this.dataUser?.lastname,
      email: this.dataUser?.email,
      cuilCuit: this.dataUser?.cuil,
      telefono: this.dataUser?.tel,
    });

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  editData() {
    let updateUser: PersonRequest = {
      name: this.userForm.value.nombre,
      lastname: this.userForm.value.apellido,
      email: this.userForm.value.email,
      cuil: this.userForm.value.cuilCuit,
      tel: this.userForm.value.telefono,
      hours_journal: 5, //debemos cambiar en el back que este dato no sea necesario.
      image: this.dataUser.image,
      password: 'Masterpass123',
    };

    this.service.updatePerson(this.dataUser?.email, updateUser).subscribe({
      next: (res) => {
        this.dataUser = res.data as PersonData;
        this.alertService
          .alert('success', 'Usuario actualizado correctamente', false)
          .then((result) => {
            if (result.isConfirmed) {
              this.modalService.dismissAll();
            }
          });
      },
      error: (err) => {
        if (err.status == 403) {
          this.alertService.tokenTimeOut();
        } else {
          this.alertService.alert(
            'error',
            'Hubo un problema al procesar la solicitud',
            false
          );
        }
      },
    });
  }

  editPass() {
    let updatePass: PasswordRequest = {
      oldPassword: this.passForm.value.oldPassword,
      newPassword: this.passForm.value.newPassword,
    };

    this.service.updatePassword(this.dataUser.email, updatePass).subscribe({
      next: (res) => {
        this.alertService
          .alert('success', 'Contraseña actualizada correctamente', false)
          .then((result) => {
            if (result.isConfirmed) {
              this.modalService.dismissAll();
            }
            this.passForm.reset();
          });
      },
      error: (err) => {
        if (err.status == 403) {
          this.alertService.tokenTimeOut();
        } else {
          this.alertService.alert(
            'error',
            'Hubo un problema al procesar la solicitud',
            false
          );
        }
      },
    });
  }
}
