import { useFormik } from "formik";
import * as Yup from 'yup';
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const serverURL = process.env.NEXT_PUBLIC_BASED_SERVER_URL
export default function Inscription(props: {handleReservation: (_reservation: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  nb_ticket: number;
} )=> void, handleBack: () => void}) {
  const [loading, setLoading] = useState(false)
  const {handleReservation, handleBack} = props
  const formik = useFormik({

    initialValues: {
      firstName: "",
      lastName: "",
      email: '',
      phoneNumber: 0,
      nb_ticket: 0
    },
    validationSchema: Yup.object({
      firstName:   Yup.string().required("your first name is required").min(4, 'your last name have to get at least 4 characters'),
      lastName:    Yup.string().required("your first name is required").min(4, 'your last name have to get at least 4 characters'),
      email:       Yup.string().required("your Email is required").email('E-mail invalid'),
      phoneNumber: Yup.number().required("your phone number is required").min(19000000,"your phone number have to get at least 8 numbers").max(100000000, "your phone number have not passed 8 numbers"),
      nb_ticket:   Yup.number().required("please select at least 1 ticket").min(1,"your ticket number have to passe at least one").max(10, "your can't reserve more than 10 tickets"),

    }),
    validateOnMount: true,
    onSubmit: async(values) => {
      const {firstName, lastName, email, nb_ticket, phoneNumber} = values
      if (!Object.values(formik.errors).some(error => console.error(error)) && formik.isValid) {
        const newUser = {
          firstName,
          lastName,
          email,
          nb_ticket,
          phoneNumber
        };
        setLoading(true)
        try {
          await axios.get(`${serverURL}test`)

          const response = await axios.post(`${serverURL}reservation/add`, newUser)
          const {data, status} = response
          console.log(data, status)
          if (status === 200) {
            toast.success(data.message)
            handleReservation(newUser)
          } else {
            toast.info("please put valid information")
          }
        } catch (error) {
          console.error(error)
          toast.error("server in maintain please tray later")
        }  finally {
          setLoading(false)
        }
      }
    },
  });

  return (
        <form onSubmit={formik.handleSubmit}>
          {/* lastName input */}
          <div className="relative w-full mb-7">
            <label  
              className={`absolute w-fit px-1 py-0 h-5 -top-2 left-4 text-center text-xs leading-[14px] rounded-lg font-medium text-primary ${formik.touched.lastName && !formik.errors.lastName ? "bg-[#cee6d7]": "bg-[#FCFBFF]"}  `}
            >
              Last name<span className="text-[var(--red-lava)] font-normal">*</span>
            </label>
            <input
              className="w-full px-4 py-3 text-base leading-[18px] font-normal border border-solid border-[var(--neutral-gray)] laceholder-orange-600
              focus:outline-none rounded-xl bg-[#FCFBFF]"
              type="text"
              name="lastName"
              placeholder="please put your last name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.lastName && formik.errors.lastName && 
            <div className="flex items-center justify-start gap-1 px-4 py-[0.375rem] bg-[#FEEFEF] rounded-xl -mt-5 mb-5">
              <Image width={20} height={20} src="/erreur-icon.png" alt="erreur icon" />
              <span className="text-xs leading-[0.625rem] font-normal text-[#DA1414]">{formik.errors.lastName}</span>
            </div>
          }
          {/* firstName input */}
          <div className="relative w-full mb-7">
            <label  
              className={`absolute w-fit px-1 py-0 h-5 -top-2 left-4 text-center text-xs leading-[14px] rounded-lg font-medium text-primary ${formik.touched.firstName && !formik.errors.firstName ? "bg-[#cee6d7]": "bg-[#FCFBFF]"} `}
            >
              First name<span className="text-[var(--red-lava)] font-normal">*</span>
            </label>
            <input
              className="w-full px-4 py-3 text-base leading-[18px] font-normal border border-solid border-[var(--neutral-gray)] laceholder-orange-600
              focus:outline-none rounded-xl bg-[#FCFBFF]"
              type="text"
              name="firstName"
              placeholder="please put your first name"              
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.firstName  && formik.errors.firstName &&
            <div className="flex items-center justify-start gap-1 px-4 py-[0.375rem] bg-[#FEEFEF] rounded-xl -mt-5 mb-5">
              <Image width={20} height={20} src="/erreur-icon.png" alt="erreur icon" />
              <span className="text-xs leading-[0.625rem] font-normal text-[#DA1414]">{formik.errors.firstName}</span>
            </div>
          }

          {/* Email input */}
          <div className="relative w-full mb-7">
            <label
              className={`absolute w-fit px-1 py-0 h-5 -top-2 left-4 text-center text-xs leading-[14px] rounded-lg font-medium text-primary ${formik.touched.email && !formik.errors.email ? "bg-[#cee6d7]": "bg-[#FCFBFF]"} `}
              >
              E-mail<span className="text-[var(--red-lava)] font-normal">*</span>
            </label>
            <input
              className="w-full px-4 py-3 text-base leading-[18px] font-normal border border-solid border-[var(--neutral-gray)] laceholder-orange-600 focus:outline-none rounded-xl bg-[#FCFBFF]"
              type="email"
              name="email"
              placeholder="please put valid email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.email  && formik.errors.email &&
            <div className="flex items-center justify-start gap-1 px-4 py-[0.375rem] bg-[#FEEFEF] rounded-xl -mt-5 mb-5">
              <Image width={20} height={20} src="/erreur-icon.png" alt="erreur icon" />
              <span className="text-xs leading-[0.625rem] font-normal text-[#DA1414]">{formik.errors.email}</span>
            </div>
          }
          
          {/* phoneNumber input */}
          <div className="relative w-full mb-7">
            <label
              className={`absolute w-fit px-1 py-0 h-5 -top-2 left-4 text-center text-xs leading-[14px] rounded-lg font-medium text-primary ${formik.touched.phoneNumber && !formik.errors.phoneNumber ? "bg-[#cee6d7]": "bg-[#FCFBFF]"} `}
              > 
              Phone number<span className="text-[var(--red-lava)] font-normal">*</span>
            </label>
            <input
              className="w-full px-4 py-3 text-base leading-[18px] font-normal border border-solid border-[var(--neutral-gray)] placeholder-orange-600
              focus:outline-none rounded-xl bg-[#FCFBFF]"
              type="number"
              name="phoneNumber"
              placeholder="please put a valid phone number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.phoneNumber  && formik.errors.phoneNumber &&
            <div className="flex items-center justify-start gap-1 px-4 py-[0.375rem] bg-[#FEEFEF] rounded-xl -mt-5 mb-5">
              <Image width={20} height={20} src="/erreur-icon.png" alt="erreur icon" />
              <span className="text-xs leading-[0.625rem] font-normal text-[#DA1414]">{formik.errors.phoneNumber}</span>
            </div>
          }

            {/* nb_ticket input */}
          <div className="relative w-full mb-7">
            <label
              className={`absolute w-fit px-1 py-0 h-5 -top-2 left-4 text-center text-xs leading-[14px] rounded-lg font-medium text-primary ${formik.touched.nb_ticket && !formik.errors.nb_ticket ? "bg-[#cee6d7]": "bg-[#FCFBFF]"} `}
              >
              tickets number<span className="text-[var(--red-lava)] font-normal">*</span>
            </label>
            <input
              className="w-full px-4 py-3 text-base leading-[18px] font-normal border border-solid border-[var(--neutral-gray)] laceholder-orange-600
              focus:outline-none rounded-xl bg-[#FCFBFF]"
              type="number"
              name="nb_ticket"
              placeholder="please push your ticket number"
              value={formik.values.nb_ticket}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.nb_ticket && formik.errors.nb_ticket && 
            <div className="flex items-center justify-start gap-1 px-4 py-[0.375rem] bg-[#FEEFEF] rounded-xl -mt-5 mb-5">
              <Image width={20} height={20} src="/erreur-icon.png" alt="erreur icon" />
              <span className="text-xs leading-[0.625rem] font-normal text-[#DA1414]">{formik.errors.nb_ticket}</span>
            </div>
          }
                            <div className="flex gap-[15px] justify-end mt-8">
                    <div style={{display: loading ? "none": "block"}}>
                      <button
                      disabled={loading}
                        onClick={handleBack}
                        className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
                        style={{
                          boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                        }}
                      >
                       Previous step
                      </button>
                    </div>
                    <div>
                      <button
                      disabled={loading}
                      type="submit"
                        className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                        style={{
                          boxShadow:
                            "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        <span> {loading ? "reservation in progress":"Confirm"} </span>
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.75 6.75L19.25 12L13.75 17.25"
                            stroke="#FFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 12H4.75"
                            stroke="#FFF"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
        </form>
  );
}