import React from 'react';
import { Camera as CameraIcon, StopCircle, CircleDot, Check } from 'lucide-react';

const Camera = ({ 
  showCamera,
  capturedImage,
  videoRef,
  showCameraError,
  cameraError,
  startCamera,
  stopCamera,
  capturePhoto,
  setCapturedImage,
  handleSaveCaptured
}) => {
  return (
    <div style={{ 
      width: "100%",
      minHeight: "calc(100vh - 150px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "32px 24px"
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: "center", 
        marginBottom: "36px",
        maxWidth: "500px"
      }}>
        <h1 style={{ 
          fontSize: "26px", 
          fontWeight: "700", 
          color: "#000", 
          marginBottom: "8px",
          letterSpacing: "-0.5px"
        }}>
          📷 Camera
        </h1>
        <p style={{ 
          color: "#64748b", 
          fontSize: "15px",
          lineHeight: "1.5"
        }}>
          Capture receipt photos directly from your camera
        </p>
      </div>

      {/* Error Message */}
      {showCameraError && (
        <div style={{
          width: "100%",
          maxWidth: "700px",
          marginBottom: "20px",
          padding: "16px 20px",
          background: "#fee2e2",
          border: "1px solid #fca5a5",
          borderRadius: "10px",
          color: "#dc2626",
          fontSize: "14px",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}>
          <span style={{ fontSize: "20px" }}>⚠️</span>
          {cameraError}
        </div>
      )}

      {/* Main Camera Card */}
      <div style={{ 
        background: "#fff",
        borderRadius: "16px",
        padding: "36px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        maxWidth: "700px",
        width: "100%"
      }}>
        {/* Initial State - Camera Not Active */}
        {!showCamera && !capturedImage && (
          <div style={{ 
            textAlign: "center",
            padding: "60px 30px"
          }}>
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              boxShadow: "0 8px 30px rgba(102, 126, 234, 0.35)"
            }}>
              <CameraIcon size={50} color="#fff" strokeWidth={2} />
            </div>

            <h3 style={{ 
              fontSize: "20px", 
              fontWeight: "700", 
              color: "#1f2937",
              marginBottom: "10px",
              letterSpacing: "-0.3px"
            }}>
              Start Camera
            </h3>
            
            <p style={{ 
              fontSize: "14px", 
              color: "#6b7280",
              marginBottom: "32px",
              lineHeight: "1.5",
              maxWidth: "350px",
              margin: "0 auto 32px"
            }}>
              Click the button below to activate your camera and capture receipt photos
            </p>

            <button
              onClick={startCamera}
              style={{
                padding: "14px 40px",
                border: "none",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.3s",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)",
                transform: "translateY(0)",
                letterSpacing: "0.2px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 35px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
              }}
            >
              <CameraIcon size={20} strokeWidth={2.5} />
              Activate Camera
            </button>
          </div>
        )}

        {/* Camera Active State */}
        {showCamera && !capturedImage && (
          <div>
            <div style={{ 
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#000",
              marginBottom: "24px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "480px",
                  display: "block",
                  objectFit: "cover"
                }}
              />
              
              {/* Camera Overlay Guide */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "80%",
                height: "70%",
                border: "2px dashed rgba(255, 255, 255, 0.5)",
                borderRadius: "10px",
                pointerEvents: "none"
              }} />

              {/* Recording Indicator */}
              <div style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(10px)",
                padding: "10px 20px",
                borderRadius: "20px",
                color: "#fff",
                fontSize: "13px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <div style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#ef4444",
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                }} />
                Camera Active
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ 
              display: "flex", 
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap"
            }}>
              <button
                onClick={capturePhoto}
                style={{
                  padding: "14px 32px",
                  border: "none",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
                  transform: "translateY(0)",
                  flex: "1",
                  maxWidth: "220px",
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 35px rgba(16, 185, 129, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(16, 185, 129, 0.3)";
                }}
              >
                <CircleDot size={20} strokeWidth={2.5} />
                Capture Photo
              </button>

              <button
                onClick={stopCamera}
                style={{
                  padding: "14px 32px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  background: "#fff",
                  color: "#374151",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  flex: "1",
                  maxWidth: "220px",
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f9fafb";
                  e.currentTarget.style.borderColor = "#d1d5db";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <StopCircle size={20} strokeWidth={2.5} />
                Stop Camera
              </button>
            </div>

            <p style={{ 
              textAlign: "center", 
              fontSize: "13px", 
              color: "#6b7280",
              marginTop: "20px",
              fontStyle: "italic"
            }}>
              💡 Tip: Position the receipt within the dotted frame for best results
            </p>
          </div>
        )}

        {/* Photo Captured State */}
        {capturedImage && (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 8px 30px rgba(16, 185, 129, 0.3)"
            }}>
              <Check size={35} color="#fff" strokeWidth={3} />
            </div>

            <h3 style={{ 
              fontSize: "20px", 
              fontWeight: "700", 
              color: "#10b981",
              marginBottom: "10px"
            }}>
              Photo Captured Successfully!
            </h3>
            
            <p style={{ 
              fontSize: "14px", 
              color: "#6b7280",
              marginBottom: "24px",
              lineHeight: "1.5"
            }}>
              Your receipt photo has been captured. Continue to add expense details.
            </p>

            <img
              src={capturedImage}
              alt="Captured receipt"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 8px 25px rgba(0, 0, 0, 0.12)",
                margin: "0 auto 24px",
                display: "block"
              }}
            />

            {/* Action Buttons */}
            <div style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              marginTop: "24px"
            }}>
              <button
                onClick={() => handleSaveCaptured(capturedImage)}
                style={{
                  padding: "12px 32px",
                  border: "none",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 12px 35px rgba(102, 126, 234, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.3)";
                }}
              >
                Continue to Upload
              </button>

              <button
                onClick={() => setCapturedImage(null)}
                style={{
                  padding: "12px 32px",
                  border: "2px solid #e5e7eb",
                  borderRadius: "10px",
                  background: "#fff",
                  color: "#374151",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  transition: "all 0.3s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#fff";
                }}
              >
                Retake Photo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default Camera;