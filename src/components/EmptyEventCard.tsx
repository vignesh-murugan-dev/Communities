import { CalendarX } from 'phosphor-react'

const EmptyEventCard = ({ message = "No events scheduled for this period" }: { message?: string }) => {
  return (
    <div className="col-span-full flex flex-col items-center justify-center p-8 border-2 border border-gray-200 rounded-xl bg-gray-50">
      <CalendarX size={48} className="text-gray-400 mb-4" weight="thin" />
      <p className="text-gray-500 text-lg text-center">{message}</p>
      <p className="text-gray-400 text-sm mt-2 text-center">Check back later for updates</p>
    </div>
  )
}

export default EmptyEventCard 