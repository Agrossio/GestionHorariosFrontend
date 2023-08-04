import { Injectable } from '@angular/core';
import { ProjectData } from '../models/Response/ProjectResponse';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import * as pdfMake from 'pdfmake/build/pdfmake';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  imageForPdf: any = '';

  constructor() {
    this.getBase64ImageFromURL('/assets/images/clock.png').then(
      (res) => (this.imageForPdf = res)
    );
  }

  createPDF(
    projectSelected: ProjectData,
    graphAsImage: any,
    dataPercentages: number[]
  ) {
    const {
      business_name,
      description,
      end_estimate_date,
      hour_price,
      hours_estimate,
      name,
      stack,
      people,
    } = projectSelected;
    const today = new Date();
    const todayFormatted =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

    const pdfDefinition: TDocumentDefinitions = {
      info: {
        title: 'Planilla de horas de ' + name,
        author: 'ASJ Servicios',
        subject: 'Gestion de horarios',
      },
      header: {
        columns: [
          {
            text: 'ASJ SERVICIOS',
            alignment: 'left',
            margin: [40, 20],
            bold: true,
            fontSize: 15,
          },
          {
            image: this.imageForPdf,
            alignment: 'right',
            fit: [30, 30],
            margin: [15, 10],
          },
        ],
      },
      content: [
        {
          alignment: 'center',
          text: 'Gestión de horas',
          style: 'header',
          fontSize: 23,
          bold: true,
          margin: [0, 10],
        },
        {
          margin: [0, 0, 0, 10],
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex % 2 === 0 ? '#ebebeb' : '#f5f5f5';
            },
          },
          table: {
            widths: ['100%'],
            heights: [20, 10],
            body: [
              [
                {
                  text: 'Proyecto: ' + name,
                  fontSize: 9,
                  bold: true,
                },
              ],
              [
                {
                  text: 'Cliente: ' + business_name,
                  fontSize: 9,
                  bold: true,
                },
              ],
            ],
          },
        },
        {
          style: 'tableExample',
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return rowIndex === 0 ? '#c2dec2' : null;
            },
          },
          table: {
            widths: ['30%', '10%', '25%', '35%'],
            heights: [10, 10, 10, 10, 30, 10, 25],
            headerRows: 1,
            body: [
              [
                {
                  text: 'Stack: ' + stack,
                  colSpan: 3,
                  bold: true,
                  fontSize: 9,
                },
                {},
                {},
                {
                  text: 'GRUPO: Grupo 1 - Gabriel',
                  fontSize: 9,
                  bold: true,
                },
              ],
              [
                {
                  text: 'Descripción: ' + description,
                  fontSize: 9,
                  colSpan: 4,
                  bold: true,
                },
                {},
                {},
                {},
              ],
              [
                {
                  text: 'Fecha de creación de este informe: ' + todayFormatted,
                  fontSize: 9,
                  bold: true,
                  colSpan: 2,
                },
                {},
                {
                  text:
                    'Fecha estimada para el fin del proyecto: ' +
                    end_estimate_date,
                  fontSize: 9,
                  colSpan: 2,
                  bold: true,
                },
                {},
              ],
              [
                {
                  text: 'Precio por hora: $' + hour_price,
                  border: [true, true, false, false],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true,
                },
                {},
                {
                  text: 'Total de horas estimado: ' + hours_estimate,
                  border: [false, true, true, false],
                  colSpan: 2,
                  fontSize: 9,
                  bold: true,
                },
                {},
              ],
              [
                {
                  text:
                    'Precio total estimado a cobrar: $' +
                    hour_price * hours_estimate,
                  border: [true, false, true, true],
                  colSpan: 4,
                  fontSize: 9,
                  bold: true,
                  marginTop: 10,
                },
                {},
                {},
                {},
              ],
              [
                {
                  text: `Personas trabajando: ${people?.map(
                    (person: any) => ` ${person.name} ${person.lastname}`
                  )}`,
                  fontSize: 9,
                  colSpan: 4,
                  bold: true,
                },
                {},
                {},
                {},
              ],
              [
                {
                  text: 'Tareas: ',
                  fontSize: 15,
                  colSpan: 4,
                  bold: true,
                  border: [true, true, true, false],
                },
                {},
                {},
                {},
              ],
              [
                {
                  text: 'Finalizadas: ' + dataPercentages[0],
                  border: [true, false, false, false],
                  fontSize: 9,
                  bold: true,
                },
                {
                  text: 'En proceso: ' + dataPercentages[1],
                  border: [false, false, false, false],
                  fontSize: 9,
                  bold: true,
                  colSpan: 2,
                },
                {},
                {
                  text: 'Por comenzar: ' + dataPercentages[2],
                  border: [false, false, true, false],
                  fontSize: 9,
                  bold: true,
                },
              ],
              [
                {
                  text: 'En revisión: ' + dataPercentages[3],
                  border: [true, false, false, false],
                  fontSize: 9,
                  bold: true,
                },
                {
                  text: 'Canceladas: ' + dataPercentages[4],
                  border: [false, false, true, false],
                  fontSize: 9,
                  bold: true,
                  colSpan: 3,
                },
                {},

                {},
              ],
              [
                {
                  image: graphAsImage,
                  fit: [500, 1500],
                  colSpan: 4,
                  border: [true, false, true, true],
                },
                {},
                {},
                {},
              ],
            ],
          },
        },
      ],
    };
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  getBase64ImageFromURL(url: any) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
}
