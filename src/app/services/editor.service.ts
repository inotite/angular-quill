import {Injectable, EventEmitter} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ITenantWebsite, ITenantWebsitePage, ITenantEmployee, IAppointment, IAppointmentService, IApiReturnObject } from '../models/website.model';
import {catchError} from 'rxjs/operators';
import { DialogService } from './dialog.service';
@Injectable()
export class EditorService{
    host = "https://localhost:44304";
    constructor(private http: HttpClient){}

    //Page editor service calls
    getWebsite(): Observable<ITenantWebsite>{
        return this.http.get<ITenantWebsite>(`${this.host}/api/website/1`)
            .pipe(catchError(this.handleError<ITenantWebsite>('getWebsite', null)))
    }
    getPage(id: number): Observable<ITenantWebsitePage>{
        return this.http.get<ITenantWebsitePage>(`${this.host}/api/page/${id}`)
            .pipe(catchError(this.handleError<ITenantWebsitePage>('getPage', null)))
    }
    addPage(page:ITenantWebsitePage): Observable<IApiReturnObject<ITenantWebsitePage>>{
        return this.http.post<IApiReturnObject<ITenantWebsitePage>>(`${this.host}/api/page`,page )
            .pipe(catchError(this.handleError<IApiReturnObject<ITenantWebsitePage>>('savePage', null)))
    }
    savePage(page:ITenantWebsitePage): Observable<ITenantWebsitePage>{
        return this.http.put<ITenantWebsitePage>(`${this.host}/api/page/${page.id}`,page )
            .pipe(catchError(this.handleError<ITenantWebsitePage>('savePage', null)))
    }

    //Appointment service calls: Will need to be moved to a separate service
    getEmployees(tenantId:string):Observable<ITenantEmployee[]>{
        return this.http.get<ITenantEmployee[]>(`${this.host}/identity/appointment/plugin/${tenantId}?handler=employees`)
            .pipe(catchError(this.handleError<ITenantEmployee[]>('getEmployees', null)))
    }
    getEmployee(tenantId:string, id:number):Observable<ITenantEmployee>{
        return this.http.get<ITenantEmployee>(`${this.host}/identity/appointment/plugin/${tenantId}?handler=employee&id=${id}`)
            .pipe(catchError(this.handleError<ITenantEmployee>('getEmployee', null)))
    }
    addAppointment(appointment:any): Observable<IApiReturnObject<IAppointment>>{
        return this.http.post<IApiReturnObject<IAppointment>>(`${this.host}/identity/appointment/plugin/${appointment.tenantId}?handler=newappointment`,appointment )
            .pipe(catchError(this.handleError<IApiReturnObject<IAppointment>>('addAppointment', null)))
    }
    cancelAppointment(appointment:IAppointment): Observable<IAppointment>{
        return this.http.post<IAppointment>(`${this.host}/identity/appointment/plugin/${appointment.tenantId}?handler=cancelappointment&appointment=${appointment}`,appointment )
            .pipe(catchError(this.handleError<IAppointment>('cancelAppointment', null)))
    }
    getAvailability(tenantId:string, id:number,day:number,month:number,year:number):Observable<Date[]>{
        return this.http.get<Date[]>(`${this.host}/identity/appointment/plugin/${tenantId}?handler=availability&id=${id}&day=${day}&month=${month}&year=${year}`)
            .pipe(catchError(this.handleError<Date[]>('getAvailability', null)))
    }
    setAppointment(tenantId:string,id:number,date:Date,services:IAppointmentService[]){
        return this.http.get<IAppointment>(`${this.host}/identity/appointment/plugin/${tenantId}?handler=setappointment&id=${id}&date=${date}&services=${services}`)
            .pipe(catchError(this.handleError<IAppointment>('setAppointment', null)))
    }


    //Service error handler
    private handleError<T>(operation = 'operation', result?:T){
        return (error:any): Observable<T> => {
            console.error(error);
            return of(result as T);
        }
    }
}