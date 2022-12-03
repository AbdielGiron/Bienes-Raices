import { getConnection } from "@models/mongodb/MongoDBConn";
import { PropertiesDao } from "@server/dao/models/mongodb/PropertiesDao";
import { ObjectId } from "mongodb";


export class Properties {
    private dao: PropertiesDao;
    public constructor() {
        getConnection()
            .then(conn => {
                this.dao = new PropertiesDao(conn);
            })
            .catch(ex => console.log(ex));
    }

    public createPropertie(titulo: string, precio: number, descripcion: string,
        tipo: string, area: string, habitaciones: number, banios: number,
        garage: string, terraza: string, direccion: string, nombreCompleto: string, email: string, idPropietario: ObjectId) {
        const currentDate = new Date();
        const newPropertie = {
            titulo,
            precio,
            descripcion,
            imagen: '',
            fechaPublic: currentDate,
            tipo,
            area,
            habitaciones,
            banios,
            estado: 'Disponible',
            garage,
            terraza,
            direccion,
            propietario: {
                nombreCompleto: nombreCompleto,
                email: email,
                idPropietario: idPropietario,
            },
            _id: null
        };
        return this.dao.createPropertie(newPropertie);
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
}