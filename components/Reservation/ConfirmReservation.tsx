import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { Fragment, useState } from 'react'

const serverURL = process.env.NEXT_PUBLIC_BASED_SERVER_URL


export default function ConfirmReservation(props: {children: JSX.Element, _id:string, token: string}) {
    const {children, _id, token} = props
  let [isOpen, setIsOpen] = useState(false)
  let [isLoaded, setIsLoaded] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  async function confirmPayment() {
    setIsLoaded(true)
    try {
      const response = await axios.post(`${serverURL}/generate/ticket/${_id}`, {}, {headers: {token}})
      const {data} = response.data
      alert("success")
      console.log(data)
  } catch (error) {
      console.log(error)
      alert("try again")

  } finally {
    setIsLoaded(false)
    closeModal()
  }
  }
  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
        >
          {children}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-fit max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={confirmPayment}
                    >
                      {isLoaded ? "Loading...":"Confirm payment"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
