import { Component, OnInit } from '@angular/core';
import { EditorService } from '../services/editor.service';
import { ITenantEmployee, IAppointmentSetting, IProduct, IAppointment, IApiReturnObject } from '../models/website.model';
import { Globals } from '../globals';
import { MatStepper } from '@angular/material/stepper';
import { ILocation } from 'selenium-webdriver';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material';
import { DialogService } from '../services/dialog.service';

@Component({
    selector: 'appointment-plugin',
    templateUrl: './appointment.component.html',
    styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
    selectedDate: Date
    availableTimeSlots: Date[]
    min: Date
    max: Date
    value: Date
    settings: IAppointmentSetting[]
    locations: ILocation[]
    employees: ITenantEmployee[]
    employee: ITenantEmployee
    services: IProduct
    appointment: IAppointment
    firstFormGroup: FormGroup
    secondFormGroup: FormGroup
    thirdFormGroup: FormGroup
    scheduleFilter = (d: Date): boolean => {
        const day = d.getDay();
        var schedule = [];
        if (this.employee.schedule.monday === true) {
            schedule.push(1);
        }
        if (this.employee.schedule.tuesday === true) {
            schedule.push(2);
        }
        if (this.employee.schedule.wednesday === true) {
            schedule.push(3);
        }
        if (this.employee.schedule.thursday === true) {
            schedule.push(4);
        }
        if (this.employee.schedule.friday === true) {
            schedule.push(5);
        }
        if (this.employee.schedule.saturday === true) {
            schedule.push(6);
        }
        if (this.employee.schedule.sunday === true) {
            schedule.push(0);
        }
        return schedule.includes(day);
    }
    constructor(private editorService: EditorService, private globals: Globals, private _formBuilder: FormBuilder, private dialogService: DialogService) { }
    ngOnInit() {
        this.selectedDate = null;
        this.initAppointmentObject();
        this.secondFormGroup = this._formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            email: ['', Validators.email],
            comment: ['', Validators.required],
            locationId: ['', Validators.required],
            services: ['', Validators.required]
        });
        this.employee = null;
        this.availableTimeSlots = [];
        this.editorService.getEmployees(this.globals.tenantId)
            .subscribe((employees: ITenantEmployee[]) => {
                this.employees = employees;
            });
    }
    filterAvailability(date: Date): boolean {
        return date.getFullYear() !== 2299;
    }
    setDate(event: MatDatepickerInputEvent<Date>) {
        if (event.value != null) {
            this.selectedDate = event.value;
            this.editorService.getAvailability(this.globals.tenantId, this.employee.id, this.selectedDate.getDate(), this.selectedDate.getMonth() + 1, this.selectedDate.getFullYear())
                .subscribe((dateTimes: Date[]) => {
                    this.availableTimeSlots = [];
                    for (var i = 0; i < dateTimes.length; i++) {
                        this.availableTimeSlots.push(new Date(dateTimes[i]));
                    }

                })
        }
    }
    setTime(dateTime: Date): void {
        this.selectedDate = dateTime;
        let temp:Date = new Date(dateTime);
        temp.setMinutes(temp.getMinutes() - temp.getTimezoneOffset());
        this.appointment.startTime = temp;
    }
    bookAppointment(picker: MatDatepicker<Date>, stepper: MatStepper): void {
        this.appointment.tenantEmployeeId = this.employee.id
        this.editorService.addAppointment(this.appointment).subscribe((result: IApiReturnObject<IAppointment>) => {
            if (result.status === "Success") {
                this.reset(picker, stepper);
            }
            this.dialogService.message("Appointment", result.message, "info");
        })
    }
    setEmployee(employee: ITenantEmployee, stepper: MatStepper) {
        this.editorService.getEmployee(employee.tenantId, employee.id)
            .subscribe((result: any) => {
                this.employee = result.employee;
                this.locations = result.locations;
                this.min = result.min;
                this.max = result.max;
                this.value = result.value;
                this.settings = result.settings;
                this.services = result.services;
                stepper.next();
            });
    }
    gotoReviewStep(stepper:MatStepper){
        if(this.appointment.startTime === null || this.appointment.startTime < new Date(Date.now())){
            this.dialogService.message("Error", "Please select an appointment date and time.", "error");
        }
        else{
            stepper.next();
        }
    }
    private reset(datePicker: MatDatepicker<Date>, stepper: MatStepper) {
        datePicker.select(null);
        stepper.reset();
        this.employee = null;
        this.initAppointmentObject();
        this.availableTimeSlots = []
    }
    private initAppointmentObject(): void {
        this.appointment = { id: 0, subject: '', startTime: null, endTime: null, isAllDay: false, recurrenceID: 0, recurrenceRule: '', description: '', startTimezone: '', endTimezone: '', tenantEmployeeId: 0, bookedTime: null, confirmed: false, customerId: 0, ipAddress: '', privacyAgreement: false, status: 0, tenantId: this.globals.tenantId, textReminder: false, firstName: '', lastName: '', phoneNumber: '', email: '', comment: '', appointmentServices: [], locationId: 0, services: [] };

    }
}