// <---------- ADDRESSES ------------> //

export interface Address {
    address: string;
    lat: string;
    lng: string;
    owner: string;
    name: string;
    archived?: boolean;
}

export interface FlagTypes {
    flag: string;
    active: boolean;
    size: string;
    material: string;
}

export interface Details {
    monthly: boolean;
    flagTypes: FlagTypes[];
    monthlyComments: string;
    poleType: string;
    poleHeight: string;
    cleat: string;
    retainer: string;
    currentRoutes?: string[];
    order?: number;
}

export interface Location extends Address, Details {}

export interface ScheduledMonthly extends Details {
    type: string;
    uniqueID: number;
    addr: Address;
}

// <---------------- Inventory Management --------------> //

export interface InventoryListItem {
    id: string;
    name: string;
}

export interface InvItem {
    orderName: string;
    orderType: string;
    orderPrice: number;
    orderDetails: string;
    orderQuantity: number;
    currentQuantity: number;
    committed: number;
}

export interface InvItemSaleData extends InvItem {
    lastOrderedDate: { seconds: number; nanoseconds: number };
    lastOrderedQuantity: number;
    id: string;
}

export interface OutstandingOrders {
    id: string;
    date: { seconds: number; nanoseconds: number };
    quantity: number;
}

export interface FormData extends InvItem {
    [key: string]: string | number;
}

// <--------------- Locations --------------------> //

// export interface Location extends Address {
//     id: string;
// }

// <--------------- Jobs ------------------> //

export interface JobType {
    jobID: string;
    jobName: string;
}

export interface JobMaterial {
    id: string;
    quantity: number;
}

export interface Job {
    id: string;
    jobName: string;
    jobDescription: string;
    materials: JobMaterial[];
    digging: boolean;
    water: number;
}

export interface MaterialsIDs {
    id: string;
    [key: string]: string;
}

export interface MaterialChoice {
    material: string;
    quantity: number;
    [key: string]: string | number;
}

export interface Materials {
    materialNames: string[];
    materialList: InventoryListItem[];
    materialIDs: MaterialsIDs;
    materialNameIDs: MaterialsIDs;
}

//<------------- Schedules ----------->//

export interface ScheduledMaterial extends JobMaterial {
    matName: string;
}

export interface ScheduledJob {
    jobID: string;
    jobName: string;
    jobDescription: string;
    materials: ScheduledMaterial[];
    digging: boolean;
    water: number;
    jobNumber: number;
    // address: string;
    // addrOwner: string;
    // addrName: string;
    addr: Address;
    uniqueID: number;
    type: string; // Job or Monthlys
}

export interface CrewIDs {
    [key: string]: string;
}