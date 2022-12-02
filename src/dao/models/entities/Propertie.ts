import { ObjectId } from "mongodb";


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
    propietario: [
        nombreCompleto: string,
        email: string,
        idPropietario: {type:ObjectId,ref:"IUser"}
    ];
    _id?: unknown;
}