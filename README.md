# Long Read QC Viewer "longue-vue"

![LR QC logo](./static/placeholder-logo.png)

This is a (crude) interface intended to aid manual QC. It aims to fulfill the same role as npg_qc_viewer does for Illumina QC data.

It is written in Javascript using the Svelte framework, and expects to interact with a backend API for retrieving and annotating QC data

## Setup

- Install node.js
- Install npm
- npm install
- npm run build
- npm run test

The resulting built application can be found in /dist, along with a /node_modules folder for the dependencies. You can then `open dist/index.html` and away it goes

`npm start` will bring the server up in development mode without the need for a web container.

## Configuration

The LR QC application needs to know where its web services are hosted, as well as the authentication service that will authorise use of endpoints.

T.B.C.
