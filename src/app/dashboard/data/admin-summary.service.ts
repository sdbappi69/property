import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/base-service';
import { AdminSummaryModel } from '../model/admin-summary-model';
import { Observable } from 'rxjs';

import { environment as env } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminSummaryService extends BaseService<AdminSummaryModel> {

    private  localHttpClient: HttpClient;
    constructor(httpClient: HttpClient) {
        super( httpClient, 'admin_summaries');
        this.localHttpClient = httpClient;
    }

    public propertyBillingSummary(item: any): Observable<File> {
        const endUrl = 'property';
        const url =  `${env.baseURL}/${endUrl}`;
        return this.localHttpClient.post<any>(url, item);
    }

    public amountPaid(periodID: any): Observable<File> {
        const endUrl = 'amount_paid';
        const url =  `${env.baseURL}/${endUrl}`;
        return this.localHttpClient.post<any>(url, {periodID});
    }

    public amountDue(periodID: any): Observable<File> {
        const endUrl = 'amount_due';
        const url =  `${env.baseURL}/${endUrl}`;
        return this.localHttpClient.post<any>(url, {periodID});
    }
}
