'use client'

import 'leaflet/dist/leaflet.css'

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from 'react-leaflet'

const alumniLocations = [
  {
    name: 'Rahul Sharma',
    company: 'Google',
    country: 'USA',
    position: [37.7749, -122.4194],
  },
  {
    name: 'Priya Verma',
    company: 'Microsoft',
    country: 'London',
    position: [51.5072, -0.1276],
  },
  {
    name: 'Aman Patel',
    company: 'Amazon',
    country: 'Bangalore',
    position: [12.9716, 77.5946],
  },
  {
    name: 'Sarah Khan',
    company: 'Meta',
    country: 'Dubai',
    position: [25.2048, 55.2708],
  },
  {
    name: 'Ananya Rao',
    company: 'Tesla',
    country: 'Canada',
    position: [43.6532, -79.3832],
  },
]

export default function AlumniMap() {
  return (
    <div className="w-full h-[500px] rounded-[32px] overflow-hidden border border-white/10">

      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {alumniLocations.map((alumni, index) => (
          <CircleMarker
            key={index}
            center={alumni.position as [number, number]}
            radius={10}
            pathOptions={{
              color: '#a855f7',
              fillColor: '#9333ea',
              fillOpacity: 0.8,
            }}
          >
            <Popup>
              <div className="text-black">
                <h3 className="font-bold">
                  {alumni.name}
                </h3>

                <p>{alumni.company}</p>

                <p>{alumni.country}</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  )
}