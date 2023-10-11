import { CheckBadgeIcon } from '@heroicons/react/20/solid'

export default function Summary(props: {reservationDetails: {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number;
  nb_ticket?: number;
}}) {
  const {reservationDetails} = props
  const {email, firstName, lastName, nb_ticket, phoneNumber} = reservationDetails
  return (
    <div>
      <div className='bg-green-200 p-4 border-b border-gray-300 rounded-lg flex text-center w-fit m-auto mb-40'>
        <CheckBadgeIcon width={24} color="white" />
        <div>
          <p className='text-base font-semibold leading-7 text-gray-900'>
            reservation success {firstName}  {" "} {lastName}
          </p>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            your reservation is added to our data base and we send you an email for confirmation.
          </p>
        </div>
      </div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Reservation Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Recap for your reservation.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{firstName} {" "} {lastName}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Phone number</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{phoneNumber}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Tickets price</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{nb_ticket} tickets X 7 DT = <span>{(nb_ticket || 0) * 7 } DT</span> </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Informations</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            “ We are  delighted to inform you that your reservation for the upcoming event, ` Basboussa 1.0 ` has been successfully processed.  please to check your email for payment details to complete the payment process and secure your ticket.
              ” <span> please check spam message if you can{"'"}t find your email  </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
