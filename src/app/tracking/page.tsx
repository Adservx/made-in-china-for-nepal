"use client";

import { Search, MapPin, Package, Truck, CheckCircle, Navigation, Gauge, Map as MapIcon, Crosshair, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { TRACKING_DB, TrackingData } from "@/data/tracking";

// Dynamically import the Map component to avoid SSR issues with Leaflet
const TrackingMap = dynamic(() => import("@/components/TrackingMap"), {
  ssr: false,
  loading: () => (
    <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading Map...</span>
      </div>
    </div>
  ),
});

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [error, setError] = useState("");
  
  // Map Simulation States
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [currentLocation, setCurrentLocation] = useState("Unknown");

  const handleTrack = () => {
      setError("");
      setTrackingData(null);
      const id = trackingNumber.trim().toUpperCase();
      
      if (!id) {
          setError("Please enter a tracking number.");
          return;
      }

      const data = TRACKING_DB[id];
      if (data) {
          setTrackingData(data);
          // Reset map states
          setSpeed(0);
          setDistance(0);
          setCurrentLocation(data.currentLocation);
      } else {
          setError(`No tracking information found for ID: ${id}`);
      }
  };

  const handleStatusUpdate = useCallback((s: number, d: number, loc: string) => {
    setSpeed(s);
    setDistance(d);
    setCurrentLocation(loc);
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-3">Track Your Shipment</h2>
            <p className="text-muted">Enter your tracking number to see the current status of your order.</p>
          </div>
          
          <div className="card border-0 shadow-sm p-4 mb-5 mx-auto" style={{maxWidth: '800px'}}>
            <div className="input-group input-group-lg">
              <input 
                type="text" 
                className="form-control border-secondary" 
                placeholder="Tracking Number (e.g. MCN-882190)" 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              />
              <button className="btn btn-dark px-5 fw-bold" onClick={handleTrack}>Track Now</button>
            </div>
            {error && (
                <div className="mt-3 text-danger d-flex align-items-center gap-2 animate-pulse">
                    <AlertCircle size={18} /> {error}
                </div>
            )}
             <div className="mt-2 small text-muted">
                Try: <span className="text-primary cursor-pointer" onClick={() => setTrackingNumber("MCN-882190")}>MCN-882190</span>, <span className="text-primary cursor-pointer" onClick={() => setTrackingNumber("MCN-CHINA-01")}>MCN-CHINA-01</span>
            </div>
          </div>

          {/* Result Card */}
          {trackingData && (
          <div className="card border-0 shadow-sm overflow-hidden animate-fade-in-up">
            <div className="card-header bg-white p-4 border-bottom">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                   <div>
                      <div className="small text-muted mb-1">Tracking Number</div>
                      <div className="fw-bold fs-5">{trackingData.id}</div>
                   </div>
                   <div className={`px-3 py-1 rounded-pill fw-bold small ${trackingData.status === 'Delivered' ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'}`}>
                      {trackingData.status === 'In Transit' ? `In Transit to ${trackingData.destination}` : trackingData.status}
                   </div>
                   <div className="text-end">
                      <div className="small text-muted mb-1">Expected Delivery</div>
                      <div className="fw-bold fs-5 text-success">{trackingData.expectedDelivery}</div>
                   </div>
                </div>
            </div>
            
            <div className="card-body p-0">
               <div className="row g-0">
                   {/* Timeline Section */}
                   <div className="col-lg-4 border-end">
                       <div className="p-4 h-100 bg-white">
                            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
                               <Truck size={20} className="text-primary" /> Timeline
                            </h5>
                            <div className="position-relative ps-4 border-start border-2 border-light ms-2">
                               {trackingData.timeline.map((event, index) => (
                                   <div key={index} className={`mb-5 position-relative ${index === 0 ? '' : 'text-muted'}`}>
                                      <div className={`position-absolute top-0 start-0 translate-middle rounded-circle p-1 border ${index === 0 ? 'bg-primary text-white border-primary' : 'bg-light text-secondary border-light'}`} style={{left: '-18px'}}>
                                         {index === 0 ? <Navigation size={16} /> : <CheckCircle size={16} />}
                                      </div>
                                      <div className={`fw-bold ${index === 0 ? 'text-primary' : ''}`}>{event.status}</div>
                                      <div className="small text-muted">{event.timestamp}</div>
                                      <div className="small mt-1">{event.location}</div>
                                      {index === 0 && trackingData.status === 'In Transit' && (
                                          <div className="mt-2 badge bg-primary rounded-pill fw-normal animate-pulse">Moving</div>
                                      )}
                                   </div>
                               ))}
                            </div>
                       </div>
                   </div>

                   {/* Map Section */}
                   <div className="col-lg-8 position-relative">
                       <div className="h-100 bg-light position-relative overflow-hidden" style={{minHeight: '500px'}}>
                           
                           {/* Leaflet Map Component */}
                           <TrackingMap 
                                onUpdateStatus={handleStatusUpdate} 
                                route={trackingData.route}
                           />

                           {/* Map Overlays (Only show if route exists and active) */}
                           {trackingData.route && trackingData.status === 'In Transit' && (
                               <>
                                   <div className="position-absolute top-0 start-0 w-100 p-3 z-3 pe-none">
                                       <div className="bg-white shadow-sm rounded-pill p-2 px-3 d-inline-flex align-items-center gap-2 border border-primary border-opacity-25">
                                           <div className="spinner-grow spinner-grow-sm text-primary" role="status"></div>
                                           <span className="fw-bold small text-primary">LIVE SATELLITE</span>
                                       </div>
                                   </div>

                                   <div className="position-absolute bottom-0 start-0 w-100 p-3 z-3 pe-none">
                                      <div className="card border-0 shadow-lg bg-white bg-opacity-95 backdrop-blur w-100">
                                         <div className="card-body py-3">
                                            <div className="row align-items-center text-center">
                                               <div className="col-4 border-end">
                                                  <div className="d-flex flex-column align-items-center">
                                                     <span className="small text-muted d-flex align-items-center gap-1"><Gauge size={14}/> Speed</span>
                                                     <span className="fw-bold fs-5">{speed} km/h</span>
                                                  </div>
                                               </div>
                                               <div className="col-4 border-end">
                                                  <div className="d-flex flex-column align-items-center">
                                                     <span className="small text-muted d-flex align-items-center gap-1"><Navigation size={14}/> Location</span>
                                                     <span className="fw-bold fs-6 text-truncate w-100">{currentLocation}</span>
                                                  </div>
                                               </div>
                                               <div className="col-4">
                                                  <div className="d-flex flex-column align-items-center">
                                                     <span className="small text-muted d-flex align-items-center gap-1"><MapIcon size={14}/> Remaining</span>
                                                     <span className="fw-bold fs-6">{distance.toFixed(1)} km</span>
                                                  </div>
                                               </div>
                                            </div>
                                         </div>
                                      </div>
                                   </div>
                               </>
                           )}
                       </div>
                   </div>
               </div>
            </div>
            <div className="card-footer bg-light p-4 text-center">
               <p className="mb-0 small text-muted">
                  Questions about your delivery? <Link href="#" className="text-primary fw-bold text-decoration-none">Contact our Nepal Logistics Team</Link>
               </p>
            </div>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
