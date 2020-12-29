import React from 'react';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import { createMuiTheme, Fab, makeStyles, MuiThemeProvider, Tooltip } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { PhotoCamera } from '@material-ui/icons';


const theme = createMuiTheme({
    overrides: {

        MuiDropzonePreviewList: {

            removeButton: {
                left: '51px'
            }
        }

    }
});




const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        margin: '15px 0',

    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    thumbBox: {
        margin: '0 27px',
        ' & img': {
            borderRadius: '50%'
        }
    },
    thumbnailContainer: {

        display: 'flex'
    }
}))

export default function ImageUploader({ name, filesLimit, receiveFiles, ...props }) {

    const [thumbs, setThumbs] = React.useState([]);
    const classes = useStyle();


    const createThumbnails = (event) => {
        console.log('event: ', event);
        const files = [...event.target.files];
        var thum = [];
        files.map(f => {
            var reader = new FileReader();
            reader.onload = () => {


                thum.push({
                    filename: f.name,
                    value: reader.result.split(',')[1].toString(),
                    mimetype: f.type,
                    src: reader.result
                });
                setThumbs(thum);
                receiveFiles && receiveFiles({
                    filename: f.name,
                    value: reader.result.split(',')[1].toString(),
                    mimetype: f.type,
                    src: reader.result
                });
            };

            reader.readAsDataURL(f);

        })


    }
    return (

        <div className={classes.root}>
            {/* <input type="file" name="file" id="" multiple={props.multiple} onChange={handleselectedFile} /> */}
            {/* <Button onClick={handleUpload}>Upload</Button> */}

            <input onChange={createThumbnails} style={{ display: 'none' }} id="icon-button-file" type="file" />
            {/* <input accept="image/*" multiple={props.multiple} onChange={handleselectedFile} style={{ display: 'none' }} id="icon-button-file" type="file" /> */}
            {/* <input type='hidden' onChange={props.handelChange} name={props.name} value={state.value} /> */}

            <div
                className={classes.wrapper}
            >

                <Tooltip
                    id="tooltip-top-start"
                    title="اضافه کردن تصویر"
                    placement="top"
                // classes={{ tooltip: classes.tooltip }}
                >
                    <Fab
                        aria-label="save"
                        color="primary"
                        component='label'
                        htmlFor="icon-button-file"
                    // className={buttonClassname}
                    // onClick={handleButtonClick}
                    >
                        <PhotoCamera />
                        {/* {state.loaded == 100 ? <Check /> : <PhotoCamera />} */}
                    </Fab>
                </Tooltip>
                {/* {state.loaded == 100 && <CircularProgress variant='determinate' value={state.loaded} size={68} className={classes.fabProgress} />} */}
            </div>
            {/* <FileInput onInputChange={handleselectedFile} text={state.files == null ? "انتخاب تصویر" : state.files} inputProps={{ multiple: props.multiple }} /> */}
            {/* {state.files && props.multiple && <Button onClick={handleUpload} text="ارسال" icon={"upload"} />} */}
            <div className={classes.thumbnailContainer}> {


                thumbs.map((t, key) =>
                    <Tooltip
                        id="tooltip-top-start"
                        title={`${t.size} کیلوبایت`}
                        placement="top"
                        classes={{ tooltip: classes.tooltip }}
                        key={key}
                    >
                        <div className={classes.thumbBox}>
                            <img src={t.src}
                                width={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                height={props.thumbnailSize === undefined ? 50 : props.thumbnailSize}
                                className="thumbnail"
                                alt={t.name} />
                            {/* <span> <span>{t.name}</span></span> */}
                            {/* <span> <span>{t.size}</span> KB</span> */}
                        </div>
                    </Tooltip>

                )


            }
            </div>
            {/* <ProgressBar value={state.loaded} intent={state.intent} animate={false} /> */}
            {/* <CircularProgress variant="determinate" value={state.loaded} color="secondary" /> */}

        </div>
    )
}

