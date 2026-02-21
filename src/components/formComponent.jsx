import React from "react";
import { Card } from "react-bootstrap";

export default function AuthCardLayout({ 
  image, 
  title, 
  children, 
  footer 
}) {
  return (
    <div className="h-100 d-flex flex-column bg-light">
      <div className="container-fluid h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm" style={{ minHeight: "600px" }}>
              <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                
                {/* Left: avatar / illustration */}
                <div className="d-flex justify-content-center mb-4 mb-md-0">
                  <img
                    src={image}
                    alt={title}
                    className="rounded-circle"
                    width="200"
                    height="200"
                    style={{ objectFit: "cover" }}
                  />
                </div>

                {/* Right: form area */}
                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <h1 className="text-center mb-4">{title}</h1>
                  {children}
                </div>
              </Card.Body>

              {footer && (
                <Card.Footer className="p-4 text-center">{footer}</Card.Footer>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}