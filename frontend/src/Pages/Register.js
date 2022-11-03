import { React, useState, useEffect } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';
import { auth, firebase } from '../service/Firebase';
import axios from 'axios'

const Register = ({ setOpen }) => {
  const [step, setStep] = useState(1)
  const [sendOTP, setSendOTP] = useState("")

  const { register, formState: { errors, ...formState }, handleSubmit } = useForm({
    defaultValues: {
      fname: 'preet',
      lname: 'patel',
      uname: 'prt',
      email: 'ppa@narola.email',
      password: 'prpatel',
      confirmPassword: 'prpatel',
      mobile: '9558432205',
      otp: '',
    }
  }
  );
  const onSubmit = (data) => {
    setStep(2)
  }

  const handleOtpsubmit = (data) => {
    console.log(data);
    if (data.mobile !== "") {
      let mobile_number = "+91" + data.mobile
      let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container',
        {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          }
        }
      );
      auth.signInWithPhoneNumber(mobile_number, verify).then((result) => {
        setSendOTP(result)
        setStep(3)
      })
        .catch((err) => {
          alert(err);
          window.location.reload()
        });
    } else {
      alert("please enter data.mobile number!!")
    }
    
  }
  const registerCall = (data) => {
    const postdata={
      fname: data.fname,
    lname: data.lname,
    email: data.email,
    uname: data.uname,
    password: data.password,
    confirmPassword: data.confirmPassword
    }
    console.log("postdata",postdata);
    axios
      .post('http://localhost:8080/api/v1/register', postdata)
      .then((response) => {
        alert("register successfully")
        setOpen(false)
        console.log("response",response);
      });

      // axios({  
      //   method: 'post',  
      //   url: 'http://localhost:8080/api/v1/register',  
      //   data: {  
      //     fname: data.fname,
      //     lname: data.lname,
      //     email: data.email,
      //     uname: data.uname,
      //     password: data.password,
      //     confirmPassword: data.confirmPassword 
      //   }  
      // });  
  }

  const handleVerifyOTP = (data) => {
    registerCall(data)
    if (data.otp === null)
      return;
    sendOTP.confirm(data.otp).then((result) => {
      alert("register successfully")
      setOpen(false)
    }).catch((err) => {
      alert("Wrong code");
    })
  }

  const FirstStep = () => {
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <label>First Name</label>
          <input type="text" {...register("fname", { required: "This is required." })} placeholder='First Name' />
          <ErrorMessage errors={errors} name="fname" />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input type="text" {...register("lname", { required: "This is required." })} placeholder='Last Name' />
          <ErrorMessage errors={errors} name="lname" />

        </Form.Field>
        <Form.Field>
          <label>User Name</label>
          <input type="text" {...register("uname", { required: "This is required." })} placeholder='User Name' />
          <ErrorMessage errors={errors} name="uname" />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input type="email"
            {...register("email",
              {
                required: "This is required.", pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address"
                }
              })
            }
            placeholder='Email' />
          <ErrorMessage errors={errors} name="email" />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" {...register("password", { required: "This is required." })} placeholder='Password' />
          <ErrorMessage errors={errors} name="password" />
        </Form.Field>
        <Form.Field>
          <label>ConfirmPassword</label>
          <input type="password" {...register("confirmPassword", { required: "This is required." })} placeholder='Confirm Password' />
          <ErrorMessage errors={errors} name="confirmPassword" />
        </Form.Field>
        <Form.Field>
          <Checkbox label='I agree to the Terms and Conditions of WeShare' />
        </Form.Field>
        <Button type='submit' >Continue</Button>
      </Form>
    )
  }

  const SecondStep = () => {
    return (
      <>
        <Form onSubmit={handleSubmit(handleOtpsubmit)}>
          <Form.Field>
            <label>User Name</label>
            <input type="text" name="mobile" {...register("mobile", { required: "This is required." })} placeholder='mobile' />
            <ErrorMessage errors={errors} name="mobile" />
          </Form.Field>
          <Button type='submit' >Send OTP</Button>
        </Form>
      </>
    )
  }


  const ThirdStep = () => {
    return (
      <>
        <Form onSubmit={handleSubmit(handleVerifyOTP)}>
          <Form.Field>
            <label>OTP verify</label>
            <input type="text" name="otp" {...register("otp", { required: "This is required." })} placeholder='Enter OTP' />
            <ErrorMessage errors={errors} name="otp" />
          </Form.Field>
          <Button type='submit' >Verify</Button>
        </Form>
      </>
    )
  }
  let RegisterForm = () => <FirstStep />
  switch (step) {
    case 1:
      RegisterForm = () => <FirstStep />
      break;
    case 2:
      RegisterForm = () => <SecondStep />
      break;
    case 3:
      RegisterForm = () => <ThirdStep />
      break;
    default:
      RegisterForm = () => <FirstStep />

  }
  useEffect(() => {
  }, [step])

  return (
    <>
      <RegisterForm />
      <div id="recaptcha-container"></div>
    </>
  )

}

export default Register