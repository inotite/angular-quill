import { Component, OnInit, Input } from '@angular/core';
import { ITenantWebsite } from 'src/app/models/website.model';
import { FlatTreeControl } from '@angular/cdk/tree';


@Component({
    selector:'prop-page',
    templateUrl: './prop-page.component.html'
})

export class PropPageComponent{
    @Input() website: ITenantWebsite
}
