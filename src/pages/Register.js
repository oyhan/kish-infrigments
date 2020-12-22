import React, { useEffect } from 'react';
import "../styles/login.css"
import CamSDK from 'camunda-bpm-sdk-js'
import { Base64 } from 'js-base64';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import userManager from '../infrastructure/userManager';
import { Redirect, useHistory } from 'react-router-dom'

export default function Register() {
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

    const groupService = new camClient.resource('group');


    const onSubmit = (e) => {

        // if(formik.values.confirmpassword !== formik.values.password) {
        //     alert("کلمه عبور مطابقت ندارد")
        // }

        // if (!formik.isValid) return;



        userService.create(formik.values, (res) => {
            if (res == null) {
                groupService.createMember({ id: "drivers", userId: formik.values.id }, (addToGroup) => {
                    if (addToGroup == null) {

                        toast.info("ممنون از ثبت نام شما");

                        const user = {
                            username: formik.values.id,
                            firstName: formik.values.firstName,
                            lastName: formik.values.lastName,
                            email: formik.values.email,
                            password: formik.values.password,
                        }
                        userManager.Save(user);

                        window.location = "/home";
                    }

                    toast.error(addToGroup.toString());

                })

            }
            else
                toast.error(res.toString());

        })


    }

    const formik = useFormik({
        initialValues: {
            id: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmpassword: "",
            email: "",

        },
        validationSchema: Yup.object({
            id: Yup.string().
                required("کدملی  خود را وارد کنید").
                nationalCode("کدملی درست وارد کنید"),
            password: Yup.string().
                required("یک رمز عبور حداقل 6 رقمی وارد کنید"),
            confirmpassword: Yup.string().
                required("تایید کلمه عبور اجباریست"),
            firstName: Yup.string().
                required("نام خود را وارد کنید"),
            lastName: Yup.string().
                required("نام خانوادگی خود را وارد کنید"),
            email: Yup.string().email("ایمیل معتبر وارد کنید").
                required("ایمیل اجباری می باشد"),
        }),
        onSubmit: onSubmit
    });

    if (userManager.Load()) return <Redirect to="/home" />

    else return (


        <div className="container">
            <h1>ثبت نام</h1>

            <form onSubmit={formik.handleSubmit} className="form">
                <input autoComplete="off" onChange={formik.handleChange} type="text" name="firstName" placeholder="نام" />
                <span> {formik.errors.firstName}</span>

                <input autoComplete="off" onChange={formik.handleChange} type="text" name="lastName" placeholder="نام خانوادگی" />
                <span>{formik.errors.lastName}</span>

                <input autoComplete="off" onChange={formik.handleChange} type="text" name="id" placeholder="کدملی" />
                <span>{formik.errors.id}</span>

                <input autoComplete="off" onChange={formik.handleChange} type="text" name="email" placeholder="Email" />
                <span>{formik.errors.email}</span>

                <input autoComplete="off" onChange={formik.handleChange} type="password" name="password" placeholder="کلمه عبور" />
                <span>{formik.errors.password}</span>

                <input autoComplete="off" onChange={formik.handleChange} type="password" name="confirmpassword" placeholder="تکرار کلمه عبور" />
                <span>{formik.errors.confirmpassword}</span>


                <button


                    type="submit" id="login-button">ثبت</button>
            </form>
        </div>



    )
}