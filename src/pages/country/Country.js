import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CountryPage from './CountryPage';
import CountryTourismPage from './CountryTourismPage';

export default function Country() {
  return (
    <Routes>
      <Route path="tourisme" element={<CountryTourismPage />} />
      <Route index element={<CountryPage />} />
    </Routes>
  );
}
