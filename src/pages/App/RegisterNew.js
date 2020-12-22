import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import VehicleSpecs from './VehicleSpecs';
import { useFormik } from 'formik';
import RegisterModel, { ValidationSchema } from './RegisterModel';
import DriverSpecs from './DriverSpecs';
import UploadDocuments from './UploadDocuments';
import CamSDK from 'camunda-bpm-sdk-js'
import { ProcessStartModel } from '../../model/ProcessStartModel';
import { Base64 } from 'js-base64';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import UserManager from '../../infrastructure/userManager';
import Fraud from './Fraud';
import FraudList from '../../components/Fraud/FraudList';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));

function getSteps() {
    return ['مشخصات خودرو', 'مشخصات راننده', 'کد تخلف'];
}
var camClient = new CamSDK.Client({
    mock: true,
    apiUri: `${process.env.REACT_APP_REST_API_ENDPOINT}/engine-rest`,
    headers: {
        Authorization: `Basic ${Base64.toBase64("demo:demo")}`,
    }
});

const step1Keys = ["vehicleType",
    "plateNumber",
    "vehicleCode",

]
const step2Keys =
    [
        "drivingLicenseTypeNumber",
        "nationalCode",
        "lastName",
        "name",
    ]

export default function RegisterationSteps() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [fileVars, setFileVars] = useState({});
    const history = useHistory();

    const [drivers, setDrivers] = useState([]);

    const handleNext = () => {

        if (activeStep === steps.length - 1) {




            formik.submitForm();
            return;
        }

        formik.validateForm().then(errors => {
            console.log('errors: ', errors);


            switch (activeStep) {


                case 0:


                    if (step1Keys.some(step => errors[step])) {

                        return;
                    } else {
                        formik.setErrors([]);

                        setActiveStep((prevActiveStep) => prevActiveStep + 1);
                    }

                    break;

                case 1:

                    if (step2Keys.some(s => errors[s])) {

                        return;
                    } else
                        setActiveStep((prevActiveStep) => prevActiveStep + 1);

                    break;

                // case 2:

                //     if (step2Keys.some(s => errors[s])) {

                //         return;
                //     } else
                //         setActiveStep((prevActiveStep) => prevActiveStep + 1);

                //     break;

                default:
                    // setActiveStep((presvActiveStep) => prevActiveStep + 1);

                    break;
            }
        });

        // setActiveStep((prevActiveStep) => prevActiveStep + 1);





    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const onSubmit = (arg) => {


        const user = UserManager.Load();
        var camClient = new CamSDK.Client({
            mock: true,
            apiUri: `${process.env.REACT_APP_REST_API_ENDPOINT}/engine-rest`,
            headers: {
                Authorization: `Basic ${Base64.toBase64(`${user.username}:${user.password}`)}`,
            }
        });

        var processService = new camClient.resource('process-definition');
        var processStartModel = ProcessStartModel;
        processStartModel.id = localStorage.getItem('pdid');
        // processStartModel.tenantId = 'drivers';


        var variable = {

            type: 'Object',
            valueInfo: {
                serializationDataFormat: 'application/json',
                objectTypeName: 'com.gset.kish.Infringment.models.RequesterModel'
            },
            value: JSON.stringify(formik.values)
        }

        processStartModel.variables = { RequesterModel: variable, ...fileVars }

        //     , facePictureFile : {type : 'file' , value  : } 
        // , shenasnamehFile  : {type : 'file' , value : }};



        processService.start(processStartModel, function (result) {

            if (result == null) {

                toast.info("اطلاعات شما با موفقیت ثبت شد");
                setTimeout(() => history.push('/home'), 2000);
            }



        });




    }


    const formik = useFormik({
        initialValues: RegisterModel,


        validationSchema: ValidationSchema,
        onSubmit: onSubmit
    });



    function getStepContent(step) {
        switch (step) {
            case 0:
                return <VehicleSpecs setDrivers={setDrivers} formik={formik} values={formik.values} onChange={formik.handleChange} />;
            case 1:
                return <DriverSpecs drivers={drivers} formik={formik} values={formik.values} onChange={formik.handleChange} />;
            case 2:
                return <FraudList values={formik.values} onChange={formik.handleChange} formik={formik} />
            case 3:
                return <Fraud values={formik.values} onChange={formik.handleChange} formik={formik} />

            default:
                return 'Unknown step';
        }
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        مرحله قبل
                  </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'پایان' : 'مرحله بعد'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>درصورتی که از صحت اطلاعات وارد شده اطمینان دارید روی  دکمه پایان کلیک کنید تا درخواست شما ثبت شود</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
          </Button>
                </Paper>
            )}
        </div>
    );
}
