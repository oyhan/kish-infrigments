import React, { useEffect } from 'react';
import "../styles/login.css"
import CamSDK from 'camunda-bpm-sdk-js'
import { Base64 } from 'js-base64';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import userManager from '../infrastructure/userManager';
import { Redirect, useHistory } from 'react-router-dom'
import Register from './Register';
import { HttpClient } from '../infrastructure/HttpClient'
import { promises } from 'fs';
export default function Login() {
    var camClient = new CamSDK.Client({
        mock: true,
        apiUri: `${process.env.REACT_APP_REST_API_ENDPOINT}/engine-rest`,
        headers: {
            Authorization: `Basic ${Base64.toBase64("demo:demo")}`,
        }
    });

    // var taskService = new camClient.resource('task');

    // taskService.list({}, function (err, results) {



    // });


    const history = useHistory();




    var processService = new camClient.resource('process-definition');


    processService.list({}, function (err, results) {


    });
    const userService = new camClient.resource('user');




    const onSubmit = (e) => {

        // if(formik.values.confirmpassword !== formik.values.password) {
        //     alert("کلمه عبور مطابقت ندارد")
        // }

        // if (!formik.isValid) return;

        HttpClient.Post(`${process.env.REACT_APP_REST_API_ENDPOINT}/engine-rest/engine/default/identity/verify`, JSON.stringify(formik.values)).
            then((respons) => {
                if(respons.authenticated){
                    HttpClient.Get(`${process.env.REACT_APP_REST_API_ENDPOINT}/engine-rest/user/${formik.values.username}/profile`)
                    .then(profile=> {
                        userManager.Save({username : formik.values.username,password : formik.values.password , ...profile})    
                        window.location = "/home";
                        return;
                    })
                   
                }
                
                toast.info("اطلاعات کاربری صحیح نیست")
                // 
            }).catch(error => {
                console.log('error: ', error);

            })




        // userService.create(formik.values, (res) => {
        //     if (res == null){
        //         toast.info("ممنون از ثبت نام شما");

        //         const user = {
        //             username: formik.values.id,
        //             firstName : formik.values.firstName,
        //             lastName : formik.values.lastName,
        //             email : formik.values.email,
        //             password:  formik.values.password,
        //         }
        //        userManager.Save(user);
        //         history.push("/home");
        //     }
        //     else
        //         toast.error(res.toString());
        // })


    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",


        },
        validationSchema: Yup.object({
            username: Yup.string().
                required("کدملی خود را وارد کنید"),

            password: Yup.string().
                required("رمز عبوری که قبلا با آن ثبت نام کرده بودید را وارد کنید"),

        }),
        onSubmit: onSubmit
    });

    if (userManager.Load()) return <Redirect to="/home" />

    else return (

        <div className="wrapper">
            <div className="container">
            <h1>ورود</h1>

                <form onSubmit={formik.handleSubmit} className="form">
                    <input autoComplete="off" onChange={formik.handleChange} type="text" name="username" placeholder="کدملی" />
                    <span> {formik.errors.username}</span>

                    <input autoComplete="off" onChange={formik.handleChange} type="password" name="password" placeholder="کلمه عبور" />
                    <span>{formik.errors.password}</span>


                    <button


                        type="submit" id="login-button">ثبت</button>
                </form>
            </div>

            <ul className="bg-bubbles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

    )
}