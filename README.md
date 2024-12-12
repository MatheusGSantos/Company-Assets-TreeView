<h1 align="center" >Company Assets TreeView</h1>

<p align="center">
<img loading="lazy" src="https://img.shields.io/badge/node-22.11.0-blue?style=for-the-badge&logo=nodedotjs&logoColor=%235FA04E"/> <img loading="lazy" src="https://img.shields.io/badge/typescript-5.5.3-blue?style=for-the-badge&logo=typescript&logoColor=%233178C6"/> <img loading="lazy" src="https://img.shields.io/badge/react-18.3.1-blue?style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img loading="lazy" src="https://img.shields.io/badge/tailwind-3.4.10-blue?style=for-the-badge&logo=tailwindcss&logoColor=%2306B6D4"/> <img loading="lazy" src="https://img.shields.io/badge/vite-5.4.1-blue?style=for-the-badge&logo=vite&logoColor=%23646CFF"/>
</p>

## Summary
This is a React-based application for visualizing and managing hierarchical data 
such as company assets and locations. This project demonstrates efficient tree 
structure rendering and filtering functionality with a focus on clean 
architecture and performance.

Originally was a technical challenge for a frontend position at Tractian, where 
an API should be consumed by the frontend and display locations, assets and
 components from available companies in a treeview. Requirements included: no 
 UI components library should be used and the user should be able to filter
 the tree nodes based on certain aspects.

## The Problem
A user wants to inspect their company assets and check for possible mechanical
 and electrical failures in machine components. Each component is monitored by a
 sensor that uploads real time data to a server that analyzes the machine 
 vibrations to determine if the component is healthy or about to fail.

A company may or may not have locations. A location can have sublocations 
(if the location is too big, the company may choose to split in multiple 
sectors). The assets of a company may or may not be associated with a location 
(or sublocation). Components may or may not be associated with a location 
(or sublocation) or an asset.

There should be a way visualize this in a treeview, being able to display 
a component current state, if a component node is selected. Also the user has
to be able to filter the TreeView by name, sensor type and status.

## Features

- Interactive TreeView for hierarchical data.
- Filter functionality to search and highlight nodes.
- Mock api with `json-server` (dumped the mock API responses in case the 
original server shuts down).
- Styled with TailwindCSS for fast and responsive design.
- Built with TypeScript for type safety.
- Handling and Caching client api calls with React Query.
- Applying virtualization to mitigate performance issues when displaying large
 amounts of data.
- Custom tree building, filtering and flattening algorithms.

## How to Run this Application

1. Clone this repository
2. Install project dependencies:
```bash
pnpm install
```
3. Set up a json-server mock api with:
```bash
pnpm run api
```
4. Create a `.env.local` file inside the project's root folder with the
 following content:
```env
VITE_API_URL="http://localhost:9999"
```
5. In another terminal, run:
```bash
pnpm run dev
```

## Usage
1. Open the app in your browser at http://localhost:3000.
2. Select one of the 3 companies available at the top right.
3. Use the TreeView to explore the hierarchical structure.
4. Apply filters or interact with the nodes to see dynamic updates.

## Tech Stack
- React
- TypeScript
- TailwindCSS
- Vite

## TreeView Building Algorithm
Since the data is all cluttered up, we need a way to handle the case when a node
should be inserted, but its parent is not yet part of the treeview. For that, I
opted for using a Map data structure to keep the reference of parent nodes that 
are not yet in the treeview and their child nodes.

For abstraction purposes, I call this auxiliary data structure 'the Orphanage", to
represent the relation of child nodes and the parent nodes that are supposed to 
adopt them as they are inserted in the treeview.

When a node is successfully inserted, every child registered in the Orphanage is
"adopted", now repeating the operation recursively for each child, forming the
subtree of the recently inserted node.

Here's a visual representation of the algorithm:

![Treeview Algorithm Visualization](/github/treeview-algo-visualization.gif)