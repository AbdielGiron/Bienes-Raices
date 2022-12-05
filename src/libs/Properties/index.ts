import { getConnection } from "@models/mongodb/MongoDBConn";
import { PropertiesDao } from "@server/dao/models/mongodb/PropertiesDao";

export interface IPropertie {
    titulo: string;
    precio: number;
    descripcion: string;
    imagen?: string;
    fechaPublic?: Date;
    tipo: string[]; //
    area: string;
    habitaciones: number;
    banios: number;
    estado: string[]; //'DISP' | 'OCUP' | 'NDIS';
    garage: string;
    terraza: string;
    direccion: string;
};
export class Properties {
    private dao: PropertiesDao;
    public constructor() {
        getConnection()
            .then(conn => {
                this.dao = new PropertiesDao(conn);
            })
            .catch(ex => console.log(ex));
    }

    public createPropertie(propertie: IPropertie, userId: string) {

        const { titulo,
            precio,
            descripcion,
            imagen,
            fechaPublic,
            tipo,
            area,
            habitaciones,
            banios,
            estado,
            garage,
            terraza,
            direccion
        } = propertie;

        return this.dao.createPropertie({
            titulo,
            precio,
            descripcion,
            imagen: '',
            fechaPublic: new Date(),
            tipo,
            area,
            habitaciones,
            banios,
            estado: ['Disponible'],
            garage,
            terraza,
            direccion 
        }, userId);
    }


    public updatePropertie(id: string, titulo: string, precio: number, descripcion: string,
        tipo: string, area: string, habitaciones: number, banios: number,
        garage: string, terraza: string, direccion: string, estado: string,) {
        const updPropertie = {
            titulo,
            precio,
            descripcion,
            imagen: '',
            tipo,
            area,
            habitaciones,
            banios,
            estado: estado,
            garage,
            terraza,
            direccion
        };
        return this.dao.updatePropertie(id, updPropertie);
    }

    public deletePropertie(id: string) {
        const delPropertie = {
            estado: "Eliminado"
        };
        return this.dao.deletePropertie(id, delPropertie);
    }

    public getAllProperties() {
        return this.dao.getProperties()
    }

    public getPropertieByIndex(index: string) {
        return this.dao.getPropertieById(index);
    }

    public getAllPropertiesFromUser(id: string) {
        return this.dao.getPropertieByUser(id);
    }
}