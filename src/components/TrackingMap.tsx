"use client";

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useMemo, useRef } from "react";
import L from "leaflet";

// Fix for default Leaflet marker icons in Next.js
// We do this outside the component to ensure it's only done once
if (typeof window !== 'undefined') {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
}

// Custom Arrow Icon for the Truck
const createArrowIcon = (rotation: number) => {
  return L.divIcon({
    className: "custom-arrow-marker",
    html: `<div style="
      transform: rotate(${rotation}deg);
      width: 40px;
      height: 40px;
      background: #0d6efd;
      border: 2px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    ">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
    </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

// Generate smooth interpolation between points
const generatePath = (coords: [number, number][], steps: number) => {
  if (!coords || coords.length < 2) return [];
  const path: [number, number][] = [];
  for (let i = 0; i < coords.length - 1; i++) {
    const start = coords[i];
    const end = coords[i + 1];
    for (let j = 0; j <= steps; j++) {
      const lat = start[0] + (end[0] - start[0]) * (j / steps);
      const lng = start[1] + (end[1] - start[1]) * (j / steps);
      path.push([lat, lng]);
    }
  }
  return path;
};

interface TrackingMapProps {
    onUpdateStatus: (speed: number, dist: number, location: string) => void;
    route?: [number, number][];
}

export default function TrackingMap({ onUpdateStatus, route = [] }: TrackingMapProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [realRoutePath, setRealRoutePath] = useState<[number, number][]>([]);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [currentLocationName, setCurrentLocationName] = useState("In Transit");
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(null);
  
  const locNameRef = useRef("In Transit");
  const initialCenter = useMemo(() => route[0] || [27.7172, 85.3240], [route]);

  // Fetch real route from OSRM
  useEffect(() => {
    if (!route || route.length < 2) {
        setRealRoutePath([]);
        return;
    }

    const fetchRoute = async () => {
        setIsLoadingRoute(true);
        try {
            const samplingRate = route.length > 20 ? 3 : 1;
            const waypoints = route.filter((_, i) => i === 0 || i === route.length - 1 || i % samplingRate === 0);
            const coordinates = waypoints.map(p => `${p[1]},${p[0]}`).join(';');
            const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;
            
            const response = await fetch(url);
            const data = await response.json();

            if (data.code === 'Ok' && data.routes && data.routes[0]) {
                const geoJsonCoords = data.routes[0].geometry.coordinates;
                const latLngs: [number, number][] = geoJsonCoords.map((c: number[]) => [c[1], c[0]]);
                setRealRoutePath(latLngs);
            } else {
                setRealRoutePath(route);
            }
        } catch (error) {
            setRealRoutePath(route);
        } finally {
            setIsLoadingRoute(false);
        }
    };

    fetchRoute();
  }, [route]);

  const activePath = realRoutePath.length > 0 ? realRoutePath : route;

  const smoothPath = useMemo(() => {
     if (activePath.length === 0) return [];
     const steps = activePath.length > 100 ? 1 : 10; 
     return generatePath(activePath, steps);
  }, [activePath]);

  useEffect(() => {
      if (smoothPath.length > 0) {
          setMarkerPos(smoothPath[0]);
          setCurrentStep(0);
      }
  }, [smoothPath]);

  const fetchLocationDetails = async (lat: number, lng: number) => {
      try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=14`);
          const data = await response.json();
          if (data && data.address) {
              const name = data.address.village || data.address.town || data.address.city || data.address.suburb || data.address.county || "Highway";
              const district = data.address.state_district || data.address.state || "";
              const fullName = district ? `${name}, ${district}` : name;
              locNameRef.current = fullName;
              setCurrentLocationName(fullName);
          }
      } catch (e) {}
  };

  useEffect(() => {
    if (smoothPath.length === 0) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = (prev + 1) % smoothPath.length;
        const currentPos = smoothPath[prev];
        const nextPos = smoothPath[next];
        
        if (nextPos) {
            setMarkerPos(nextPos);
            if (currentPos) {
                const dx = nextPos[0] - currentPos[0];
                const dy = nextPos[1] - currentPos[1];
                if (Math.abs(dx) > 0.00001 || Math.abs(dy) > 0.00001) {
                    setRotation(Math.atan2(dy, dx) * (180 / Math.PI));
                }
            }
        }

        const distanceRemaining = 200 - (prev / smoothPath.length) * 200;
        const currentSpeed = 40 + Math.random() * 20;
        
        if (prev % 100 === 0 && currentPos) {
            fetchLocationDetails(currentPos[0], currentPos[1]);
        }

        onUpdateStatus(Math.floor(currentSpeed), distanceRemaining, locNameRef.current);
        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [smoothPath, onUpdateStatus]);

  // Use a stable MapContainer and conditionally render children
  // This avoids the 'appendChild' error caused by MapContainer unmounting/remounting
  return (
    <div className="w-100 h-100 position-relative">
      <MapContainer 
        center={initialCenter} 
        zoom={9} 
        style={{ height: "100%", width: "100%", background: "#e5e9ec" }} 
        scrollWheelZoom={true}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Street View">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        
        {activePath.length > 0 && <Polyline positions={activePath} color="#0d6efd" weight={5} opacity={0.7} />}
        
        {markerPos && (
          <Marker position={markerPos} icon={createArrowIcon(rotation)}>
            <Popup>
              <div className="text-center">
                <strong>Current Location</strong><br />
                <span className="text-primary fw-bold">{currentLocationName}</span>
                <div className="small text-muted mt-1">
                  Lat: {markerPos[0].toFixed(4)}, Lng: {markerPos[1].toFixed(4)}
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {isLoadingRoute && (
          <div className="position-absolute top-50 start-50 translate-middle z-3 bg-white p-3 rounded shadow-sm border">
              <div className="d-flex align-items-center gap-2">
                  <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
                  <span className="fw-bold">Calculating Highway Route...</span>
              </div>
          </div>
      )}
    </div>
  );
}