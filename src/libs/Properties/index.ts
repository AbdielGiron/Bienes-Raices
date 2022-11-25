import { getConnection } from "@models/mongodb/MongoDBConn";
import { PropertiesDao } from "@server/dao/models/mongodb/PropertiesDao";

export class Properties {
    private dao : PropertiesDao;
    public constructor(){
        getConnection()
        .then(conn=>{
            this.dao = new PropertiesDao(conn);
        })
        .catch(ex=>console.log(ex));
    }

    public createPropertie(titulo: string, precio: number, descripcion: string, 
        tipo: string, area: string, habitaciones: number, banios: number, 
        garage: string, terraza: string, direccion: string, nombrePropietario: string){
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
                nombrePropietario,
                _id: null
            };
            return this.dao.createPropertie(newPropertie);
        }
}