# Part B Integration Guide

## Part B Responsibilities

Part B handles:

- Rider assignment
- Rider reassignment
- Delivery status tracking
- Delivery status history
- Proof of Delivery
- Real-time updates using Socket.io

## Required IDs from Part A

Part B requires the following IDs:

- delivery_id
- rider_id
- dispatcher_id

These IDs should be MongoDB ObjectIds from Part A.

## API Endpoints

### Assign Rider

POST /api/assignments

Required data:

{
  "delivery_id": "MongoDB Delivery ID",
  "rider_id": "MongoDB Rider ID",
  "dispatcher_id": "MongoDB Dispatcher ID"
}

### Reassign Rider

PUT /api/assignments/reassign

Required data:

{
  "delivery_id": "MongoDB Delivery ID",
  "new_rider_id": "MongoDB Rider ID",
  "dispatcher_id": "MongoDB Dispatcher ID"
}

### Update Delivery Status

POST /api/delivery-status

### Get Delivery Status History

GET /api/delivery-status/:delivery_id

### Create Proof of Delivery

POST /api/proof-of-delivery

### Get Proof of Delivery

GET /api/proof-of-delivery/:delivery_id

## Socket.io Events

- assignmentCreated
- deliveryStatusUpdated
- proofOfDeliveryCreated