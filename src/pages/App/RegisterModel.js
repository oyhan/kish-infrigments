import * as Yup from 'yup'
import UserManager from '../../infrastructure/userManager';
var user = UserManager.Load();






var RegisterModel = {

    plateNumber: "",
    vehicleCode: "",
    name: "",
    mobileNumber  : "",
    lastName: "",
    drivingLicenseTypeNumber: "",
    nationalCode: "",
    vehicleOwnerType: "",
    vehicleType: "",
    // fraudTitle: "",
    fraudDate: "",
    // fraudOrigin: "",
    // fraudDest: "",
    fraudTime: "",
    frauds  : []

}



export const ValidationSchema = Yup.object({

    vehicleType: Yup.string().
        required("نوع خودرو را مشخص کنید"),
    plateNumber: Yup.string().typeError((param) => `"${param.originalValue}" عدد نیست`).
        required("پلاک خودرو را وارد کنید"),
    vehicleCode: Yup.number().
        required("کد خودرو را وارد کنید"),

    vehicleOwnerType: Yup.string().
        required("نوع مالکیت را وارد کنید"),
    name: Yup.string().
        required("نام خود را وارد کنید"),
    lastName: Yup.string().
        required("نام خانوادگی اجباری است"),

    nationalCode: Yup.string().
        required("کدملی اجباری می باشد").
        nationalCode("کد ملی را صحیح وارد کنید"),

    drivingLicenseTypeNumber: Yup.number().
        required("شماره گواهینامه را وارد کنید"),

    // fraudTitle: Yup.string().
    //     required("عنوان تخلف را وارد کنید "),
    fraudDate: Yup.string().
        required("اجباری"),
    // fraudOrigin: Yup.string().
    //     required("اجباری"),
    // fraudDest: Yup.string().
    //     required("اجباری"),
    fraudTime: Yup.string().
        required("اجباری"),




})

export default RegisterModel;
