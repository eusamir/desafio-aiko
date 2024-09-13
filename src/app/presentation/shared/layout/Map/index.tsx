'use client'

import { useEffect, useState } from 'react';

import L, { LatLngExpression } from 'leaflet'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React from 'react';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
})

interface MapProps{
  local:{
    x: number
    y:number
  }
}

export default function Map({ local }: MapProps) {
  const [andress, setAndress] = useState<[number, number] | []>([])

  useEffect(() => {
    const fecth = async () => {
      try {
        setAndress([local.x, local.y,])
        console.log(andress)
      } catch (err) {
        console.log(err)
      }
    }
    fecth()
  }, [])

  return(
    <div>
      <MapContainer scrollWheelZoom={true} center={andress as LatLngExpression} zoom={16} style={{ height: '100vh', width: '100wh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={andress as LatLngExpression}>
        </Marker>
      </MapContainer>
    </div>
  )
}
