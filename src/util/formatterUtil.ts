import {PersonnelType, Role} from '../types/responsible.types';
import {UserType} from '../types/user.types';
import {Actions, Status} from '../types/inspection.types';
import {Story, ToBeInspected} from '../types/area.types';
import {Stat} from "../types/stats.types";

/**
 * Function that formats into string a date
 */
const dateFormatter = (date: Date, type:string) : string => {
    const longOptions : Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const shortOptions : Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    };
    return date.toLocaleDateString('es-ES', type === 'long' ? longOptions : shortOptions)
}

/**
 * Function that formats into string a worker role
 */
const roleFormatter = (role:Role) : string => {
    switch (role){
        case 'CONSERVATION':
            return 'Conservador';
        case 'INSPECTION':
            return 'Inspector'
        case 'RESTORATION':
            return 'Restaurador'
    }
}

/**
 * Function that formats into an array of strings worker roles
 */
const roleListFormatter = (roles : Array<Role>): string => {
    return roles.map((role:Role) => roleFormatter(role)).toString()
}

/**
 * Function that formats into string a user type
 */
const userTypeFormatter = (userType:UserType) :string => {
    switch (userType){
        case 'ADMIN_USER':
            return 'Administrador';
        case 'OPERATIVE_USER':
            return 'Operativo'
        case 'SUPER_USER':
            return 'Superusuario'
        case 'DIRECTOR_USER':
            return 'Director'
    }
}

/**
 * Function that formats into string an inspection status
 */
const statusTypeFormatter = (status:Status) :string => {
    switch (status){
        case 'IN_PROGRESS':
            return 'En progreso';
        case 'EXECUTED':
            return 'Ejecutada'
        case 'EXECUTED_LATE':
            return 'Ejecutada con retraso'
        case 'LATE':
            return 'Retrasada'
        case 'TO_PROCEED':
            return 'Por suceder'
    }
}

/**
 * Function that formats into string an inspection result
 */
const actionsTypeFormatter = (action:Actions) :string => {
    switch (action){
        case 'CONSERVATION':
            return 'Conservación';
        case 'RESTORATION':
            return 'Restauración'
    }
}

/**
 * Function that formats into string a building story
 */
const storyTypeFormatter = (story:Story) :string => {
    switch (story){
        case 'FIRST':
            return 'Primer nivel';
        case 'SECOND':
            return 'Segundo nivel'
        case 'THIRD':
            return 'Tercer nivel'
        case 'BASEMENT':
            return 'Sótano'
        case 'OUTSIDE':
            return 'Exterior'
    }
}

/**
 * Function that formats into string a personnel type
 */
const personnelTypeFormatter = (personnel:PersonnelType) : string => {
    switch (personnel){
        case 'INTERNAL':
            return 'Personal interno';
        case 'CONTRACTOR':
            return 'Personal subcontratado'
    }
}

/**
 * Function that formats into string a theatre space to be inspected
 */
const toBeInspectedTypeFormatter = (toBeInspectedType:ToBeInspected) : string => {
    switch (toBeInspectedType){
        case 'AREA':
            return 'Área';
        case 'ELEMENT':
            return 'Elemento'
    }
}

/**
 * Function that formats a file name
 */
const fileNameFormatter = (fileName: string, maxLength:number): string => {
    const sliceLength = (maxLength / 2) -2
    return fileName.length > maxLength ? fileName.slice(0,sliceLength) + '... ' + fileName.slice(-sliceLength) : fileName
}

/**
 * Function that formats data into chart
 */
const chartDataFormatter = (statsData : Array<Stat>, colorProfile : Array<string>): any => {
    const formattedAbsoluteValues : Array<number> = statsData.map((stat : Stat)=> stat.absoluteCount);
    const totalAbsoluteValue = formattedAbsoluteValues.reduce((partialSum, a) => partialSum + a, 0);
    const formattedLabels : Array<string> = statsData.map((stat : Stat)=> statusTypeFormatter(stat.status) + " ("+ (stat.absoluteCount/totalAbsoluteValue*100).toFixed(2) + "%)");

    return {
        labels: formattedLabels,
        datasets: [{
            label: 'Estadísticas de inspecciones según estado.',
            data: formattedAbsoluteValues,
            backgroundColor: colorProfile,
        },],
    };

}

export{
    dateFormatter,
    roleFormatter,
    roleListFormatter,
    userTypeFormatter,
    statusTypeFormatter,
    actionsTypeFormatter,
    storyTypeFormatter,
    personnelTypeFormatter,
    fileNameFormatter,
    toBeInspectedTypeFormatter,
    chartDataFormatter,
}
