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
    _id?: unknown;
    userId?: unknown;
};