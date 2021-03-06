import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Survey } from 'src/app/models/survey.model';
import { SurveysService } from 'src/app/services/surveys.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-status-tab',
  templateUrl: './status-tab.component.html',
  styleUrls: ['./status-tab.component.css'],
})
export class StatusTabComponent implements OnInit, AfterViewInit {
  newSurveyName: string = '';

  constructor(
    public http: HttpClient,
    public surveysService: SurveysService,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit(): void {}

  ngOnInit() {}
  applyTypeFilter(event: Event) {
    const filterValue = event.target as HTMLInputElement;
    // console.log(filterValue.childNodes[1].textContent );
    this.surveysService.filterSurveysByType(
      filterValue?.childNodes[1]?.textContent
    );
  }

  applyNameFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue);
    this.surveysService.filterSurveysByName(filterValue);
  }

  openDialog() {
    const currentSurvey = this.surveysService.getSurveyById(
      this.surveysService.selectedId
    );

    let dialogRef = this.dialog.open(DialogComponent, {
      data: currentSurvey,
    });

    dialogRef.afterClosed().subscribe((result) => {
      let english = /^[A-Za-z0-9]*$/;

      if (result === 'noChange') {
        console.log('No Changes made');
      } else if (result.length >= 4 && english.test(result)) {
        currentSurvey['SurveyName'] = result;
      } else {
        console.log('Name must be English and more than 4 char');
      }
    });
  }
}
