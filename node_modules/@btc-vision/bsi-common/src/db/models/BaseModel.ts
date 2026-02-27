import { IBaseDocument } from '../documents/interfaces/IBaseDocument.js';

export abstract class BaseModel {
    public abstract toDocument(): Readonly<IBaseDocument>;
}
