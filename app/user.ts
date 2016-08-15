import { Selection } from './selection';

export class User {
    id: string;
    value: string;
    firstName: string;
    lastName: string;
    email: string;
    administrator: boolean;
    selections: Selection[];
    creationDate: string;
}