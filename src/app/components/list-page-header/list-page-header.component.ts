import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateEditProjectModalComponent } from '../create-edit-project-modal/create-edit-project-modal.component';

@Component({
  selector: 'app-list-page-header',
  templateUrl: './list-page-header.component.html',
  styleUrls: ['./list-page-header.component.css'],
})
export class ListPageHeaderComponent {
  @Input() headerTitle: string = '';
  @Input() headerParagraph: string = '';
  @Input() headerButtonText: string = '';
  @Input() modalTitle: string = '';
  @Input() modalButtonText: string = '';
  @Input() rolAdmin: boolean = false;
  @Input() projects: any;
  constructor(private modalService: NgbModal) {}

  openModal() {
    const modalRef = this.modalService.open(CreateEditProjectModalComponent);
    modalRef.componentInstance.modalTitle = this.modalTitle;
    modalRef.componentInstance.modalButtonText = this.modalButtonText;
    modalRef.componentInstance.projects = this.projects;
    modalRef.componentInstance.modalClosed.subscribe();
  }
}
