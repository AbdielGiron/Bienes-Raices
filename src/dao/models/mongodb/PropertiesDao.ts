import { IPropertie } from "../entities/Propertie";
import { AbstractDao } from "./AbstractDao";
import {Db, ObjectId} from "mongodb";

export class PropertiesDao extends AbstractDao<IPropertie> {
    public constructor(db: Db) {
        super('properties', db);
    }

    public getProperties() {
        return super.findAll()
      }

    updatePropertieDate(id: string) {
        return this.updateRaw(id, { $set: { fechaPublic: new Date() } });
    }

    createPropertie(propertie: IPropertie) {
        const { _id, ...newPropertie } = propertie;
        return this.createOne(newPropertie);
    }
    updatePropertie(id: string, propertie: IPropertie) {
        const { _id, ...updPropertie } = propertie;
        return this.update(id, updPropertie);
    }
    deletePropertie(id: string, propertie: IPropertie) {
        const { _id, ...delPropertie } = propertie;
        return this.update(id, delPropertie);
    }

    public async getPropertieById( identifier : string ){
        try{
          const result = await super.findByID(identifier);
          return result;
        } catch( ex: unknown) {
          console.log("Propertie mongodb:", (ex as Error).message);
          throw ex;
        }
      }

      public getPropertieByUser(id:string){
        // return super.findByFilter({precio: new Number(id)},{sort:{'type': -1}});

        try{
          const result = super.findByFilter({'propietario.idPropietario': new ObjectId(id)},{sort:{'type': -1}});
          return result;
        } catch( ex: unknown) {
          console.log("Propertie mongodb:", (ex as Error).message);
          throw ex;
        }
      }
}
