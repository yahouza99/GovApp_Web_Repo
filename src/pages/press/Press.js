import React from 'react';
import PressPage from './PressPage';

export default function Press({ section = 'actualites' }) {
  return <PressPage section={section} />;
}
