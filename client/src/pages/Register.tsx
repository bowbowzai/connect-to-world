import React, { useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'

import { countriesFlags } from "../constants/countries"

interface CountryOptionProps {
  data: {
    value: string;
    label: string;
    flag: string;
  };
  innerProps: any;
  innerRef: any;
}

const CountryNameAndFlag = ({ data, innerProps, innerRef }: CountryOptionProps) => {
  return <div ref={innerRef} {...innerProps} className={`cursor-pointer px-2 py-1 text-lg flex items-center gap-1 hover:bg-blue-200`}>
    <img src={data.flag} alt={data.label} className='rounded-full w-8 h-8' />
    <p>{data.label}</p>
  </div>
}

const Register = () => {
  const navigate = useNavigate()

  const countries = useMemo(() => {
    let options: {
      value: string;
      label: string;
      flag: string;
    }[] = []
    countriesFlags.map(item => {
      options.push({
        value: item.code,
        label: item.name,
        flag: item.image
      })
    })
    return options
  }, [])
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isDisabled ? 'red' : "rgb(249 250 251)",
      border: state.isFocused ? '2px solid blue' : '1px solid gray',
      boxShadow: state.isFocused ? '#d1d5db' : '#d1d5db',

      borderColor: "black",
      outline: "black"
    }),
  };
  return (
    <div>
      <section className="mt-10">
        <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                  <Select
                    options={countries}
                    components={{
                      Option: CountryNameAndFlag
                    }}
                    styles={customStyles}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <a
                    onClick={() => navigate("/login")}
                    className="cursor-pointer font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register