/**
 * VolumeSettings Styles
 * 
 * CSS styles for the volume settings UI component.
 * Can be included in the main stylesheet or loaded separately.
 */

export const volumeSettingsStyles = `
.volume-settings {
  background: rgba(20, 20, 30, 0.95);
  border: 2px solid #444;
  border-radius: 12px;
  padding: 24px;
  max-width: 400px;
  color: #fff;
  font-family: 'Segoe UI', system-ui, sans-serif;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.volume-settings h3 {
  margin: 0 0 20px 0;
  font-size: 1.4rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ff6b35;
  border-bottom: 2px solid #ff6b35;
  padding-bottom: 8px;
}

.volume-control {
  margin-bottom: 20px;
}

.volume-control label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  color: #ccc;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 12px;
}

.volume-slider {
  flex: 1;
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  background: linear-gradient(to right, #333, #555);
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #ff6b35, #ff8c42);
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.4);
  transition: transform 0.1s, box-shadow 0.1s;
}

.volume-slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.6);
}

.volume-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #ff6b35, #ff8c42);
  border-radius: 50%;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.4);
}

.volume-value {
  min-width: 45px;
  text-align: right;
  font-family: monospace;
  font-size: 0.9rem;
  color: #ff8c42;
  font-weight: 600;
}

.audio-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #444;
}

.btn-mute,
.btn-test {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-mute {
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
}

.btn-mute:hover {
  background: linear-gradient(135deg, #c0392b, #a93226);
  transform: translateY(-2px);
}

.btn-mute.muted {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.btn-test {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
}

.btn-test:hover {
  background: linear-gradient(135deg, #2980b9, #1f6691);
  transform: translateY(-2px);
}

/* Volume icon indicators */
.volume-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  fill: currentColor;
}

.volume-icon-muted {
  opacity: 0.5;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .volume-settings {
    padding: 16px;
    max-width: 100%;
  }
  
  .volume-settings h3 {
    font-size: 1.2rem;
  }
  
  .audio-actions {
    flex-direction: column;
  }
  
  .btn-mute,
  .btn-test {
    width: 100%;
  }
}

/* High contrast mode for accessibility */
@media (prefers-contrast: high) {
  .volume-settings {
    border-color: #fff;
    background: #000;
  }
  
  .volume-slider {
    background: #666;
  }
  
  .volume-slider::-webkit-slider-thumb {
    background: #fff;
    border: 2px solid #000;
  }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .volume-slider::-webkit-slider-thumb,
  .btn-mute,
  .btn-test {
    transition: none;
  }
  
  .btn-mute:hover,
  .btn-test:hover {
    transform: none;
  }
}
`;

export default volumeSettingsStyles;
