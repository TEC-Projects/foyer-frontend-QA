// @ts-ignore
import * as pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {
    Builder,
    Director,
} from "./reportBuilder/builder";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

// Function that uses builder pattern to generate reports
const generateReport = (builder: Builder) => {
    let director: Director = new Director(builder)
    director.buildReport()
    let dd = builder.getReport().getDocument()
    pdfMake.createPdf(dd).open();
}

// Function that uses builder pattern to generate and open reports
const  getAndOpenReport = (builder: Builder) => {
    let director: Director = new Director(builder)
    director.buildReport()
    let dd = builder.getReport().getDocument()
    let doc = pdfMake.createPdf(dd);
    doc.open();
    return doc;
}


export {
    generateReport,
    getAndOpenReport
}
