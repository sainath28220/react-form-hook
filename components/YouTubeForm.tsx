import React from "react";
import { useForm, useFieldArray, FieldErrors } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
export const YouTubeForm = () => {
  type FormValues = {
    username: string;
    email: string;
    channel: string;
    social: {
      twitter: string;
      facebook: string;
    };
    phoneNumbers: string[];
    phNumbers: {
      number: string;
    }[];
    age: number;
    dob: Date;
  }

  const form = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
      channel: '',
      social: {
        twitter: '',
        facebook: ''
      },
      phoneNumbers: ['',''],
      phNumbers: [{number: ''}],
      age: 0,
      dob: new Date(),
    },
    // mode: "onBlur" or "onTouched"

    // defaultValues: async () => {
    //   const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    //   const data = await response.json ()
    //   return {
    //   username: "Batman",
    //   email: data.email,
    //   channel: ""
    //   }
    // }

  });
  const { register,control, handleSubmit, formState, watch, getValues, setValue, reset, trigger } = form;
  const { errors, dirtyFields, touchedFields, isDirty, isValid, isSubmitted, isSubmitting, isSubmitSuccessful, submitCount } = formState;
  // console.log({isSubmitted,isSubmitting,isSubmitSuccessful});

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  const handleGetValues = () => {
    console.log("Get Values", getValues());
  }

  const handleSetValues = () => {
    setValue("username","sainath")
  }

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Erros",errors);
  }

  // watch will rerender the values on screen
  // const watchUserName = watch("username");
  // console.log(watchUserName)

  return(
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <label htmlFor="username">UserName</label>
        <input id="username" {...register("username",{
          required:{
            value: true,
            message: 'UserName Is Required'
          }
        })} type="text" />
        <p>{errors.username?.message}</p>
        
        <label htmlFor="email">Email</label>
        <input type="email" {...register("email",{
          pattern:{
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~~]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: 'Invalid Email Format'
          },
          validate: {
            notAdmin: (fieldValue) => {
              return ( fieldValue !== "admin@example.com" || "Enter a different email address");
            },
            notBlackListed: (fieldValue) => {
              return (!fieldValue.endsWith("baddomain.com") || "This domain is not supported");
            },
            emailAvailable: async (fieldValue) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
            const data = await response.json();
            return data.length == 0 || "Email already exists";
          },
          },
        })} id="email" />
        <p>{errors.email?.message}</p>

        <label htmlFor="channel">Channel</label>
        <input type="text" {...register("channel",{
          required: 'Channel is required'
        })} id="channel" />
        <p>{errors.channel?.message}</p>

        <label htmlFor="age">Age</label>
        <input type="number" {...register("age",{ valueAsNumber: true, required: "Age is required" })} id="age" />
        <p>{errors.age?.message}</p>

        <label htmlFor="dob">Date Of Birth</label>
        <input type="date" {...register("dob",{ valueAsDate: true, required: "dob is required" })} id="dob" />
        <p>{errors.dob?.message}</p>

        <label htmlFor="twitter">Twitter</label>
        <input type="text" {...register("social.twitter", {required: "Twitter field is required"})} id="twitter" />
        <p>{errors.social?.twitter?.message}</p>

        <label htmlFor="facebook">facebook</label>
        <input type="text" {...register("social.facebook" ,{required: 'Facebook field is required'})} id="facebook" />
        <p>{errors.social?.facebook?.message}</p>

        <label htmlFor="primary-phone">Primary Number</label>
        <input type="text" {...register("phoneNumbers.0", { required: "Primary number is required" })} id="primary-phone" />
        <p>{errors.phoneNumbers?.[0]?.message}</p>

        <label htmlFor="secondary-phone">Secondary Number</label>
        <input type="text" {...register("phoneNumbers.1",{ required: "Secondary number is required" })} id="secondary-phone" />
        <p>{errors.phoneNumbers?.[1]?.message}</p>


        <button disabled={!isDirty}>submit</button>
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => trigger()}>Trigger</button>
        <button type="button" onClick={handleGetValues}>Get Values</button>
        <button type="button" onClick={handleSetValues}>Set Values</button>
      </form>
      <DevTool control={control} />
    </div>
  )
};