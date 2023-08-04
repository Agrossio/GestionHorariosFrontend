import { Component, OnInit } from '@angular/core';
import { ClientData } from 'src/app/models/Response/ClientResponse';
import { ClientsService } from 'src/app/services/clients.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertsService } from '../../services/alerts.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
})
export class ClientListComponent implements OnInit {
  selectedUserIndex: number = -1;
  clientSelected: ClientData | null = null;
  view: string = 'Detalles';
  filterClient = '';
  closeResult = '';
  clientForm: FormGroup = new FormGroup({});
  modalTitle: String = '';
  modalButtonText: String = '';
  clients: ClientData[] = [];
  arrayClientsOriginal: ClientData[] = [];
  clientInDetail: ClientData | null = null;
  showLoader: boolean = true;
  currentDate: number = new Date().getFullYear();
  projectsClient!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private modalService: NgbModal,
    private alertService: AlertsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      business_name: ['', [Validators.required, Validators.maxLength(45)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(45)],
      ],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      initial_date: ['', [Validators.required]],
    });

    this.clientsService.getAllClients().subscribe({
      next: (resp) => {
        this.clients = resp.data;
        this.arrayClientsOriginal = resp.data;
        this.showLoader = false;
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

  openClientDetail(clientId: number) {
    this.clientsService.getClientById(clientId).subscribe({
      next: (resp) => {
        this.clientInDetail = resp.data;
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

  // -------------- MODAL -----------------------
  setModalTexts(modalTitle: String, modalButtonText: String) {
    this.modalTitle = modalTitle;
    this.modalButtonText = modalButtonText;
    if (modalButtonText != 'Crear') {
      const datePipe = new DatePipe('en-US');
      this.clientForm.patchValue({
        business_name: this.clientInDetail?.business_name,
        email: this.clientInDetail?.email,
        initial_date: datePipe.transform(
          this.clientInDetail?.initial_date,
          'yyyy-MM-dd'
        ),
        address: this.clientInDetail?.address,
      });
    } else {
      this.clientForm.reset();
    }
  }

  open(content: any) {
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

  createClient() {
    const newClient = {
      business_name: this.clientForm.value.business_name,
      email: this.clientForm.value.email,
      initial_date: new Date(this.clientForm.value.initial_date),
      address: this.clientForm.value.address,
    };

    this.clientsService.addClient(newClient).subscribe({
      next: (resp) => {
        if (resp != null) {
          this.alertService
            .alert('success', 'El Cliente se creo correctamente', false)
            .then((result) => {
              if (result.isConfirmed) {
                this.modalService.dismissAll();
              }
            });
        }
        this.clientForm.reset();
        this.clientInDetail = <ClientData>resp.data;
        this.clients.push(<ClientData>resp.data);
      },
      error: (error) => {
        if (
          error.error.message.includes("Initial date can't be in the future")
        ) {
          this.alertService.alert(
            'error',
            'La fecha no puede ser a futuro',
            false
          );
        } else if (error.status == 403) {
          this.modalService.dismissAll();
          this.alertService.tokenTimeOut();
        } else {
          this.alertService.alert(
            'error',
            'Razón Social/mail ya estan en la BD',
            false
          );
        }
      },
    });
  }

  modifyClient() {
    const datePipe = new DatePipe('en-US');

    const updatedClient: any = {
      client_id: this.clientInDetail!.client_id,
      business_name: this.clientForm.value.business_name,
      initial_date: datePipe.transform(
        this.clientForm.value.initial_date,
        'yyyy-MM-dd'
      ),
      address: this.clientForm.value.address,
      email: this.clientForm.value.email,
      projects: this.clientInDetail!.projects,
    };

    if (JSON.stringify(updatedClient) === JSON.stringify(this.clientInDetail)) {
      this.alertService.alert(
        'error',
        'Cliente no actualizado: debe modificar al menos un dato.',
        false
      );
      return;
    }

    this.clientsService
      .updateClient(this.clientInDetail!.client_id, updatedClient)
      .subscribe({
        next: (resp) => {
          if (resp != null) {
            this.alertService
              .alert('success', 'El Cliente se modifico correctamente', false)
              .then((result) => {
                if (result.isConfirmed) {
                  this.modalService.dismissAll();
                }
              });
          }
          this.clientForm.reset();
          this.clientInDetail = <ClientData>resp.data;
          let newArray = this.clients!.filter(
            (client) => client.client_id != this.clientInDetail!.client_id
          );
          newArray.push(this.clientInDetail);
          this.clients = newArray;
        },
        error: (err) => {
          if (err.status == 409) {
            this.alertService.alert(
              'error',
              'Razón Social/mail ya estan en la BD',
              false
            );
          } else if (err.status == 403) {
            this.modalService.dismissAll();
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
  deleteClient(clientId: number) {
    this.alertService
      .alert('question', 'Desea eliminar el cliente?', true)
      .then((result) => {
        if (result.isConfirmed) {
          this.clientsService.deleteClient(clientId).subscribe({
            next: (resp) => {
              this.alertService.alert('success', 'Cliente eliminado', false);
              this.router.navigate(['/clients']);
            },
            error: (err) => {
              if (err.status == 403) {
                this.modalService.dismissAll();
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
      });
  }
  validateYear(id: string, name: string) {
    const input: HTMLInputElement = document.getElementById(
      id
    ) as HTMLInputElement;
    const selectedDate: string = input.value;
    const parts: string[] = selectedDate.split('-');
    const year: number = parseInt(parts[0]);
    const initialDateControl: AbstractControl<any, any> | null =
      this.clientForm.get(name);

    if (initialDateControl) {
      if (year.toString().length !== 4) {
        initialDateControl.setErrors({ invalidYear: true });
      } else {
        initialDateControl.setErrors(null);
      }
    }
  }
}
