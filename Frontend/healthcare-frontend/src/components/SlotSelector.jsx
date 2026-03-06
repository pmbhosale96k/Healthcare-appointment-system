import React from 'react';

const SlotSelector = ({ slots = [], selectedSlot, onSelectSlot }) => {
  if (!slots.length) {
    return <p>No slots available.</p>;
  }

  return (
    <div className="slot-selector">
      {slots.map((slot) => {
        const slotValue = typeof slot === 'string' ? slot : slot.value;
        const slotLabel = typeof slot === 'string' ? slot : slot.label || slot.value;
        const isSelected = selectedSlot === slotValue;

        return (
          <button
            key={slotValue}
            type="button"
            className={isSelected ? 'slot selected' : 'slot'}
            onClick={() => onSelectSlot && onSelectSlot(slotValue)}
          >
            {slotLabel}
          </button>
        );
      })}
    </div>
  );
};

export default SlotSelector;
