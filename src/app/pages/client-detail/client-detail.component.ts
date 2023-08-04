import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientsService} from "../../services/clients.service";
import {ClientData} from "../../models/Response/ClientResponse";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AlertsService} from "../../services/alerts.service";

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit{

  clientId!: number;
  clientInDetail: ClientData | undefined;

  constructor(private clientsService: ClientsService,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertsService,
              private router: Router) { }

  ngOnInit(): void {
      this.activatedRoute.params.subscribe(params => {
      this.clientId = params['client-id'];
      this.clientsService.getClientById(this.clientId).subscribe({
        next: (resp)=>{
        this.clientInDetail = resp.data;
        },
        error: (err) => {
          this.alertService.alert('error', 'Hubo un problema al procesar la solicitud', false)
        }
      })
    })
  }

  deleteClient(clientId: number) {
    this.alertService.alert('question', 'Desea eliminar el cliente?', true)
      .then((result) => {
        if (result.isConfirmed) {
          this.clientsService.deleteClient(clientId).subscribe({
            next: (resp) => {
              this.alertService.alert('success', 'Cliente eliminado', false)
              this.router.navigate(['/clients'])
            },
            error: (err) => {
              this.alertService.alert('error', 'Hubo un problema al procesar la solicitud', false)
            }
          })
        }
      })
  }
}
