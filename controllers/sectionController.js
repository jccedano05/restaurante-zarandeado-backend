const { response } = require('express');
const Section = require('../models/SectionModel');




//Obtener Secciones

const getAllSections = async (rec, res = response ) => {
    

    const sections = await Section.find();


    res.json({
        ok: true,
        sections: sections
    })

}




const createSection = async ( req, res = response ) => {


    const section = new Section( req.body );

    try {
        
        const sectionSaved = await section.save();

        res.json({
            ok: true,
            section: sectionSaved
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador por este error'
        })
    }


}




//Actualizar Platillo
const updateSection = async ( req, res = response ) => {

    const sectionId = req.params.id;

    try {

        const section = await Section.findById( sectionId );

        if( !section ){
            return res.status(404).json({
                ok: false,
                msg: 'La seccion no existe'
            })
        }

        const newSection = {
            ... req.body
        }


        const sectionUpdated = await Section.findByIdAndUpdate( sectionId, newSection, {new: true})
        
        res.json({
            ok: true,
            section: sectionUpdated
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

    
}






const deleteSection = async ( req, res = response ) => {

    const sectionId = req.params.id;

    try {

        const section = await Section.findById( sectionId );

        if( !section ){
            return res.status(404).json({
                ok: false,
                msg: 'El platillo no existe'
            })
        }

        await Section.findByIdAndDelete( sectionId)
        
        res.json({
            ok: true
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}




module.exports = {
    getAllSections,
    createSection,
    updateSection,
    deleteSection
}