import { IPropertie } from "../entities/Propertie";
import { AbstractDao } from "./AbstractDao";
import { Db } from "mongodb";

export class PropertiesDao extends AbstractDao<IPropertie> {
    public constructor(db : Db) {
        super('properties', db);
    }

    updatePropertieDate(id:string){
        return this.updateRaw(id, {$set: {fechaPublic: new Date()} });
    }

    createPropertie(propertie:IPropertie){
        const {_id, ...newPropertie } = propertie;
        return this.createOne(newPropertie);
    }
}