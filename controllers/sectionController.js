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

        section.user = req.uid;
        
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
    
    const uid = req.uid;

    try {

        const section = await Section.findById( sectionId );

        if( !section ){
            return res.status(404).json({
                ok: false,
                msg: 'La seccion no existe'
            })
        }

        if( section.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar esta seccion'
            })
        }

        const newSection = {
            ... req.body,
            user: uid
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
    
    const uid = req.uid;

    try {

        const section = await Section.findById( sectionId );

        if( !section ){
            return res.status(404).json({
                ok: false,
                msg: 'El platillo no existe'
            })
        }


        if( section.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar esta seccion'
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