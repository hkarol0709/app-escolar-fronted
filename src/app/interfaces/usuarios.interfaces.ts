// Creamos estas interfaces para mantener más limpio el codigo
// Tambien para dividirlo por tipo de usuario
// La ventaja es que se pueden importar y ya no se ven tan largas las clases de los servicios
//No se saturan de código y se pueden mantener más organizadas las clases de los servicios

//Interfaz datos de usuario de administrador
export interface DatosAdministrador {
  rol: string;
  clave_admin: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmar_password: string;
  telefono: string;
  rfc: string;
  edad: number;
  ocupacion: string;
}
// Interfaz datos de usuario de maestro
export interface DatosMaestro {
  id: number;
  id_trabajador: number;
  first_name: string;
  last_name: string;
  email: string;
  fecha_nacimiento: string;
  telefono: string;
  rfc: string;
  cubiculo: string;
  area_investigacion: number;
}

// Interfaz datos de usuario de alumno
export interface DatosAlumno {
  id: number;
  matricula: number;
  first_name: string;
  last_name: string;
  email: string;
  fecha_nacimiento: string;
  curp: string;
  rfc: string;
  edad: number;
  telefono: string;
  ocupacion: string;
}


