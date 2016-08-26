import { Option } from './option';

export class Vote {
    id: string;
    topic: string;
    description: string;
    options: Option[];
    editable: boolean;
    createdBy: string;
    creationDate: string;
    createdByUserName: string;
}