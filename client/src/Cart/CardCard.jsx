import React from 'react'


const CardCard = ({carditem}) => {
console.log(carditem.image)
  return (
    <div className="flex justify-center">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={carditem.image} alt="Sunset in the mountains" />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{carditem.name}</div>
          <p className="text-gray-700 text-base">
            {carditem.description}
          </p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">${carditem.price}</span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">{carditem.quantity}</span>
        </div>
      </div>
    </div>

  )
}

export default CardCard