import axios from "axios"
import { useEffect, useState } from "react"
import ConfirmReservation from "./ConfirmReservation"
import { CheckBadgeIcon } from "@heroicons/react/20/solid"

  const serverURL = process.env.NEXT_PUBLIC_BASED_SERVER_URL

export default function Reservation(props:{token:string}) {
    const {token} = props
    const [queryText, setQeryText] = useState("")
    const [queryType, setQueryType] = useState("phoneNumber")
    const [reservationList, setReservationList] = useState([])
    useEffect(()=> {
        async function getReservationList(_queryText : string, _queryType: string) {
            try {
                const response = await axios.get(`${serverURL}reservation/getReservations?${queryType}=${queryText}`, {headers: {token}})
                const {data} = response.data
                if (response.data === 404) {
                    setReservationList([])
                } else {
                    setReservationList(data)
                }
            } catch (error) {
                setReservationList([])

            }
        }
        getReservationList(queryText, queryType)
    }, [queryText, queryType])
    console.log(reservationList, "reservationList")
  return (
    <div>
      <div className="my-20">
 
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="price"
            id="price"
            value={queryText}
            onChange={(e)=> setQeryText(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="search input"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Type
            </label>
            <select
              id="currency"
              name="currency"
              value={queryType}
              onChange={(e)=> setQueryType(e.target.value)}
              className="h-full rounded-md border-0 bg-transparent  text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option value={"phoneNumber"}>phoneNumber</option>
              <option value={"email"}>email</option>
              <option value={"firstName"} >firstName</option>
              <option value={"lastName"}>lastName</option>
            </select>
          </div>
        </div>
      </div>
      <ul role="list" className="divide-y divide-gray-100">
          {reservationList && reservationList.map((reservation: {
            _id: string,
            status: boolean,
            userDetails:   {email : string, lastName: string, firstName: string, phoneNumber:string},
            ticketDetails: {nb_ticket : number, price: number}
          }) => {
            const person = reservation.userDetails 
            const ticket = reservation.ticketDetails
            return (
            <li key={person.email} className="flex justify-between gap-x-6 py-5">
              {reservation.status ? <CheckBadgeIcon width={20} color="green"/>: <>not payed</>}
              <ConfirmReservation _id={reservation._id} token={token}>
              <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto text-start">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{person.firstName} {person.lastName}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                </div>
              </div>
              </ConfirmReservation>
              
              <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto text-end">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{ticket.nb_ticket} ticket  {ticket.price} DT = {ticket.nb_ticket * ticket.price} </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.phoneNumber}</p>
                </div>
              </div>
              
            </li>
          )})}
        </ul>
    </div>
  )
}