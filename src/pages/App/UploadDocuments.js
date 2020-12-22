import { Grid } from '@material-ui/core';
import { GridOff } from '@material-ui/icons';
import React, { useState } from 'react';
import FileUploader from '../../components/FileUploader';


export default function UploadDocuments({ values, onChange, formik }) {


    const [fileVars, setFileVars] = useState({});


    const prepareFilesShenasname = (file) => {
        console.log('file: ', file);

        // if (file.length <1) return;

        setFileVars({ ...fileVars, shenasnamehFile: { type: 'File', value: file.value, valueInfo: file } })
        onChange({ ...fileVars, shenasnamehFile: { type: 'File', value: file.value, valueInfo: file } })

    }


    const setPersoneli = (file)=>{
        console.log('fileVars setPersoneli: ', fileVars);
        // if (file.length <1) return;

        setFileVars({ ...fileVars, facePictureFile: { type: 'File', value: file.value, valueInfo: file } })
        onChange({ ...fileVars, facePictureFile: { type: 'File', value: file.value, valueInfo: file } })

    }


    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
                <FileUploader name="تصویر از تمام صفحات شناسنامه متقاضی" filesLimit={1} receiveFiles={prepareFilesShenasname} />

            </Grid>
            <Grid item xs={12} md={4}>
                <FileUploader name="عکس 3 * 4" filesLimit={1}  receiveFiles = {setPersoneli}/>

            </Grid>
        </Grid>
    )
}