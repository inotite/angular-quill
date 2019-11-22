export interface ITenantWebsite{
    id: number,
    handle: string,
    name: string,
    description?: string,
    themeName?: string,
    createDate: Date,
    isPublished: boolean,
    logo?: string,
    tenantId: string,
    urls?: ITenantWebsiteUrl[],
    pages?: ITenantWebsitePage[],
    links?: ITenantWebsiteLink[]
    address?: string,
    city?: string,
    state?: string,
    zipCode?: string,
    country?: string,
    email?: string,
    phone?: string,
    facebook?: string,
    instagram?: string,
    linkedIn?: string,
    twitter?: string
}

export interface ITenantWebsiteUrl{
    id: number,
    url: string,
    isConfirmed: boolean,
    confirmedDate: Date,
    tenantWebsiteId: number

}
export interface ITenantWebsitePage{
    id: number,
    createDate: Date,
    lastUpdated: Date,
    name: string,
    title: string,
    seoKeywords?: string,
    tenantWebsiteId: number,
    tenantId: string,
    default: boolean,
    sections?: ISection[],
    isMenuItem:boolean

}
export interface ITenantWebsiteLink{
    id: number,
    name: string,
    parentId?: number,
    tenantWebsiteId: number,
    sequence: number,
    isMenuItem: boolean,
    pageId: number,
    depth: number
}

export interface ISection{
    id: number,
    published: boolean,
    tenantWebsitePageId: number,
    index: number,
    containers?: IContainer[],
    isDelete: boolean,
    styles:string,
    containerType:string
}

export interface IContainer{
    id: number,
    sectionId: number,
    index: number,
    elements: IElement[],
    desktopWidth: number,
    tabletWidth: number,
    mobileWidth: number,
    isDelete: boolean,
    styles:string
}

export interface IElement{
    id: number,
    containerId: number,
    content?: string,
    index: number,
    type: string,
    isDelete: boolean,
    desktopWidth: number,
    tabletWidth: number,
    mobileWidth: number,
    styles:string
}

export interface ITenantEmployee{
    id:number,
    firstName: string,
    lastName: string,
    dob: Date,
    address:string,
    city: string,
    state:string,
    zipcode:string,
    createDate:Date,
    effectiveDate:Date,
    lastUpdateDate:Date,
    phoneNumber:string,
    cellNumber:string,
    email:string,
    employeeType:string,
    licenseNumber:string,
    isClockedIn:boolean,
    passcode: string,
    shopLocationId:number
    tenantId: string,
    checkGroups: ICheckGroup[],
    customers: ICustomer[],
    appointments: IAppointment[],
    schedule: ITenantEmployeeSchedule,
    employeeTimes: ITenantEmployeeTime[]

}
export interface ICheckGroup{
    id:number,
    tenantId: string,
    shopCustomerId: number,
    tenantEmployeeId: number,
    createDate: Date,
    checks: ICheck[]
}
export interface ICheck{
    id:number,
    iP: string,
    initDate:Date,
    expirationDate:Date,
    status:string,
    checkGroupId: number,
    employeeId:number,
    checkItems:ICheckItem[],
    payments:ICheckPayment[]
}
export interface ICheckItem{
    id:number,
    checkId:number,
    productId:number,
    productName:string,
    status:string,
    quantity:number,
    options:string,
    price:number,
    taxable:boolean
}
export interface ICheckPayment{
    id:number,
    couponCode:string,
    total:number,
    taxAmount:number,
    subTotal:number,
    type:string,
    paymentAuthenticationToken:string
    processor:string,
    chargeId:string,
    refundUrl:string,
    refundId:string,
    refundAmount:number,
    paymentDate:Date,
    checkId:number
}
export interface ICustomer{
    id:number,
    initDate:Date,
    phoneNumber:string,
    emailAddress:string,
    firstName:string,
    lastName:string,
    tenantId:string,
    appointments: IAppointment[]
}
export interface IAppointment{
    id:number,
    subject:string,
    startTime:Date,
    endTime:Date,
    isAllDay:boolean,
    recurrenceID:number,
    recurrenceRule:string,
    description:string,
    startTimezone:string,
    endTimezone:string,
    tenantEmployeeId:number,
    firstName:string,
    lastName:string,
    phoneNumber:string,
    email:string,
    textReminder:boolean,
    comment:string,
    privacyAgreement:boolean,
    ipAddress:string,
    locationId:number,
    tenantId:string,
    customerId:number,
    confirmed:boolean,
    bookedTime:Date,
    status:number,
    appointmentServices:IAppointmentService[],
    services:IProduct[]

}
export interface IAppointmentService{
    id:number,
    productId:number,
    appointmentId:number,
    name:string,
    price:number,
    minutes:number
}
export interface ITenantEmployeeSchedule{
    id:number,
    monday:boolean,
    mondayHour:number,
    mondayMinute:number,
    mondayHourEnd:number,
    mondayMinuteEnd:number,
    tuesday:boolean,
    tuesdayHour:number,
    tuesdayHourEnd:number,
    tuesdayMinute:number,
    tuesdayMinuteEnd:number,
    wednesday:boolean,
    wednesdayHour:number,
    wednesdayMinute:number,
    wednesdayHourEnd:number,
    wednesdayMinuteEnd:number,
    thursday:boolean,
    thursdayHour:number,
    thursdayHourEnd:number,
    thursdayMinute:number,
    thursdayMinuteEnd:number,
    friday:boolean,
    fridayHour:number,
    fridayHourEnd:number,
    fridayMinute:number,
    fridayMinuteEnd:number,
    saturday:boolean,
    saturdayHour:number,
    saturdayHourEnd:number,
    saturdayMinute:number,
    saturdayMinuteEnd:number,
    sunday:boolean,
    sundayHour:number,
    sundayHourEnd:number,
    sundayMinute:number,
    sundayMinuteEnd:number,
    tenantEmployeeId:string
}
export interface ITenantEmployeeTime{
    id:number,
    clockInTime:Date,
    clockOutTime:Date,
    isAdjusted:boolean,
    adjustedOn:Date,
    tenantEmployeeId:number
}
export interface IAppointmentSetting{
    id:number,
    name:string,
    value:string,
    valueType:string,
    settingType:string,
    tenantId:string,
    baseId:number,
    description:string
}
export interface IProduct{
    id:number,
    name:string,
    description:string,
    categoryId:number,
    isFeatured:boolean,
    isPublished:boolean,
    tenantId:string,
    price:number,
    startDate:Date,
    endDate:Date,
    productImages:IProductImage[],
    productDiscounts:IProductDiscount[],
    taxable:boolean,
    quantity:number,
    minimumOrder:number,
    stockStatus:string,
    seoKeywords:string,
    isAddToCart:boolean,
    isService:boolean,
    minutes:number
}
export interface IProductImage{
    id:number,
    tenantId:string,
    productId:number,
    description:string,
    imagePath:string,
    sequence:number,
    default:boolean
}
export interface IProductDiscount{
    id:number,
    productId:number,
    discountId:number,
    tenantId:string
}

export interface IApiReturnObject<T>{
    (arg:T):T,
    message:string,
    status:string
}
export interface DialogData {
    title: string,
    message: string,
    type:string,
    confirm:boolean
  }

