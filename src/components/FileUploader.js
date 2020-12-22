import React from 'react';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';


const theme = createMuiTheme({
    overrides: {

        MuiDropzonePreviewList: {

            removeButton: {
                left: '51px'
            }
        }

    }
});


  

export default function FileUploader({ name, filesLimit , receiveFiles }) {

    const [thumbs, setThumbs] = React.useState([]);


     
    const createThumbnails = (files) => {
        
        var thum = [];
        files.map(f => {
            var reader = new FileReader();
            reader.onload = () => {

               
                thum.push({
                    filename: f.name,
                    value: reader.result.split(',')[1].toString(),
                    mimetype : f.type
                });
                setThumbs(thum);
                receiveFiles &&  receiveFiles({
                    filename: f.name,
                    value: reader.result.split(',')[1].toString(),
                    mimetype : f.type
                });
            };

            reader.readAsDataURL(f);

        })

       
    }
    return (
        <div>
            {/* <MuiThemeProvider theme={theme}> */}

                <DropzoneArea
                    ini
                    filesLimit={filesLimit}
                    dropzoneText={name}
                    acceptedFiles={['image/*']}
                    showAlerts={false}
                    onChange={createThumbnails}
                    onDelete={(fileObj) => console.log('Removed File:', fileObj)}
                    onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
                />
            {/* </MuiThemeProvider> */}
        </div>
    )
}

